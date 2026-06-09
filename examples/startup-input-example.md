# Startup Input Example: Eduky Cloud Academy

This fictional input shows the level of context GrowthForge needs. Values marked as estimates must be validated during the baseline period.

```yaml
company_name: "Eduky Cloud Academy"
product: >
  A web platform where working professionals discover, purchase, and complete
  instructor-led cloud engineering courses.
business_model: "One-time course purchases with a planned membership tier"
primary_goal: >
  Increase checkout-to-purchase conversion and the percentage of new buyers
  who activate by starting their first lesson within 24 hours.
target_users:
  - "Spanish-speaking junior and mid-career developers in Latin America"
  - "Small companies purchasing individual seats"
current_funnel:
  - "course_viewed"
  - "checkout_started"
  - "checkout_details_submitted"
  - "purchase_completed"
  - "activation_completed"
current_events:
  - "page_viewed (inconsistent properties)"
  - "checkout_started"
  - "purchase_completed (server-side payment webhook)"
traffic:
  monthly_active_users: 6200
  monthly_sessions: 10000
  monthly_transactions: 1210
baseline_metrics:
  course_view_to_checkout: "24% estimate"
  checkout_to_purchase: "50% estimate"
  purchase_to_activation_24h: "85% estimate"
application_stack:
  frontend: "Next.js web application"
  backend: "Node.js API on AWS Lambda behind Amazon API Gateway"
  payments: "External payment provider; webhook verified by the backend"
  hosting: "AWS"
aws_region: "us-east-1; current application Region, pending residency review"
aws_account_model: "Single AWS account with separate dev, staging, and prod stacks"
data_classification: >
  Internal product analytics. Direct PII and payment details must remain in the
  transactional system and must not enter GrowthForge events.
compliance_constraints:
  - "Privacy notice and consent review required"
  - "Some learners may be 16-17; legal review required before segmentation"
  - "Payment provider remains responsible for card-data handling"
data_residency: "No contractual restriction currently known; confirm before production"
monthly_cost_ceiling_usd: 150
analysis_frequency: "Daily at 08:00 UTC"
event_retention_days:
  raw_validated: 90
  rejected_diagnostics: 7
  aggregates_and_decisions: 395
alert_destination: "Amazon SNS email to engineering and product owners"
team_and_ownership:
  product_owner: "Head of Product"
  engineering_owner: "Platform lead"
  experiment_decider: "Head of Product"
  cost_owner: "Founder"
deployment_tooling: "AWS CDK with TypeScript"
coding_agent: "Kiro"
```

## Current observation

In an illustrative 30-day sample:

| Step | Entities | Step conversion |
| --- | ---: | ---: |
| Sessions | 10,000 | 100% |
| Checkout started | 2,400 | 24.0% of sessions |
| Details submitted | 1,440 | 60.0% of checkout starts |
| Purchase completed | 1,210 | 84.0% of details submitted |
| Activated within 24h | 1,028 | 85.0% of purchases |

The largest observable checkout loss occurs before details are submitted. This is not yet proof that field count causes abandonment.

## Candidate first experiment

> Reduce checkout friction by testing a 4-field checkout variant against the current 7-field checkout.

Proposed scope:

- Eligible: individual course purchasers on supported web devices
- Excluded: company-seat purchases, returning checkout sessions, internal users, payment recovery flows
- Unit: opaque user ID when authenticated, otherwise opaque checkout ID
- Primary metric: `purchase_completed / experiment_exposed`
- Guardrails: payment-error rate, refund rate, p95 checkout latency, duplicate-order rate
- Rollout: internal -> 5% -> 25% -> 50/50 target
- Kill switch: force the seven-field control and preserve event collection

## Known questions

1. Can the four removed fields be collected after payment without increasing support or fulfillment failures?
2. Is the current checkout baseline based on users, sessions, or checkout attempts?
3. Can the frontend and payment webhook share an opaque checkout identifier?
4. What minimum relative lift is economically meaningful?
5. Does the minor-user possibility change event retention or segmentation?
6. Which Bedrock models are available and approved in the selected Region?

The master prompt should treat questions 1-3 and the data-classification review as blocking before implementation.
