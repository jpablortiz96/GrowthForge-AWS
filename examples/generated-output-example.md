# Generated Output Example

This is an abbreviated example of what the [GrowthForge master prompt](../prompt/growthforge-master-prompt.md) can produce from the [Eduky Cloud Academy input](startup-input-example.md). It is illustrative, not a deployable template or current AWS price quote.

## Architecture summary

Eduky will add a versioned product-event endpoint to its existing API Gateway. A dedicated Lambda collector validates a strict property allowlist, assigns trusted receipt fields, rejects direct PII, and sends newline-delimited events to Amazon Data Firehose. Firehose delivers compressed records to S3 partitions by event date and event name.

AWS Glue defines the schema and Athena views compute the checkout funnel, experiment exposure integrity, and outcomes. DynamoDB stores the experiment lifecycle and immutable decision summary. The Next.js application reads the `checkout_short_form` configuration from AWS AppConfig through a server-side cached path, then assigns variants with a stable hash of an opaque assignment key plus experiment salt.

EventBridge starts one daily analysis. Lambda runs versioned Athena SQL and sends only aggregates to Amazon Bedrock. The model returns validated JSON separating observation, uncertainty, and action. CloudWatch operates the pipeline; SNS sends the daily report and alarms.

The analytics and model path is not required for checkout availability. If analysis fails, events remain in S3 and checkout continues with the last-known-good flag.

## Event taxonomy

Canonical envelope fields include `event_id`, `event_name`, `event_version`, `occurred_at`, `received_at`, `anonymous_id`, `user_id`, `session_id`, `source`, `environment`, `properties`, and experiment context.

| Event | Trigger | Required properties | Funnel use |
| --- | --- | --- | --- |
| `session_started` | First approved activity in a web session | `entry_surface`, `device_class` | Session denominator |
| `course_viewed` | Course detail becomes visible | `course_id`, `catalog_category` | Discovery |
| `checkout_started` | Checkout is created server-side | `checkout_id`, `course_id`, `currency` | Intent |
| `experiment_exposed` | Checkout form variant is actually rendered | `experiment_id`, `variant_id`, `surface` | Experiment denominator |
| `checkout_details_submitted` | Valid details step accepted | `checkout_id`, `field_count` | Friction step |
| `purchase_completed` | Verified payment webhook creates order | `checkout_id`, `order_id`, `amount_band`, `currency` | Primary revenue outcome |
| `activation_completed` | Buyer starts first lesson within policy window | `order_id`, `course_id`, `hours_to_activation_band` | Activation |
| `checkout_error` | Checkout cannot continue | `checkout_id`, `error_class`, `step` | Guardrail |

`amount_band` is categorical. No email, name, phone, address, card data, authentication token, or free-form text is allowed.

## Funnel table

Illustrative 30-day baseline, one qualifying event per entity:

| Step | Count | From prior step | From checkout start |
| --- | ---: | ---: | ---: |
| Sessions | 10,000 | - | - |
| Checkout started | 2,400 | 24.0% | 100.0% |
| Details submitted | 1,440 | 60.0% | 60.0% |
| Purchase completed | 1,210 | 84.0% | 50.4% |
| Activated within 24h | 1,028 | 85.0% | 42.8% |

**Constraint:** 960 checkout starts fail to reach a valid details submission. Instrumentation must establish whether validation failures, voluntary abandonment, or another path explains the gap.

## Experiment backlog

| Rank | Hypothesis | Primary metric | Guardrails | ICE |
| ---: | --- | --- | --- | ---: |
| 1 | Reducing checkout from 7 fields to 4 increases purchase completion | Purchase per exposure | Payment error, refund, latency, duplicate order | 448 |
| 2 | Showing schedule and outcome proof beside the form reduces uncertainty | Purchase per exposure | Exit rate, latency | 336 |
| 3 | Sending a checkout recovery link within 30 minutes recovers intent | Purchase within 24h | Unsubscribe, complaint rate | 280 |
| 4 | Moving account creation after payment increases completion | Purchase per checkout | Activation, support contact, account-merge errors | 252 |

ICE uses 1-10 scores multiplied together. Experiment 1 scores impact 8, confidence 7, ease 8. Confidence remains below 8 because the baseline does not prove that form length is causal.

## Recommended experiment

**ID:** `checkout-friction-v1`  
**Hypothesis:** For eligible individual purchasers, rendering a four-field checkout instead of the current seven-field form will increase verified purchase completion per exposed checkout by at least 10% relative without increasing payment errors by more than 1 percentage point or reducing 24-hour activation by more than 2 percentage points.

| Element | Specification |
| --- | --- |
| Control | Existing seven-field checkout |
| Treatment | Four required fields; deferred non-payment fields after purchase |
| Assignment unit | Opaque authenticated user ID, else server-issued checkout ID |
| Assignment | Stable SHA-256 hash bucket using experiment salt; no PII |
| Target allocation | 50/50 after internal, 5%, and 25% ramps |
| Exposure | Emit once when the assigned form is visible and interactive |
| Primary metric | Verified `purchase_completed / experiment_exposed` within 24 hours |
| Guardrails | Checkout error, duplicate order, refund within 7 days, p95 latency, activation within 24h |
| Stop | Severe payment/duplicate-order regression or rollback alarm |
| Ship | Interval excludes zero and practical lift meets 10% relative after minimum runtime/sample |
| Inconclusive | Maximum runtime reached without integrity failure or practical evidence |

Before launch, collect a clean baseline and calculate sample size using the validated baseline, desired power, significance level, and minimum detectable effect. Do not reuse the illustrative counts as a power calculation.

## AWS AppConfig plan

```json
{
  "checkout_short_form": {
    "enabled": true,
    "experiment_id": "checkout-friction-v1",
    "allocation_percent": 50,
    "salt": "checkout-friction-v1-a",
    "variants": {
      "control": 50,
      "treatment": 50
    },
    "treatment_fields": 4
  }
}
```

- Application: `eduky-growthforge`
- Environments: `dev`, `staging`, `prod`
- Profile: `checkout-experiments`
- Validator: JSON Schema plus semantic Lambda validator for allocation totals and allowed fields
- Retrieval: cached server-side configuration with last-known-good fallback
- Rollback alarms: payment-error rate, checkout 5XX rate, duplicate-order rate
- Manual kill switch: set `enabled=false`; application resolves all assignments to control

AppConfig distributes configuration. The application performs stable assignment, and Athena evaluates experiment results.

## Revenue Learning Score

| Component | Score | Evidence | Gap |
| --- | ---: | --- | --- |
| Signal quality | 23/25 | Server purchase webhook, 98.7% valid events in fixture, opaque identity continuity | Validate duplicate rate in production |
| Funnel clarity | 21/25 | All five steps defined, denominators and windows declared | Four new events lack production baseline |
| Experiment readiness | 22/25 | Hypothesis, exposure, assignment, guardrails, ramp and rollback specified | Final sample size pending baseline |
| Decision velocity | 21/25 | Daily run, product owner, report and decision state | Decision date and on-call drill pending |
| **Total** | **87/100** | Decision-ready with named gaps | Complete baseline and rollback exercise |

The score measures readiness to learn; it does not forecast conversion lift.

## Bedrock-generated insight

Illustrative validated model output:

```json
{
  "analysis_id": "eduky-baseline-2026-06-07",
  "decision": "investigate",
  "observation": "Checkout details submission is the largest measured step loss: 60.0% of checkout starts reach details submission.",
  "interpretation": "Form friction is a plausible constraint, but the current taxonomy cannot distinguish validation failure from voluntary abandonment.",
  "uncertainty": [
    "Four required production events have not completed a baseline quality window.",
    "No experiment exposure data exists yet."
  ],
  "recommended_action": "Instrument details submission and error classes, validate for seven days, then start the internal four-field checkout stage.",
  "metric_ids": [
    "funnel.checkout_started.count",
    "funnel.checkout_details_submitted.rate_from_prior"
  ]
}
```

The model does not receive event rows or direct identifiers and cannot declare a causal winner.

## AWS service plan

| Service | First-version resource |
| --- | --- |
| API Gateway | `/v1/events` route with throttling and approved origin policy |
| Lambda | Collector plus scheduled analyzer/insight orchestrator |
| Data Firehose | Compressed S3 delivery with error prefix |
| S3 | Validated events, query results, reports, controlled error data |
| Glue/Athena | Explicit schema, validated views, funnel and experiment queries |
| DynamoDB | Experiment registry with conditional state transitions |
| AppConfig | Checkout flag profile with validators and staged deployment |
| EventBridge | Daily 08:00 UTC analysis schedule |
| Bedrock | Approved low-cost model/inference profile, at most two calls/run |
| CloudWatch/SNS | Dashboard, alarms, daily result notification |
| IAM/KMS/CloudTrail | Separated roles, encryption controls, management audit |
| Budgets/Anomaly Detection | $150 ceiling, threshold alerts, anomaly subscription |

## Security and cost plan

**Security**

- Reject unknown event names/versions and prohibited property keys.
- Keep payment and customer identity data in the transaction system.
- Use S3 Block Public Access, TLS-only policies, encryption, and lifecycle.
- Separate collector, Firehose, analyzer, flag-reader, and deployer roles.
- Log AppConfig, IAM, KMS, and storage management actions through CloudTrail.
- Treat Bedrock prompt/response logging as off until aggregate payload and retention are approved.

**Illustrative monthly estimate**

| Area | Range | Control |
| --- | ---: | --- |
| Ingestion and delivery | $6-$18 | Request throttles, bounded event size |
| S3, Glue, and Athena | $4-$16 | Partitions, compression, scan cutoff, retention |
| Registry and flags | $2-$10 | On-demand usage, cached AppConfig retrieval |
| Bedrock insights | $8-$25 | Daily schedule, two-call cap, token ceiling |
| Logs, metrics, notifications, security | $12-$30 | Log retention, low-cardinality metrics |
| **Estimated total** | **$32-$99/month** | Warning at $75; intervention at $120 |

This range is intentionally conservative and must be recalculated with current pricing for the Region, model, actual traffic, log volume, and query scans. It is not a bill guarantee.

**Kill-switch order:** pause Bedrock, move analysis to weekly, stop ad hoc scans, remove optional diagnostic events, preserve revenue/exposure events, force control if integrity is unsafe.
