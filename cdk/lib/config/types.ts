export interface EnvironmentConfig {
  environmentName: 'dev' | 'prod';

  // AWS Configuration
  account?: string;
  region: string;

  // Domain Configuration (optional)
  domain?: string;
  hostedZoneId?: string;

  // Email Configuration
  notificationEmail: string;
  fromEmail: string;
  sesRegion?: string;

  // API Throttling
  apiThrottling: {
    rateLimit: number;
    burstLimit: number;
  };

  // CloudFront Configuration
  priceClass: 'PriceClass_100' | 'PriceClass_200' | 'PriceClass_All';

  // Retention
  logRetentionDays: number;
}

export interface StackProps {
  config: EnvironmentConfig;
}
