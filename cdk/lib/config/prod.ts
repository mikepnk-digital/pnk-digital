import { EnvironmentConfig } from './types';

export const prodConfig: EnvironmentConfig = {
  environmentName: 'prod',

  // AWS Configuration
  region: 'eu-west-2',

  // Domain Configuration (uncomment and configure when ready)
  // domain: 'pnk-digital.com',
  // hostedZoneId: 'YOUR_HOSTED_ZONE_ID',

  // Email Configuration
  notificationEmail: 'mike@pnk-digital.com',
  fromEmail: 'noreply@pnk-digital.com',

  // API Throttling
  apiThrottling: {
    rateLimit: 50,
    burstLimit: 100,
  },

  // CloudFront Configuration (global distribution for prod)
  priceClass: 'PriceClass_All',

  // Retention
  logRetentionDays: 30,
};
