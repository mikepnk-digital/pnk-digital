import { EnvironmentConfig } from './types';

export const prodConfig: EnvironmentConfig = {
  environmentName: 'prod',

  // AWS Configuration
  region: 'eu-west-2',

  // Domain Configuration
  domain: 'pnk-digital.com',
  hostedZoneId: 'Z05219169HP8RP7E1LEN',

  // Email Configuration
  notificationEmail: 'mike@pnk-digital.com',
  fromEmail: 'contact@pnk-digital.com',
  sesRegion: 'eu-west-1',

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
