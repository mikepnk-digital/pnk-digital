import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
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
const sesClient = new SESClient({});

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
                Thank You, ${enquiry.name}!
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                We've received your ${enquiry.source === 'quote-request' ? 'quote request' : 'message'} and appreciate you reaching out to PNK Digital.
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                Our team will review your enquiry and get back to you within <strong>24 hours</strong> during business days.
              </p>

              <div style="margin: 30px 0; padding: 20px; background-color: #f0f9ff; border-radius: 6px; border-left: 4px solid #6366f1;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #1e40af;">What happens next?</h3>
                <ol style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.8;">
                  <li>We'll review your project requirements</li>
                  <li>A member of our team will reach out to schedule a call</li>
                  <li>We'll discuss your vision and provide a detailed proposal</li>
                </ol>
              </div>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                In the meantime, if you have any urgent questions, feel free to reply to this email or call us at <strong>+44 20 7946 0958</strong>.
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #374151;">
                Best regards,<br>
                <strong>The PNK Digital Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                PNK Digital | London, UK<br>
                <a href="mailto:hello@pnk-digital.com" style="color: #6366f1;">hello@pnk-digital.com</a>
              </p>
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

function buildConfirmationEmailText(enquiry: EnquiryRecord): string {
  return `
Thank You, ${enquiry.name}!

We've received your ${enquiry.source === 'quote-request' ? 'quote request' : 'message'} and appreciate you reaching out to PNK Digital.

Our team will review your enquiry and get back to you within 24 hours during business days.

What happens next?
1. We'll review your project requirements
2. A member of our team will reach out to schedule a call
3. We'll discuss your vision and provide a detailed proposal

In the meantime, if you have any urgent questions, feel free to reply to this email or call us at +44 20 7946 0958.

Best regards,
The PNK Digital Team

---
PNK Digital | London, UK
hello@pnk-digital.com
  `.trim();
}

function createResponse(statusCode: number, body: Record<string, unknown>): ApiResponse {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}
