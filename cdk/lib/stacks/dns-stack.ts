import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config/types';

interface DnsStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  distribution?: cloudfront.Distribution;
}

export class DnsStack extends cdk.Stack {
  public readonly hostedZone?: route53.IHostedZone;

  constructor(scope: Construct, id: string, props: DnsStackProps) {
    super(scope, id, props);

    const { config, distribution } = props;

    // Only create DNS resources if domain is configured
    if (!config.domain || !config.hostedZoneId) {
      console.log('Domain not configured. Skipping DNS stack resources.');
      return;
    }

    // Look up the existing hosted zone
    this.hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: config.hostedZoneId,
      zoneName: config.domain,
    });

    // Create Route53 records pointing to CloudFront (if distribution provided)
    if (distribution) {
      // A record for root domain
      new route53.ARecord(this, 'AliasRecord', {
        zone: this.hostedZone,
        recordName: config.domain,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(distribution)
        ),
      });

      // AAAA record for IPv6
      new route53.AaaaRecord(this, 'AliasRecordV6', {
        zone: this.hostedZone,
        recordName: config.domain,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(distribution)
        ),
      });

      // WWW A record
      new route53.ARecord(this, 'WwwAliasRecord', {
        zone: this.hostedZone,
        recordName: `www.${config.domain}`,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(distribution)
        ),
      });

      // WWW AAAA record for IPv6
      new route53.AaaaRecord(this, 'WwwAliasRecordV6', {
        zone: this.hostedZone,
        recordName: `www.${config.domain}`,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(distribution)
        ),
      });
    }

    // Outputs
    new cdk.CfnOutput(this, 'DomainName', {
      value: config.domain,
      description: 'Domain Name',
      exportName: `PnkDigital-DomainName-${config.environmentName}`,
    });
  }
}
