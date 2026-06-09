# Prerequisites

GrowthForge AWS starts from a product decision, not from a blank AWS account. Gather the following information before running the [master prompt](../prompt/growthforge-master-prompt.md).

## Required

### 1. AWS account

Use an AWS account with billing access and a deliberate environment strategy:

- A dedicated sandbox account is preferred for the first implementation.
- Choose an AWS Region that satisfies product availability, latency, and data-residency requirements.
- Enable multi-factor authentication for privileged identities.
- Record whether the workload will use one account or separate development, staging, and production accounts.

Do not use root credentials for implementation.

### 2. IAM access

The person or deployment role preparing the solution needs permission to create the selected serverless, analytics, observability, security, and billing resources. The exact deployment permissions depend on the generated architecture and IaC tool.

At minimum, plan for controlled access to:

- API Gateway, Lambda, Amazon Data Firehose, S3, Glue, Athena, DynamoDB, AppConfig, EventBridge, Bedrock, CloudWatch, SNS or SES
- IAM role and policy creation, ideally through a reviewed deployment pipeline
- KMS key and grant management
- CloudTrail configuration
- AWS Budgets and Cost Anomaly Detection

Separate deployment permissions from runtime roles. The generated plan should scope each runtime role to named resources and specific actions.

### 3. Existing or planned MVP

Describe:

- Frontend and backend stack
- Where a server-side event collector can be called
- Authentication and anonymous-session behavior
- Deployment environments
- The product surface that can render a feature-flagged variant
- Existing logging, analytics, or event infrastructure

An idea-stage product can use the prompt, but its output will focus on an instrumentation plan rather than a live experiment.

### 4. Basic product events

Bring any current event names, schemas, or analytics screenshots. If nothing is instrumented, identify the smallest observable path from intent to value, for example:

```text
course_viewed
  -> checkout_started
  -> checkout_details_submitted
  -> purchase_completed
  -> activation_completed
```

Know which system can emit each event and which opaque identifier can connect the journey. Do not paste customer PII into the prompt.

### 5. Budget estimate

Set a monthly ceiling, not just a target. GrowthForge defaults to **$150/month** for early-stage usage.

Also choose:

- Budget alert recipients
- Warning thresholds, recommended at 50% and 80%
- A hard response at 100%
- Analysis cadence: daily or weekly
- Raw event retention, default 90 days
- Aggregate/report retention, default 395 days
- Whether Amazon Bedrock can be disabled without disabling event collection

Pricing varies by Region, event volume, queries, storage, model, and token use. The generated plan must show assumptions and ranges.

## Product information to prepare

| Input | Example |
| --- | --- |
| Primary goal | Increase paid checkout conversion |
| Unit of analysis | Account, user, session, or transaction |
| Baseline | 8.4% checkout-to-purchase, or unknown |
| Traffic | 8,000 monthly sessions |
| First constraint | Abandonment on checkout details |
| Guardrails | Payment errors, refund rate, page latency |
| Expected effect | Detect at least a 15% relative lift |
| Owner | Product lead |
| Decision date | Four weeks after launch |

Unknown values are acceptable. Label them as unknown so the prompt creates a baseline phase instead of inventing evidence.

## Security and governance inputs

Before implementation, identify:

- Data classification and direct/indirect identifiers
- Consent and privacy obligations
- Users who may be minors
- Payment, health, education, or regulated data boundaries
- Data deletion and retention requirements
- Who may start, stop, or decide an experiment
- Who owns incident, cost, and rollback responses

GrowthForge defaults to no direct PII in events and aggregate-only model inputs. That default does not replace legal or security review.

## Optional tools

### Kiro IDE or another coding agent

The prompt produces complete `requirements.md`, `design.md`, and `tasks.md` content suitable for Kiro-style spec-driven implementation. Any coding agent can use the artifacts if it can:

- Preserve requirement IDs and acceptance criteria
- Work in dependency order
- Run tests and validation commands
- Stop before deployment when approval is required

### Infrastructure as Code

Choose AWS CDK, AWS SAM, Terraform, or CloudFormation. If undecided, state the application's current language and repository conventions; the prompt should recommend the least disruptive option.

## Ready-to-run checklist

- [ ] AWS account and Region selected
- [ ] Billing and security owners named
- [ ] MVP stack described
- [ ] Primary revenue or activation outcome selected
- [ ] Current funnel/events listed, including unknowns
- [ ] Opaque identity strategy identified
- [ ] Traffic and baseline estimates gathered
- [ ] Data classification reviewed
- [ ] Monthly cost ceiling approved
- [ ] Alert destination selected
- [ ] IaC and coding-agent preference recorded

Use the [startup input example](../examples/startup-input-example.md) as a fill-in reference.
