# PNK Digital - Development TODO

> This document tracks planned features, improvements, and tasks for the PNK Digital website.
> Each item includes context and acceptance criteria to ensure clear implementation.

---

## Priority Levels

- **P0** - Critical / Blocking
- **P1** - High priority / Should do soon
- **P2** - Medium priority / Nice to have
- **P3** - Low priority / Future consideration

## Status Key

- [ ] Not started
- [x] Completed
- [~] In progress

---

## Features

### Feature: CDK integration to host with AWS services
**Priority:** P1
**Status:** [ ] Not started

**Description:**
This website will need to be hosted using AWS so I want to use CDK to construct and deploy all the
services required to host this website to store and send out enquiries by email

**Requirements:**
- CDK setup to use AWS
- Deployment environments dev and prod
- Host the website on S3
- Store enquiries within a DynamoDB table
- Send enquiries via email
- Send confirmation email to customer

**Acceptance Criteria:**

**Infrastructure:**
- [ ] CDK app bootstrapped with TypeScript for type safety
- [ ] Separate stacks for dev and prod environments with environment-specific configuration
- [ ] S3 bucket configured for static website hosting with proper CORS settings
- [ ] CloudFront distribution configured with S3 origin and HTTPS-only access
- [ ] Custom domain configured via Route53 (if applicable)
- [ ] ACM certificate provisioned and attached to CloudFront for SSL/TLS
- [ ] S3 bucket configured as private with CloudFront OAI/OAC for security
- [ ] Appropriate tags applied to all resources for cost tracking

**Backend API:**
- [ ] API Gateway REST or HTTP API configured for contact form submissions
- [ ] Lambda function(s) deployed to handle form submissions
- [ ] DynamoDB table created with appropriate partition/sort keys for enquiries
- [ ] Lambda IAM roles with least-privilege permissions (DynamoDB write, SES send)
- [ ] API Gateway CORS configured to allow requests from CloudFront domain
- [ ] Request validation implemented at API Gateway level
- [ ] Lambda environment variables managed through CDK for configuration

**Email Functionality:**
- [ ] Amazon SES configured and verified for sending domain/email
- [ ] Lambda function sends enquiry notification to business email
- [ ] Lambda function sends confirmation email to customer
- [ ] Email templates stored and managed appropriately (S3 or inline)
- [ ] SES sandbox limitations documented or production access requested
- [ ] Email delivery failures handled with appropriate error responses

**Deployment & CI/CD:**
- [ ] CDK synthesis and deployment commands documented in README
- [ ] GitHub Actions (or equivalent) workflow configured for automated deployments
- [ ] Deployment workflow includes: npm build → CDK synth → CDK deploy
- [ ] Environment secrets managed securely (AWS credentials, API keys)
- [ ] Build artifacts cached for faster deployments
- [ ] Separate deployment workflows/triggers for dev vs prod
- [ ] Rollback strategy documented

**Security & Compliance:**
- [ ] CloudFront configured with security headers (CSP, HSTS, X-Frame-Options)
- [ ] S3 bucket encryption enabled (SSE-S3 or SSE-KMS)
- [ ] S3 bucket public access blocked (all four settings)
- [ ] API Gateway throttling configured to prevent abuse
- [ ] DynamoDB point-in-time recovery enabled for prod
- [ ] CloudWatch alarms configured for critical metrics (4xx/5xx errors, Lambda failures)
- [ ] IAM policies follow least-privilege principle
- [ ] No hardcoded secrets in code or CDK stacks

**Cost Optimization:**
- [ ] S3 lifecycle policies configured for old/unused objects
- [ ] CloudFront caching configured appropriately (TTL settings)
- [ ] Lambda memory/timeout optimized after performance testing
- [ ] DynamoDB on-demand pricing vs provisioned capacity evaluated
- [ ] CloudWatch log retention periods set (not indefinite)
- [ ] Cost allocation tags applied consistently

**Monitoring & Observability:**
- [ ] CloudWatch Logs configured for Lambda functions
- [ ] CloudWatch dashboard created with key metrics
- [ ] CloudWatch alarms for error rates and latency
- [ ] CloudFront access logs enabled (optional, consider cost)
- [ ] X-Ray tracing enabled for API Gateway and Lambda (optional)

**Documentation:**
- [ ] Architecture diagram created showing all AWS components
- [ ] CDK deployment instructions in README
- [ ] Environment variable configuration documented
- [ ] API endpoint URLs documented for frontend integration
- [ ] Cost estimates documented for expected traffic levels
- [ ] Disaster recovery procedures documented

**Technical Notes:**

**Architecture Overview:**
```
User Browser
    ↓
CloudFront (CDN) + ACM Certificate
    ↓
S3 Bucket (Static Website - React SPA)

Contact Form Submission
    ↓
API Gateway (REST/HTTP API)
    ↓
Lambda Function (Form Handler)
    ↓
    ├→ DynamoDB (Store Enquiry)
    └→ SES (Send Emails - notification + confirmation)
```

**AWS Services & CDK Constructs:**

1. **Static Website Hosting:**
   - Use `@aws-cdk/aws-s3` for bucket creation
   - Use `@aws-cdk/aws-cloudfront` for CDN distribution
   - Use `@aws-cdk/aws-cloudfront-origins` for S3 origin configuration
   - Use `@aws-cdk/aws-s3-deployment` for automatic asset deployment during CDK deploy
   - Consider `CloudFrontWebDistribution` (L2) or `Distribution` (L2) constructs
   - Enable gzip/brotli compression at CloudFront level

2. **Custom Domain (Optional but Recommended):**
   - Use `@aws-cdk/aws-route53` for DNS management
   - Use `@aws-cdk/aws-route53-targets` for CloudFront alias records
   - Use `@aws-cdk/aws-certificatemanager` for SSL/TLS certificates
   - Certificates for CloudFront must be created in us-east-1 region

3. **Backend API:**
   - Use `@aws-cdk/aws-apigateway` for REST API or `@aws-cdk/aws-apigatewayv2` for HTTP API
   - HTTP API is cheaper and simpler; REST API has more features
   - Use `@aws-cdk/aws-lambda-nodejs` for Node.js Lambda functions with esbuild bundling
   - Consider Lambda function URL as alternative to API Gateway (simpler but less features)

4. **Database:**
   - Use `@aws-cdk/aws-dynamodb` for table creation
   - Recommended schema: PK=`enquiryId` (UUID), SK=`timestamp`, GSI on email for lookups
   - Use on-demand billing for unpredictable traffic patterns
   - Enable point-in-time recovery for prod environment

5. **Email Service:**
   - Use `@aws-cdk/aws-ses` for email identity verification (domain or email)
   - SES starts in sandbox mode - must request production access for unrestricted sending
   - Store email templates in S3 or use SES template feature
   - Consider SNS topic for email delivery notifications/bounces

**CDK Project Structure:**
```
cdk/
├── bin/
│   └── app.ts                    # CDK app entry point
├── lib/
│   ├── stacks/
│   │   ├── website-stack.ts      # S3 + CloudFront
│   │   ├── api-stack.ts          # API Gateway + Lambda
│   │   ├── database-stack.ts     # DynamoDB
│   │   └── dns-stack.ts          # Route53 + ACM (optional)
│   ├── constructs/               # Reusable L3 constructs
│   └── config/
│       ├── dev.ts                # Dev environment config
│       └── prod.ts               # Prod environment config
├── lambda/
│   └── contact-form/
│       ├── index.ts              # Lambda handler
│       ├── types.ts
│       └── templates/            # Email templates
├── cdk.json
├── package.json
└── tsconfig.json
```

**Environment Configuration Pattern:**
```typescript
// lib/config/types.ts
export interface EnvironmentConfig {
  environmentName: string;
  domain?: string;
  certificateArn?: string;
  notificationEmail: string;
  apiThrottling: {
    rateLimit: number;
    burstLimit: number;
  };
}

// lib/config/dev.ts
export const devConfig: EnvironmentConfig = {
  environmentName: 'dev',
  notificationEmail: 'dev@pnkdigital.com',
  apiThrottling: { rateLimit: 10, burstLimit: 20 }
};
```

**Security Best Practices:**
- Use CloudFront Origin Access Control (OAC) instead of legacy OAI
- Implement CloudFront Functions or Lambda@Edge for security headers
- Enable S3 bucket versioning for accidental deletion protection
- Use AWS WAF with CloudFront for DDoS protection (evaluate cost)
- Implement request validation schema in API Gateway
- Sanitize user inputs in Lambda before storing in DynamoDB
- Use VPC for Lambda only if accessing VPC resources (adds cold start latency)

**CI/CD Implementation (GitHub Actions Example):**
```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS
on:
  push:
    branches: [main]  # prod deployment
  workflow_dispatch:  # manual trigger

env:
  AWS_REGION: us-east-1
  NODE_VERSION: '18.x'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies (root)
        run: npm ci

      - name: Build React app
        run: npm run build

      - name: Install CDK dependencies
        working-directory: ./cdk
        run: npm ci

      - name: CDK Synth
        working-directory: ./cdk
        run: npx cdk synth

      - name: CDK Deploy
        working-directory: ./cdk
        run: npx cdk deploy --all --require-approval never
```

**Cost Estimates (Monthly - Low Traffic):**
- CloudFront: ~$1-5 (1GB transfer, 10k requests)
- S3: ~$0.50 (1GB storage + requests)
- API Gateway: ~$1 (1M requests for HTTP API)
- Lambda: ~$0.20 (free tier covers most low traffic)
- DynamoDB: ~$0.25 (on-demand, low writes)
- SES: $0 (62k emails/month free tier)
- Route53: ~$0.50/hosted zone (if using custom domain)
- **Total: ~$3-8/month for low traffic**

**Implementation Phases:**
1. **Phase 1 - Basic Infrastructure:**
   - CDK setup with TypeScript
   - S3 + CloudFront for static hosting
   - Manual deployment to validate

2. **Phase 2 - Backend Services:**
   - DynamoDB table
   - Lambda function for contact form
   - API Gateway integration
   - SES configuration

3. **Phase 3 - Custom Domain (Optional):**
   - Route53 hosted zone
   - ACM certificate
   - CloudFront custom domain configuration

4. **Phase 4 - CI/CD:**
   - GitHub Actions workflow
   - Automated deployments
   - Environment-specific configurations

5. **Phase 5 - Monitoring & Optimization:**
   - CloudWatch dashboards
   - Alarms and notifications
   - Performance tuning
   - Cost optimization review

**Frontend Integration Notes:**
- API Gateway endpoint URL will be output from CDK deployment
- Store API endpoint in environment variables (.env.production)
- Update Vite config to inject at build time
- Implement proper error handling for API calls
- Add loading states during form submission
- Consider implementing client-side rate limiting

**CDK Commands Reference:**
```bash
# Bootstrap CDK (one-time per account/region)
npx cdk bootstrap aws://ACCOUNT-ID/REGION

# Synthesize CloudFormation template
npx cdk synth

# Deploy to dev environment
npx cdk deploy --all --context environment=dev

# Deploy to prod environment
npx cdk deploy --all --context environment=prod

# Destroy all resources (careful!)
npx cdk destroy --all

# View differences before deployment
npx cdk diff
```

**Potential Challenges & Solutions:**
- **Challenge:** SES sandbox mode limits sending
  - **Solution:** Request production access early, or use verified emails for testing

- **Challenge:** CloudFront propagation takes 15-30 minutes
  - **Solution:** Use CloudFront invalidation for cache busting, plan for deployment windows

- **Challenge:** CORS issues with API Gateway
  - **Solution:** Configure CORS properly in CDK, test with different origins

- **Challenge:** Cold starts on Lambda
  - **Solution:** Implement provisioned concurrency for prod (evaluate cost), or accept cold starts for low-traffic site

**Files to Create:**
- `/cdk/*` - All CDK infrastructure code
- `/lambda/contact-form/index.ts` - Lambda function handler
- `/.github/workflows/deploy.yml` - CI/CD pipeline
- `/cdk/README.md` - CDK deployment documentation

**Files to Modify:**
- `/package.json` - Add CDK deploy scripts
- `/.env.example` - Add API endpoint environment variable example
- `/src/components/sections/Contact.jsx` - Update to call API Gateway endpoint
- `/vite.config.js` - Configure environment variable injection


---

### Feature: [Example - Dark/Light Mode Toggle]
**Priority:** P2
**Status:** [ ] Not started

**Description:**
Add a theme toggle that allows users to switch between dark mode (current) and a light mode variant. The preference should persist across sessions.

**Requirements:**
- Toggle button in the navbar
- Smooth transition between themes
- Persist user preference in localStorage
- Default to dark mode

**Acceptance Criteria:**
- [ ] Toggle button visible in navbar on all screen sizes
- [ ] Theme changes apply to all components immediately
- [ ] User preference persists after page refresh
- [ ] No flash of incorrect theme on page load

**Technical Notes:**
- Consider using CSS custom properties for theme colors
- Update `tailwind.config.js` for light mode variants
- Affected files: Navbar.jsx, all components using color tokens

---

## Improvements

### Improvement: [Improvement Name]
**Priority:** P2
**Status:** [ ] Not started

**Description:**
[What needs to be improved and why]

**Current Behavior:**
[How it works now]

**Desired Behavior:**
[How it should work after the improvement]

**Files to Modify:**
- [File path 1]
- [File path 2]

---

## Bug Fixes

### Bug: [Bug Title]
**Priority:** P1
**Status:** [ ] Not started

**Description:**
[Clear description of the bug]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Affected Files:**
- [File path]

---

## Content Updates

### Content: [Content Update Title]
**Priority:** P3
**Status:** [x] Complete

**Description:**
Make the content in the website reflect what the business actually wants to market itself as and provide the relevant services. The company aims to help other companies develop their software projects faster than competitors by leverating AI tools. We can build websites, applications, software tools, and we can also consult and help with working with AI within a company. I want companies to be aware that we have the power to build what they want without having to hire a large dev team or large agency. Therefore bringing costs down and shorten delivery times.

**Location:**
All sections of the site

**New Content:**
```
[The actual content to add/update]
```

---

## Accessibility

### A11y: [Accessibility Issue]
**Priority:** P1
**Status:** [ ] Not started

**Description:**
[What accessibility issue needs to be fixed]

**WCAG Guideline:**
[Relevant WCAG criterion if applicable]

**Fix Required:**
[What needs to be done to fix it]

---

## Notes

[Any general notes, ideas, or considerations that don't fit into the above categories]

---

*Last updated: [Date]*
