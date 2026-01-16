import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config/types';

interface DatabaseStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
}

export class DatabaseStack extends cdk.Stack {
  public readonly enquiriesTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    const { config } = props;
    const isProd = config.environmentName === 'prod';

    // DynamoDB table for storing contact form enquiries
    this.enquiriesTable = new dynamodb.Table(this, 'EnquiriesTable', {
      tableName: `pnk-digital-enquiries-${config.environmentName}`,
      partitionKey: {
        name: 'enquiryId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'createdAt',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: isProd,
      },
      removalPolicy: isProd ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      timeToLiveAttribute: 'ttl',
    });

    // Global Secondary Index for querying by email
    this.enquiriesTable.addGlobalSecondaryIndex({
      indexName: 'email-index',
      partitionKey: {
        name: 'email',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'createdAt',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // Global Secondary Index for querying by status
    this.enquiriesTable.addGlobalSecondaryIndex({
      indexName: 'status-index',
      partitionKey: {
        name: 'status',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'createdAt',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // Outputs
    new cdk.CfnOutput(this, 'TableName', {
      value: this.enquiriesTable.tableName,
      description: 'DynamoDB Table Name',
      exportName: `PnkDigital-TableName-${config.environmentName}`,
    });

    new cdk.CfnOutput(this, 'TableArn', {
      value: this.enquiriesTable.tableArn,
      description: 'DynamoDB Table ARN',
      exportName: `PnkDigital-TableArn-${config.environmentName}`,
    });
  }
}
