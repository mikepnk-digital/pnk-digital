import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {
  ContactFormInput,
  QuoteRequestInput,
  EnquiryRecord,
  ApiResponse,
  ValidationError,
} from './types';

const dynamoClient = new DynamoDBClient({});
const sesClient = new SESClient(
  process.env.SES_REGION ? { region: process.env.SES_REGION } : {}
);

const TABLE_NAME = process.env.TABLE_NAME!;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL!;
const FROM_EMAIL = process.env.FROM_EMAIL!;
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

// CORS headers
const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Requested-With',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
};

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle CORS preflight
  if (event.requestContext.http.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    const path = event.rawPath;
    const body = event.body ? JSON.parse(event.body) : {};
    const isQuoteRequest = path.includes('/quote');

    // Layer 1: Honeypot check — bots auto-fill the hidden "website" field
    if (body.website) {
      console.log('Honeypot triggered');
      return createResponse(200, {
        success: true,
        message: 'Thank you for your enquiry. We will be in touch shortly.',
      });
    }

    // Layer 2: Time-based check — reject submissions faster than 3s or missing _t
    if (!body._t || body._t < 3000) {
      console.log('Time-based check failed:', body._t);
      return createResponse(200, {
        success: true,
        message: 'Thank you for your enquiry. We will be in touch shortly.',
      });
    }

    // Layer 4: Per-IP rate limiting — max 3 submissions per hour
    const clientIp = event.requestContext.http.sourceIp;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recentSubmissions = await dynamoClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'ip-createdAt-index',
      KeyConditionExpression: 'ipAddress = :ip AND createdAt > :since',
      ExpressionAttributeValues: {
        ':ip': { S: clientIp },
        ':since': { S: oneHourAgo },
      },
      Select: 'COUNT',
    }));

    if ((recentSubmissions.Count ?? 0) >= 3) {
      console.log('IP rate limit exceeded:', clientIp);
      return createResponse(429, {
        success: false,
        message: "You've sent several messages recently. Please wait a bit before sending another.",
      });
    }

    // Validate input
    const validationErrors = validateInput(body, isQuoteRequest);
    if (validationErrors.length > 0) {
      return createResponse(400, {
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Create enquiry record
    const enquiry = createEnquiryRecord(body, isQuoteRequest, event);

    // Save to DynamoDB
    await saveEnquiry(enquiry);

    // Send notification email (non-blocking error)
    try {
      await sendNotificationEmail(enquiry);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    // Send confirmation email (non-blocking error)
    try {
      await sendConfirmationEmail(enquiry);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    return createResponse(200, {
      success: true,
      message: 'Thank you for your enquiry. We will be in touch shortly.',
      enquiryId: enquiry.enquiryId,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return createResponse(500, {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
};

function validateInput(
  input: ContactFormInput | QuoteRequestInput,
  isQuoteRequest: boolean
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields
  if (!input.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!input.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(input.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!input.message?.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  }

  // Quote-specific validation
  if (isQuoteRequest) {
    const quoteInput = input as QuoteRequestInput;
    if (!quoteInput.projectType) {
      errors.push({ field: 'projectType', message: 'Project type is required' });
    }
  }

  // Length validation
  if (input.name && input.name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  if (input.message && input.message.length > 5000) {
    errors.push({ field: 'message', message: 'Message must be less than 5000 characters' });
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function createEnquiryRecord(
  input: ContactFormInput | QuoteRequestInput,
  isQuoteRequest: boolean,
  event: APIGatewayProxyEventV2
): EnquiryRecord {
  const now = new Date().toISOString();
  const enquiryId = generateUUID();

  return {
    enquiryId,
    createdAt: now,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: input.company?.trim() || undefined,
    projectType: input.projectType || undefined,
    budget: input.budget || undefined,
    message: input.message.trim(),
    features: isQuoteRequest ? (input as QuoteRequestInput).features : undefined,
    timeline: isQuoteRequest ? (input as QuoteRequestInput).timeline : undefined,
    status: 'new',
    source: isQuoteRequest ? 'quote-request' : 'contact-form',
    ipAddress: event.requestContext.http.sourceIp,
    userAgent: event.headers['user-agent'],
    // TTL: 2 years in seconds from now
    ttl: Math.floor(Date.now() / 1000) + 63072000,
  };
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function saveEnquiry(enquiry: EnquiryRecord): Promise<void> {
  // Remove undefined values for DynamoDB
  const cleanEnquiry = Object.fromEntries(
    Object.entries(enquiry).filter(([_, v]) => v !== undefined)
  );

  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: marshall(cleanEnquiry),
  });

  await dynamoClient.send(command);
  console.log('Enquiry saved:', enquiry.enquiryId);
}

async function sendNotificationEmail(enquiry: EnquiryRecord): Promise<void> {
  const subject = `[PNK Digital] New ${enquiry.source === 'quote-request' ? 'Quote Request' : 'Contact Form'} from ${enquiry.name}`;

  const htmlBody = buildNotificationEmailHtml(enquiry);
  const textBody = buildNotificationEmailText(enquiry);

  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [NOTIFICATION_EMAIL],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
        Text: {
          Data: textBody,
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(command);
  console.log('Notification email sent to:', NOTIFICATION_EMAIL);
}

async function sendConfirmationEmail(enquiry: EnquiryRecord): Promise<void> {
  const subject = 'Thank you for contacting PNK Digital';

  const htmlBody = buildConfirmationEmailHtml(enquiry);
  const textBody = buildConfirmationEmailText(enquiry);

  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [enquiry.email],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
        Text: {
          Data: textBody,
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(command);
  console.log('Confirmation email sent to:', enquiry.email);
}

function buildNotificationEmailHtml(enquiry: EnquiryRecord): string {
  const featuresHtml = enquiry.features?.length
    ? `<tr><td style="padding: 8px 0; color: #666;">Features:</td><td style="padding: 8px 0;">${enquiry.features.join(', ')}</td></tr>`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px 40px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                New ${enquiry.source === 'quote-request' ? 'Quote Request' : 'Enquiry'}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; font-weight: 500;">${enquiry.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #6366f1;">${enquiry.email}</a></td>
                </tr>
                ${enquiry.company ? `<tr><td style="padding: 8px 0; color: #666;">Company:</td><td style="padding: 8px 0;">${enquiry.company}</td></tr>` : ''}
                ${enquiry.projectType ? `<tr><td style="padding: 8px 0; color: #666;">Project Type:</td><td style="padding: 8px 0;">${enquiry.projectType}</td></tr>` : ''}
                ${enquiry.budget ? `<tr><td style="padding: 8px 0; color: #666;">Budget:</td><td style="padding: 8px 0;">${enquiry.budget}</td></tr>` : ''}
                ${enquiry.timeline ? `<tr><td style="padding: 8px 0; color: #666;">Timeline:</td><td style="padding: 8px 0;">${enquiry.timeline}</td></tr>` : ''}
                ${featuresHtml}
              </table>

              <div style="margin-top: 24px; padding: 20px; background-color: #f9fafb; border-radius: 6px;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${enquiry.message}</p>
              </div>

              <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                  Enquiry ID: ${enquiry.enquiryId}<br>
                  Submitted: ${new Date(enquiry.createdAt).toLocaleString('en-GB', { timeZone: 'Europe/London' })}<br>
                  Environment: ${ENVIRONMENT}
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function buildNotificationEmailText(enquiry: EnquiryRecord): string {
  let text = `New ${enquiry.source === 'quote-request' ? 'Quote Request' : 'Enquiry'}\n\n`;
  text += `Name: ${enquiry.name}\n`;
  text += `Email: ${enquiry.email}\n`;
  if (enquiry.company) text += `Company: ${enquiry.company}\n`;
  if (enquiry.projectType) text += `Project Type: ${enquiry.projectType}\n`;
  if (enquiry.budget) text += `Budget: ${enquiry.budget}\n`;
  if (enquiry.timeline) text += `Timeline: ${enquiry.timeline}\n`;
  if (enquiry.features?.length) text += `Features: ${enquiry.features.join(', ')}\n`;
  text += `\nMessage:\n${enquiry.message}\n`;
  text += `\n---\nEnquiry ID: ${enquiry.enquiryId}\n`;
  text += `Submitted: ${enquiry.createdAt}\n`;
  return text;
}

function buildConfirmationEmailHtml(enquiry: EnquiryRecord): string {
  const firstName = enquiry.name.split(' ')[0];
  const isQuote = enquiry.source === 'quote-request';

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Thank you for contacting PNK Digital</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root { color-scheme: light dark; }
    /* Prevent dark mode color inversion on all clients */
    [data-ogsc] body, [data-ogsb] body, .dark-mode body { background-color: #05040a !important; }
    @media (prefers-color-scheme: dark) {
      .email-body, .email-body table, .email-body td, .email-body div, .email-body p, .email-body span, .email-body h1, .email-body a {
        color: inherit !important;
        background-color: inherit !important;
      }
    }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .service-card { display: block !important; width: 100% !important; max-width: 100% !important; margin-bottom: 8px !important; }
      .service-card-inner { width: 100% !important; }
      .step-cell { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
      .step-arrow { display: none !important; }
      .diff-col { display: block !important; width: 100% !important; margin-bottom: 8px !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .hero-heading { font-size: 24px !important; line-height: 32px !important; }
    }
  </style>
</head>
<body class="email-body" style="margin:0; padding:0; background-color:#05040a; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">

<!-- Preheader -->
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  Thanks for reaching out, ${firstName}. Here's what happens next and how I can help your project.
</div>

<!-- Outer wrapper -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#05040a;">
<tr><td align="center" style="padding: 20px 10px;">

<!-- Email container -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-container" style="max-width:600px; width:100%; border-radius:8px; overflow:hidden;">

<!-- ============================================ -->
<!-- BRANDED HEADER                                -->
<!-- ============================================ -->
<tr>
<td style="background-color: #0a0a0f; padding: 32px 40px; text-align: center; border-bottom: 2px solid #f4178c;" class="mobile-padding">
  <p style="margin: 0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 800; letter-spacing: 2px;">
    <span style="color: #f4178c;">PNK</span> <span style="color: #e4e4e7;">Digital</span>
  </p>
  <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #a1a1aa; letter-spacing: 1px; text-transform: uppercase;">
    Senior Full-Stack Development, Accelerated by AI
  </p>
</td>
</tr>

<!-- ============================================ -->
<!-- PERSONAL THANK YOU                            -->
<!-- ============================================ -->
<tr>
<td style="background-color: #0f0f1a; padding: 40px 40px 32px 40px;" class="mobile-padding">
  <h1 class="hero-heading" style="margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 28px; line-height: 36px; font-weight: 700; color: #e4e4e7;">
    Thanks for reaching out, <span style="color: #f4178c;">${firstName}</span>.
  </h1>
  <p style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 24px; color: #a1a1aa;">
    I've received your ${isQuote ? 'quote request' : 'message'} and I'm looking forward to learning more about your project. Every enquiry gets my personal attention &mdash; no account managers, no juniors, just me.
  </p>
  <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 24px; color: #a1a1aa;">
    I'll get back to you within <span style="color: #e4e4e7; font-weight: 600;">24 hours</span> during business days.
  </p>
</td>
</tr>

<!-- ============================================ -->
<!-- ABOUT / WHO YOU'RE WORKING WITH               -->
<!-- ============================================ -->
<tr>
<td style="background-color: #1a1a2e; padding: 32px 40px;" class="mobile-padding">
  <p style="margin: 0 0 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #f4178c; text-transform: uppercase; letter-spacing: 1.5px;">
    Who You're Working With
  </p>
  <p style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #e4e4e7; line-height: 28px;">
    Mike Pink &mdash; Senior Full-Stack Developer
  </p>
  <p style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px; color: #a1a1aa;">
    I've spent <span style="color: #e4e4e7; font-weight: 600;">25 years</span> building production web applications for startups, scale-ups, and enterprise clients across the UK. I started PNK Digital because I believed there was a better way &mdash; AI tooling has changed what a single experienced developer can ship.
  </p>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
  <tr>
    <td width="25%" class="diff-col" style="vertical-align: top; padding-right: 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0a0a0f; border-radius: 6px;">
        <tr><td style="padding: 16px 12px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <p style="margin: 0 0 4px 0; font-size: 20px; line-height: 1; color: #00f5ff;">&#9889;</p>
          <p style="margin: 0; font-size: 11px; font-weight: 600; color: #e4e4e7; line-height: 15px;">Speed Without Shortcuts</p>
        </td></tr>
      </table>
    </td>
    <td width="25%" class="diff-col" style="vertical-align: top; padding: 0 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0a0a0f; border-radius: 6px;">
        <tr><td style="padding: 16px 12px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <p style="margin: 0 0 4px 0; font-size: 20px; line-height: 1; color: #00f5ff;">&#128269;</p>
          <p style="margin: 0; font-size: 11px; font-weight: 600; color: #e4e4e7; line-height: 15px;">Radical Transparency</p>
        </td></tr>
      </table>
    </td>
    <td width="25%" class="diff-col" style="vertical-align: top; padding: 0 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0a0a0f; border-radius: 6px;">
        <tr><td style="padding: 16px 12px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <p style="margin: 0 0 4px 0; font-size: 20px; line-height: 1; color: #00f5ff;">&#128172;</p>
          <p style="margin: 0; font-size: 11px; font-weight: 600; color: #e4e4e7; line-height: 15px;">Direct Access</p>
        </td></tr>
      </table>
    </td>
    <td width="25%" class="diff-col" style="vertical-align: top; padding-left: 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0a0a0f; border-radius: 6px;">
        <tr><td style="padding: 16px 12px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <p style="margin: 0 0 4px 0; font-size: 20px; line-height: 1; color: #00f5ff;">&#10003;</p>
          <p style="margin: 0; font-size: 11px; font-weight: 600; color: #e4e4e7; line-height: 15px;">Honest Advice</p>
        </td></tr>
      </table>
    </td>
  </tr>
  </table>
</td>
</tr>

<!-- ============================================ -->
<!-- SERVICES                                      -->
<!-- ============================================ -->
<tr>
<td style="background-color: #0a0a0f; padding: 32px 40px;" class="mobile-padding">
  <p style="margin: 0 0 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #f4178c; text-transform: uppercase; letter-spacing: 1.5px;">
    What I Can Build For You
  </p>
  <p style="margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #e4e4e7; line-height: 26px;">
    Full-stack development, cloud infrastructure, and AI integration.
  </p>

  <!-- Service Row 1: 2 cards -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 8px;">
  <tr>
    <td width="50%" class="service-card" style="vertical-align: top; padding-right: 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="service-card-inner" style="background-color: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a3e; height: 155px;">
        <tr><td style="padding: 20px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; height: 155px; vertical-align: top;">
          <p style="margin: 0 0 6px 0; font-size: 22px; line-height: 1;">&#128187;</p>
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #00f5ff;">Web Applications</p>
          <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 18px;">Custom dashboards, portals, and business tools built with React &amp; TypeScript.</p>
        </td></tr>
      </table>
    </td>
    <td width="50%" class="service-card" style="vertical-align: top; padding-left: 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="service-card-inner" style="background-color: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a3e; height: 155px;">
        <tr><td style="padding: 20px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; height: 155px; vertical-align: top;">
          <p style="margin: 0 0 6px 0; font-size: 22px; line-height: 1;">&#9729;&#65039;</p>
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #8b5cf6;">AWS Infrastructure</p>
          <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 18px;">Scalable serverless backends, databases, and CI/CD on AWS.</p>
        </td></tr>
      </table>
    </td>
  </tr>
  </table>

  <!-- Service Row 2: 2 cards -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 8px;">
  <tr>
    <td width="50%" class="service-card" style="vertical-align: top; padding-right: 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="service-card-inner" style="background-color: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a3e; height: 155px;">
        <tr><td style="padding: 20px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; height: 155px; vertical-align: top;">
          <p style="margin: 0 0 6px 0; font-size: 22px; line-height: 1;">&#128640;</p>
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #f4178c;">AI-Powered MVPs</p>
          <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 18px;">Go from idea to working product fast with AI-accelerated development.</p>
        </td></tr>
      </table>
    </td>
    <td width="50%" class="service-card" style="vertical-align: top; padding-left: 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="service-card-inner" style="background-color: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a3e; height: 155px;">
        <tr><td style="padding: 20px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; height: 155px; vertical-align: top;">
          <p style="margin: 0 0 6px 0; font-size: 22px; line-height: 1;">&#129302;</p>
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #00ff88;">AI Integration</p>
          <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 18px;">Embed LLMs, automation, and intelligent features into your existing products.</p>
        </td></tr>
      </table>
    </td>
  </tr>
  </table>

  <!-- Service Row 3: Full width -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
  <tr>
    <td style="vertical-align: top;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #1a1a2e; border-radius: 8px; border: 1px solid #f4178c;">
        <tr><td style="padding: 20px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="36" style="vertical-align: top;">
              <p style="margin: 0; font-size: 22px; line-height: 1;">&#129504;</p>
            </td>
            <td style="vertical-align: top;">
              <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #f4178c;">AI Employees for Your Team</p>
              <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 18px;">Personal AI assistants that manage inboxes, prepare meetings, handle admin, and integrate with your tools. Reclaim the 40% of your day lost to repetitive tasks.</p>
            </td>
          </tr>
          </table>
        </td></tr>
      </table>
    </td>
  </tr>
  </table>
</td>
</tr>

<!-- ============================================ -->
<!-- WHAT HAPPENS NEXT                             -->
<!-- ============================================ -->
<tr>
<td style="background-color: #1a1a2e; padding: 32px 40px;" class="mobile-padding">
  <p style="margin: 0 0 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #f4178c; text-transform: uppercase; letter-spacing: 1.5px;">
    What Happens Next
  </p>
  <p style="margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #e4e4e7;">
    Here's how we get started.
  </p>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
  <tr>
    <td width="22%" class="step-cell" style="text-align: center; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <p style="margin: 0 0 8px 0; font-size: 28px; line-height: 1; color: #f4178c;">&#128172;</p>
      <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: 700; color: #e4e4e7;">Discovery Call</p>
      <p style="margin: 0; font-size: 11px; color: #a1a1aa;">30-min chat about your project</p>
    </td>
    <td width="4%" class="step-arrow" style="text-align: center; vertical-align: middle; font-size: 18px; color: #a1a1aa;">&rarr;</td>
    <td width="22%" class="step-cell" style="text-align: center; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <p style="margin: 0 0 8px 0; font-size: 28px; line-height: 1; color: #f4178c;">&#128203;</p>
      <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: 700; color: #e4e4e7;">Proposal</p>
      <p style="margin: 0; font-size: 11px; color: #a1a1aa;">Fixed pricing, clear scope</p>
    </td>
    <td width="4%" class="step-arrow" style="text-align: center; vertical-align: middle; font-size: 18px; color: #a1a1aa;">&rarr;</td>
    <td width="22%" class="step-cell" style="text-align: center; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <p style="margin: 0 0 8px 0; font-size: 28px; line-height: 1; color: #f4178c;">&#9889;</p>
      <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: 700; color: #e4e4e7;">Build</p>
      <p style="margin: 0; font-size: 11px; color: #a1a1aa;">AI-accelerated dev</p>
    </td>
    <td width="4%" class="step-arrow" style="text-align: center; vertical-align: middle; font-size: 18px; color: #a1a1aa;">&rarr;</td>
    <td width="22%" class="step-cell" style="text-align: center; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <p style="margin: 0 0 8px 0; font-size: 28px; line-height: 1; color: #f4178c;">&#128640;</p>
      <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: 700; color: #e4e4e7;">Launch</p>
      <p style="margin: 0; font-size: 11px; color: #a1a1aa;">Live &amp; supported</p>
    </td>
  </tr>
  </table>
</td>
</tr>

<!-- ============================================ -->
<!-- PERSONAL SIGN-OFF                             -->
<!-- ============================================ -->
<tr>
<td style="background-color: #0f0f1a; padding: 32px 40px;" class="mobile-padding">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left: 3px solid #f4178c;">
    <tr><td style="padding: 0 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <p style="margin: 0 0 12px 0; font-size: 15px; color: #a1a1aa; line-height: 24px;">
        In the meantime, if you have any urgent questions, feel free to reply directly to this email. I read every message personally.
      </p>
      <p style="margin: 0; font-size: 15px; color: #e4e4e7; line-height: 24px;">
        Speak soon,<br>
        <span style="font-weight: 700; color: #f4178c;">Mike Pink</span><br>
        <span style="font-size: 13px; color: #a1a1aa;">Founder, PNK Digital</span>
      </p>
    </td></tr>
  </table>
</td>
</tr>

<!-- ============================================ -->
<!-- CTA                                           -->
<!-- ============================================ -->
<tr>
<td style="background-color: #1a1a2e; padding: 24px 40px; text-align: center;" class="mobile-padding">
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://pnk-digital.com" style="height:44px;v-text-anchor:middle;width:220px;" arcsize="50%" stroke="f" fillcolor="#f4178c">
  <w:anchorlock/>
  <center>
  <![endif]-->
  <a href="https://pnk-digital.com" style="display: inline-block; background-color: #f4178c; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 32px; border-radius: 22px;">
    Visit pnk-digital.com &rarr;
  </a>
  <!--[if mso]>
  </center>
  </v:roundrect>
  <![endif]-->
</td>
</tr>

<!-- ============================================ -->
<!-- FOOTER                                        -->
<!-- ============================================ -->
<tr>
<td style="background-color: #0a0a0f; padding: 32px 40px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; border-top: 1px solid #2a2a3e;" class="mobile-padding">
  <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #e4e4e7;">Mike Pink</p>
  <p style="margin: 0 0 4px 0; font-size: 13px; color: #f4178c; font-weight: 600;">PNK Digital</p>
  <p style="margin: 0 0 12px 0; font-size: 12px; color: #a1a1aa;">Farnham, Surrey, UK</p>
  <p style="margin: 0 0 4px 0; font-size: 12px;">
    <a href="https://pnk-digital.com" style="color: #00f5ff; text-decoration: none;">pnk-digital.com</a>
  </p>
  <p style="margin: 0 0 4px 0; font-size: 12px;">
    <a href="mailto:hello@pnk-digital.com" style="color: #a1a1aa; text-decoration: none;">hello@pnk-digital.com</a>
  </p>
  <p style="margin: 0; font-size: 12px;">
    <a href="tel:+442079460958" style="color: #a1a1aa; text-decoration: none;">+44 20 7946 0958</a>
  </p>
  <p style="margin: 16px 0 0 0; font-size: 11px; color: #71717a;">
    Mike Pink Ltd &bull; Company No. 09029124<br>
    Registered in England &amp; Wales
  </p>
</td>
</tr>

</table>
<!-- /Email container -->

</td></tr>
</table>
<!-- /Outer wrapper -->

</body>
</html>
  `.trim();
}

function buildConfirmationEmailText(enquiry: EnquiryRecord): string {
  const firstName = enquiry.name.split(' ')[0];
  const isQuote = enquiry.source === 'quote-request';

  return `
PNK Digital
Senior Full-Stack Development, Accelerated by AI
================================================

Thanks for reaching out, ${firstName}.

I've received your ${isQuote ? 'quote request' : 'message'} and I'm looking forward to learning more about your project. Every enquiry gets my personal attention — no account managers, no juniors, just me.

I'll get back to you within 24 hours during business days.


WHO YOU'RE WORKING WITH
-----------------------
Mike Pink — Senior Full-Stack Developer

I've spent 25 years building production web applications for startups, scale-ups, and enterprise clients across the UK. I started PNK Digital because I believed there was a better way — AI tooling has changed what a single experienced developer can ship.

• Speed Without Shortcuts — Production-quality software in weeks
• Radical Transparency — You always know where your project stands
• Direct Access — Talk to the person writing your code
• Honest Advice — I'll tell you if something is a bad idea


WHAT I CAN BUILD FOR YOU
------------------------
Full-stack development, cloud infrastructure, and AI integration.

→ Web Applications
  Custom dashboards, portals, and business tools built with React & TypeScript.

→ AWS Infrastructure
  Scalable serverless backends, databases, and CI/CD on AWS.

→ AI-Powered MVPs
  Go from idea to working product fast with AI-accelerated development.

→ AI Integration
  Embed LLMs, automation, and intelligent features into your existing products.

→ AI Employees for Your Team
  Personal AI assistants that manage inboxes, prepare meetings, handle admin,
  and integrate with your tools. Reclaim the 40% of your day lost to repetitive tasks.


WHAT HAPPENS NEXT
-----------------
1. Discovery Call → 30-minute chat about your project, goals, and constraints
2. Proposal → Clear deliverables, fixed pricing, defined timeline
3. Build → AI-accelerated development with regular check-ins
4. Launch → Live, supported, and ready to grow


In the meantime, if you have any urgent questions, feel free to reply directly to this email. I read every message personally.

Speak soon,
Mike Pink
Founder, PNK Digital

---
pnk-digital.com
hello@pnk-digital.com
+44 20 7946 0958

Mike Pink Ltd | Company No. 09029124
Registered in England & Wales
Farnham, Surrey, UK
  `.trim();
}

function createResponse(statusCode: number, body: Record<string, unknown>): ApiResponse {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}
