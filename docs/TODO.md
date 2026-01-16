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
**Status:** [~] In progress - Infrastructure complete, pending AWS deployment

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

**Implementation Progress:**
- CDK infrastructure fully implemented and synthesizing successfully
- Frontend API integration complete with error handling
- CI/CD workflows created for GitHub Actions
- Awaiting AWS credentials configuration and first deployment

**Acceptance Criteria:**

**Infrastructure:**
- [x] CDK app bootstrapped with TypeScript for type safety
- [x] Separate stacks for dev and prod environments with environment-specific configuration
- [x] S3 bucket configured for static website hosting with proper CORS settings
- [x] CloudFront distribution configured with S3 origin and HTTPS-only access
- [x] Custom domain configured via Route53 (if applicable) - DNS stack ready, domain config optional
- [x] ACM certificate provisioned and attached to CloudFront for SSL/TLS - DNS stack ready
- [x] S3 bucket configured as private with CloudFront OAC for security
- [x] Appropriate tags applied to all resources for cost tracking

**Backend API:**
- [x] API Gateway HTTP API configured for contact form submissions
- [x] Lambda function deployed to handle form submissions (contact + quote endpoints)
- [x] DynamoDB table created with appropriate partition/sort keys for enquiries
- [x] Lambda IAM roles with least-privilege permissions (DynamoDB write, SES send)
- [x] API Gateway CORS configured to allow requests from CloudFront domain
- [x] Request validation implemented in Lambda handler
- [x] Lambda environment variables managed through CDK for configuration

**Email Functionality:**
- [x] Lambda function sends enquiry notification to business email (SES integration)
- [x] Lambda function sends confirmation email to customer
- [x] Email templates stored inline with professional HTML/text formatting
- [x] Email delivery failures handled with non-blocking error responses
- [ ] Amazon SES verified for sending domain/email (requires AWS deployment)
- [ ] SES production access requested (currently sandbox mode)

**Deployment & CI/CD:**
- [x] CDK synthesis and deployment commands added to package.json
- [x] GitHub Actions workflows configured for automated deployments
- [x] Deployment workflow includes: npm build → CDK synth → CDK deploy
- [x] Separate deployment workflows/triggers for dev (PR) vs prod (main push)
- [x] CloudFront cache invalidation included in prod deployment
- [ ] Environment secrets configured in GitHub (AWS_ROLE_ARN, API URLs)
- [ ] AWS OIDC provider configured for GitHub Actions
- [ ] Rollback strategy documented

**Security & Compliance:**
- [x] CloudFront configured with security headers (CSP, HSTS, X-Frame-Options, etc.)
- [x] S3 bucket encryption enabled (SSE-S3)
- [x] S3 bucket public access blocked (all four settings)
- [x] API Gateway throttling configured to prevent abuse
- [x] DynamoDB point-in-time recovery enabled for prod
- [x] IAM policies follow least-privilege principle
- [x] No hardcoded secrets in code or CDK stacks
- [ ] CloudWatch alarms configured for critical metrics (post-deployment)

**Cost Optimization:**
- [x] CloudFront caching configured (CACHING_OPTIMIZED policy)
- [x] Lambda optimized (ARM64 architecture, appropriate memory/timeout)
- [x] DynamoDB on-demand pricing configured
- [x] CloudWatch log retention periods set (7 days dev, 30 days prod)
- [x] Cost allocation tags applied (Environment, Project, ManagedBy)
- [ ] S3 lifecycle policies (evaluate post-deployment)

**Monitoring & Observability:**
- [x] CloudWatch Logs configured for Lambda functions with retention
- [x] X-Ray tracing enabled for Lambda
- [ ] CloudWatch dashboard created with key metrics (post-deployment)
- [ ] CloudWatch alarms for error rates and latency (post-deployment)
- [ ] CloudFront access logs enabled (evaluate cost post-deployment)

**Documentation:**
- [x] Architecture diagram in TODO.md
- [x] CDK deployment commands documented (package.json scripts)
- [x] Environment variable configuration documented (.env.example)
- [x] Cost estimates documented in TODO.md
- [ ] Full README documentation for CDK deployment
- [ ] Disaster recovery procedures documented

**Frontend Integration:**
- [x] API utility functions created (src/utils/api.js)
- [x] Contact form integrated with API
- [x] Project Builder submission modal integrated with API
- [x] Loading states during submission
- [x] Success/error feedback to users
- [x] Development fallback mode (simulates API when URL not configured)

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

**Files Created:**
- `/cdk/package.json` - CDK project dependencies
- `/cdk/tsconfig.json` - TypeScript configuration
- `/cdk/cdk.json` - CDK app configuration
- `/cdk/bin/app.ts` - CDK app entry point
- `/cdk/lib/config/types.ts` - Environment config types
- `/cdk/lib/config/dev.ts` - Development environment config
- `/cdk/lib/config/prod.ts` - Production environment config
- `/cdk/lib/config/index.ts` - Config exports
- `/cdk/lib/stacks/website-stack.ts` - S3 + CloudFront stack
- `/cdk/lib/stacks/database-stack.ts` - DynamoDB stack
- `/cdk/lib/stacks/api-stack.ts` - API Gateway + Lambda stack
- `/cdk/lib/stacks/dns-stack.ts` - Route53 + ACM stack (optional)
- `/cdk/lib/stacks/index.ts` - Stack exports
- `/cdk/lambda/contact-form/index.ts` - Lambda handler with SES emails
- `/cdk/lambda/contact-form/types.ts` - TypeScript types
- `/cdk/lambda/contact-form/package.json` - Lambda dependencies
- `/.github/workflows/deploy-dev.yml` - Dev deployment (PR trigger)
- `/.github/workflows/deploy-prod.yml` - Prod deployment (main push trigger)
- `/.env.example` - Environment variable template
- `/.env` - Local development environment
- `/src/utils/api.js` - API utility functions

**Files Modified:**
- `/package.json` - Added CDK deploy scripts
- `/.gitignore` - Added CDK build artifacts
- `/vite.config.js` - Added environment variable support
- `/src/utils/index.js` - Added API exports
- `/src/components/sections/Contact.jsx` - Integrated with API, added feedback
- `/src/components/sections/ProjectBuilder/SubmissionModal.jsx` - Integrated with API


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

*Last updated: 2026-01-16*
