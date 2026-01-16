import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config/types';
import * as path from 'path';

interface ApiStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  enquiriesTable: dynamodb.Table;
  allowedOrigins: string[];
}

export class ApiStack extends cdk.Stack {
  public readonly api: apigateway.HttpApi;
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { config, enquiriesTable, allowedOrigins } = props;

    // Map config retention days to CDK enum
    const retentionDaysMap: Record<number, logs.RetentionDays> = {
      7: logs.RetentionDays.ONE_WEEK,
      14: logs.RetentionDays.TWO_WEEKS,
      30: logs.RetentionDays.ONE_MONTH,
      90: logs.RetentionDays.THREE_MONTHS,
      365: logs.RetentionDays.ONE_YEAR,
    };

    // Log group for contact form Lambda
    const contactFormLogGroup = new logs.LogGroup(this, 'ContactFormLogGroup', {
      logGroupName: `/aws/lambda/pnk-digital-contact-form-${config.environmentName}`,
      retention: retentionDaysMap[config.logRetentionDays] || logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda function for contact form handling (using NodejsFunction for TypeScript bundling)
    const contactFormHandler = new NodejsFunction(this, 'ContactFormHandler', {
      functionName: `pnk-digital-contact-form-${config.environmentName}`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: path.join(__dirname, '../../lambda/contact-form/index.ts'),
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      architecture: lambda.Architecture.ARM_64,
      environment: {
        TABLE_NAME: enquiriesTable.tableName,
        NOTIFICATION_EMAIL: config.notificationEmail,
        FROM_EMAIL: config.fromEmail,
        ENVIRONMENT: config.environmentName,
      },
      tracing: lambda.Tracing.ACTIVE,
      logGroup: contactFormLogGroup,
      bundling: {
        minify: true,
        sourceMap: true,
        externalModules: [],
      },
    });

    // Grant DynamoDB write permissions
    enquiriesTable.grantWriteData(contactFormHandler);

    // Grant SES send permissions
    contactFormHandler.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'ses:SendEmail',
        'ses:SendRawEmail',
      ],
      resources: ['*'],
    }));

    // HTTP API with CORS
    this.api = new apigateway.HttpApi(this, 'HttpApi', {
      apiName: `pnk-digital-api-${config.environmentName}`,
      description: `PNK Digital API - ${config.environmentName}`,
      corsPreflight: {
        allowOrigins: allowedOrigins,
        allowMethods: [
          apigateway.CorsHttpMethod.GET,
          apigateway.CorsHttpMethod.POST,
          apigateway.CorsHttpMethod.OPTIONS,
        ],
        allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        maxAge: cdk.Duration.hours(24),
      },
    });

    // Add throttling to the API
    const stage = this.api.defaultStage?.node.defaultChild as apigateway.CfnStage;
    if (stage) {
      stage.addPropertyOverride('DefaultRouteSettings', {
        ThrottlingRateLimit: config.apiThrottling.rateLimit,
        ThrottlingBurstLimit: config.apiThrottling.burstLimit,
      });
    }

    // Lambda integration
    const contactFormIntegration = new integrations.HttpLambdaIntegration(
      'ContactFormIntegration',
      contactFormHandler
    );

    // POST /api/contact endpoint
    this.api.addRoutes({
      path: '/api/contact',
      methods: [apigateway.HttpMethod.POST],
      integration: contactFormIntegration,
    });

    // POST /api/quote endpoint (for project builder)
    this.api.addRoutes({
      path: '/api/quote',
      methods: [apigateway.HttpMethod.POST],
      integration: contactFormIntegration,
    });

    // Health check endpoint
    const healthCheckHandler = new lambda.Function(this, 'HealthCheckHandler', {
      functionName: `pnk-digital-health-${config.environmentName}`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async () => ({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() })
        });
      `),
      timeout: cdk.Duration.seconds(5),
      memorySize: 128,
      architecture: lambda.Architecture.ARM_64,
    });

    this.api.addRoutes({
      path: '/api/health',
      methods: [apigateway.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration('HealthCheckIntegration', healthCheckHandler),
    });

    // Store API URL
    this.apiUrl = this.api.apiEndpoint;

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: this.apiUrl,
      description: 'API Gateway URL',
      exportName: `PnkDigital-ApiUrl-${config.environmentName}`,
    });

    new cdk.CfnOutput(this, 'ApiId', {
      value: this.api.apiId,
      description: 'API Gateway ID',
      exportName: `PnkDigital-ApiId-${config.environmentName}`,
    });
  }
}
