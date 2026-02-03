#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { WebsiteStack, DatabaseStack, ApiStack } from '../lib/stacks';
import { devConfig, prodConfig, EnvironmentConfig } from '../lib/config';

const app = new cdk.App();

// Get environment from context
const environmentName = app.node.tryGetContext('environment') || 'dev';
const config: EnvironmentConfig = environmentName === 'prod' ? prodConfig : devConfig;

// Set AWS account and region
const env = {
  account: config.account || process.env.CDK_DEFAULT_ACCOUNT,
  region: config.region,
};

// Stack naming convention
const stackPrefix = `PnkDigital-${config.environmentName}`;

// 1. Database Stack (DynamoDB)
const databaseStack = new DatabaseStack(app, `${stackPrefix}-Database`, {
  env,
  config,
  description: `PNK Digital Database Stack - ${config.environmentName}`,
  tags: {
    Environment: config.environmentName,
    Project: 'PnkDigital',
  },
});

// 2. API Stack (API Gateway + Lambda)
const apiStack = new ApiStack(app, `${stackPrefix}-Api`, {
  env,
  config,
  enquiriesTable: databaseStack.enquiriesTable,
  allowedOrigins: config.domain
    ? [`https://${config.domain}`, `https://www.${config.domain}`]
    : ['*'],
  description: `PNK Digital API Stack - ${config.environmentName}`,
  tags: {
    Environment: config.environmentName,
    Project: 'PnkDigital',
  },
});
apiStack.addDependency(databaseStack);

// 3. Certificate Stack (if domain configured) - must be in us-east-1 for CloudFront
let certificate: acm.ICertificate | undefined;

if (config.domain && config.hostedZoneId) {
  // Create a stack for the certificate in us-east-1
  const certStack = new cdk.Stack(app, `${stackPrefix}-Certificate`, {
    env: {
      account: env.account,
      region: 'us-east-1', // Required for CloudFront
    },
    crossRegionReferences: true,
    description: `PNK Digital Certificate Stack - ${config.environmentName}`,
    tags: {
      Environment: config.environmentName,
      Project: 'PnkDigital',
    },
  });

  // Look up the hosted zone
  const hostedZone = route53.HostedZone.fromHostedZoneAttributes(certStack, 'HostedZone', {
    hostedZoneId: config.hostedZoneId,
    zoneName: config.domain,
  });

  // Create the certificate with DNS validation
  certificate = new acm.Certificate(certStack, 'Certificate', {
    domainName: config.domain,
    subjectAlternativeNames: [`www.${config.domain}`],
    validation: acm.CertificateValidation.fromDns(hostedZone),
  });

  new cdk.CfnOutput(certStack, 'CertificateArn', {
    value: certificate.certificateArn,
    description: 'ACM Certificate ARN',
  });
}

// 4. Website Stack (S3 + CloudFront)
const websiteStack = new WebsiteStack(app, `${stackPrefix}-Website`, {
  env,
  config,
  apiUrl: apiStack.apiUrl,
  certificate,
  crossRegionReferences: true,
  description: `PNK Digital Website Stack - ${config.environmentName}`,
  tags: {
    Environment: config.environmentName,
    Project: 'PnkDigital',
  },
});
websiteStack.addDependency(apiStack);

// DNS is configured externally - no DNS stack needed

// Add tags to all stacks
cdk.Tags.of(app).add('ManagedBy', 'CDK');
cdk.Tags.of(app).add('Application', 'PnkDigital');
