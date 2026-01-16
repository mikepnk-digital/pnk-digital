#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebsiteStack, DatabaseStack, ApiStack, DnsStack } from '../lib/stacks';
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
// Initially, we'll use placeholder origins, then update after website stack
const apiStack = new ApiStack(app, `${stackPrefix}-Api`, {
  env,
  config,
  enquiriesTable: databaseStack.enquiriesTable,
  allowedOrigins: config.domain
    ? [`https://${config.domain}`, `https://www.${config.domain}`]
    : ['*'], // Will be restricted in production with domain
  description: `PNK Digital API Stack - ${config.environmentName}`,
  tags: {
    Environment: config.environmentName,
    Project: 'PnkDigital',
  },
});
apiStack.addDependency(databaseStack);

// 3. Website Stack (S3 + CloudFront)
const websiteStack = new WebsiteStack(app, `${stackPrefix}-Website`, {
  env,
  config,
  apiUrl: apiStack.apiUrl,
  description: `PNK Digital Website Stack - ${config.environmentName}`,
  tags: {
    Environment: config.environmentName,
    Project: 'PnkDigital',
  },
});
websiteStack.addDependency(apiStack);

// 4. DNS Stack (Route53 + ACM) - Only if domain is configured
if (config.domain && config.hostedZoneId) {
  // Note: ACM certificates for CloudFront must be in us-east-1
  const dnsStack = new DnsStack(app, `${stackPrefix}-Dns`, {
    env: {
      account: env.account,
      region: 'us-east-1', // Required for CloudFront certificates
    },
    config,
    distribution: websiteStack.distribution,
    description: `PNK Digital DNS Stack - ${config.environmentName}`,
    tags: {
      Environment: config.environmentName,
      Project: 'PnkDigital',
    },
    crossRegionReferences: true,
  });
  dnsStack.addDependency(websiteStack);
}

// Add tags to all stacks
cdk.Tags.of(app).add('ManagedBy', 'CDK');
cdk.Tags.of(app).add('Application', 'PnkDigital');
