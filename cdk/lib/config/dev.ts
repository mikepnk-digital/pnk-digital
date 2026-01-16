import { EnvironmentConfig } from './types';

export const devConfig: EnvironmentConfig = {
  environmentName: 'dev',

  // AWS Configuration
  region: 'eu-west-2',

  // Domain Configuration (optional - uncomment and configure when ready)
  // domain: 'dev.pnk-digital.com',
  // hostedZoneId: 'YOUR_HOSTED_ZONE_ID',

  // Email Configuration
  notificationEmail: 'mike@pnk-digital.com',
  fromEmail: 'noreply@pnk-digital.com',

  // API Throttling (more permissive for dev)
  apiThrottling: {
    rateLimit: 100,
    burstLimit: 200,
  },

  // CloudFront Configuration (cheaper for dev)
  priceClass: 'PriceClass_100',

  // Retention
  logRetentionDays: 7,
};
