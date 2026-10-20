import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config/types';

interface WebsiteStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  apiUrl?: string;
  certificate?: acm.ICertificate;
}

export class WebsiteStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;
  public readonly bucket: s3.Bucket;
  public readonly distributionUrl: string;

  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    const { config, apiUrl, certificate } = props;
    const isProd = config.environmentName === 'prod';

    // S3 bucket for static website hosting (private - accessed via CloudFront only)
    this.bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `pnk-digital-website-${config.environmentName}-${this.account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: isProd,
      removalPolicy: isProd ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: !isProd,
    });

    // CloudFront Origin Access Control for S3
    const oac = new cloudfront.S3OriginAccessControl(this, 'OAC', {
      originAccessControlName: `pnk-digital-oac-${config.environmentName}`,
      signing: cloudfront.Signing.SIGV4_ALWAYS,
    });

    // Security headers policy
    const responseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeadersPolicy', {
      responseHeadersPolicyName: `pnk-digital-security-headers-${config.environmentName}`,
      securityHeadersBehavior: {
        contentSecurityPolicy: {
          contentSecurityPolicy: this.buildCSP(),
          override: true,
        },
        contentTypeOptions: {
          override: true,
        },
        frameOptions: {
          frameOption: cloudfront.HeadersFrameOption.DENY,
          override: true,
        },
        referrerPolicy: {
          referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
          override: true,
        },
        strictTransportSecurity: {
          accessControlMaxAge: cdk.Duration.days(365),
          includeSubdomains: true,
          preload: true,
          override: true,
        },
        xssProtection: {
          protection: true,
          modeBlock: true,
          override: true,
        },
      },
    });

    // CloudFront price class mapping
    const priceClassMap: Record<string, cloudfront.PriceClass> = {
      'PriceClass_100': cloudfront.PriceClass.PRICE_CLASS_100,
      'PriceClass_200': cloudfront.PriceClass.PRICE_CLASS_200,
      'PriceClass_All': cloudfront.PriceClass.PRICE_CLASS_ALL,
    };

    // Build domain names array if domain is configured
    const domainNames = config.domain
      ? [config.domain, `www.${config.domain}`]
      : undefined;

    // URL-rewrite function: Astro emits static .html files (e.g. /about.html)
    // but the site links to clean routes (/about). The private S3/OAC origin
    // won't resolve directory indexes, so rewrite extensionless request URIs to
    // the matching .html object. Assets (with a file extension) pass through.
    //
    // It also 301s retired routes in REDIRECTS (query string kept), e.g. the old
    // /tech-support/service A/B page, still linked from sent outreach emails.
    const urlRewriteFunction = new cloudfront.Function(this, 'UrlRewriteFunction', {
      functionName: `pnk-digital-url-rewrite-${config.environmentName}`,
      comment: 'Rewrite clean routes to Astro .html files; 301 retired routes',
      code: cloudfront.FunctionCode.fromInline(`
var REDIRECTS = {
  '/tech-support/service': '/tech-support'
};

function serializeQuery(qs) {
  var parts = [];
  for (var key in qs) {
    var entry = qs[key];
    var values = entry.multiValue ? entry.multiValue : [entry];
    for (var i = 0; i < values.length; i++) {
      parts.push(key + (values[i].value !== '' ? '=' + values[i].value : ''));
    }
  }
  return parts.length ? '?' + parts.join('&') : '';
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri === '/') { return request; }
  // Normalise any trailing slash to the extensionless form.
  if (uri.length > 1 && uri.charAt(uri.length - 1) === '/') {
    uri = uri.slice(0, -1);
    request.uri = uri;
  }
  var target = REDIRECTS[uri];
  if (target) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: target + serializeQuery(request.querystring) } }
    };
  }
  var lastSegment = uri.slice(uri.lastIndexOf('/') + 1);
  // No file extension => it's a route; serve the matching .html file.
  if (lastSegment.indexOf('.') === -1) {
    request.uri = uri + '.html';
  }
  return request;
}
      `),
    });

    // CloudFront distribution
    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket, {
          originAccessControl: oac,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy,
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        functionAssociations: [
          {
            function: urlRewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        // Private S3/OAC returns 403 for missing keys; serve the real 404 page.
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
      priceClass: priceClassMap[config.priceClass],
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      comment: `PNK Digital Website - ${config.environmentName}`,
      // Custom domain configuration
      domainNames,
      certificate,
    });

    // Grant CloudFront access to S3 bucket
    this.bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [this.bucket.arnForObjects('*')],
      principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${this.distribution.distributionId}`,
        },
      },
    }));

    // Deploy website content from dist folder
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: this.bucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
      prune: true,
      memoryLimit: 512,
    });

    // Store the distribution URL
    this.distributionUrl = `https://${this.distribution.distributionDomainName}`;

    // Outputs
    new cdk.CfnOutput(this, 'WebsiteUrl', {
      value: this.distributionUrl,
      description: 'Website URL (CloudFront)',
      exportName: `PnkDigital-WebsiteUrl-${config.environmentName}`,
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: this.bucket.bucketName,
      description: 'S3 Bucket Name',
      exportName: `PnkDigital-BucketName-${config.environmentName}`,
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.distribution.distributionId,
      description: 'CloudFront Distribution ID',
      exportName: `PnkDigital-DistributionId-${config.environmentName}`,
    });
  }

  private buildCSP(): string {
    // Allow API Gateway endpoints in the connect-src
    // Using wildcard for execute-api since the actual URL is a CloudFormation token at synth time
    const directives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://*.execute-api.eu-west-2.amazonaws.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ];
    return directives.join('; ');
  }
}
