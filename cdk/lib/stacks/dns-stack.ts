import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config/types';

interface DnsStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  distribution?: cloudfront.Distribution;
}

export class DnsStack extends cdk.Stack {
  public readonly certificate?: acm.Certificate;
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

    // Note: Certificate must be created in us-east-1 for CloudFront
    // This stack should be deployed to us-east-1 separately
    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: config.domain,
      subjectAlternativeNames: [`www.${config.domain}`],
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
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

      // WWW redirect records
      new route53.ARecord(this, 'WwwAliasRecord', {
        zone: this.hostedZone,
        recordName: `www.${config.domain}`,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(distribution)
        ),
      });

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

    if (this.certificate) {
      new cdk.CfnOutput(this, 'CertificateArn', {
        value: this.certificate.certificateArn,
        description: 'ACM Certificate ARN',
        exportName: `PnkDigital-CertificateArn-${config.environmentName}`,
      });
    }
  }
}
