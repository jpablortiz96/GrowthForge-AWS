# Security and Cost Controls

GrowthForge treats security and cost as operating constraints on the learning loop. They are not tasks deferred until after instrumentation works.

## Security boundary

The default trust model is:

```text
untrusted product event
  -> authenticated/rate-limited endpoint
  -> schema and property allowlist
  -> redaction/rejection
  -> encrypted event lake
  -> deterministic aggregate
  -> bounded Bedrock input
  -> validated report
```

## Least-privilege IAM

Use separate roles:

| Role | Allowed responsibility | Must not do |
| --- | --- | --- |
| Collector Lambda | Write accepted records to one Firehose stream; emit scoped metrics/logs | Query events, change flags, invoke Bedrock |
| Firehose delivery | Write to named S3 prefixes and use the required KMS key | Read unrelated buckets |
| Analyzer Lambda | Start/read named Athena queries, read aggregates, update experiment state | Accept public requests, deploy infrastructure |
| Insight Lambda | Invoke approved Bedrock model/inference profile and write reports | Read raw event prefixes |
| Application flag reader | Retrieve one AppConfig application/environment/profile | Start deployments or update flags |
| CI/CD deployer | Create/update declared stack resources under review | Act as an application runtime |
| Analytics reader | Query approved views/workgroup | Read raw restricted prefixes unless justified |

Avoid `Resource: "*"`. When an API lacks resource-level permissions, document the exception, restrict actions and conditions, and evaluate a permissions boundary or organization policy.

## Encryption at rest and in transit

- Require TLS for API calls and deny non-TLS S3 requests.
- Enable S3 default encryption. Use a customer-managed KMS key when classification, separation, or audit requirements justify it.
- Encrypt DynamoDB and backups; decide whether the AWS owned key or a customer-managed key meets the control requirement.
- Associate KMS keys with sensitive CloudWatch log groups where required.
- Use an AppConfig KMS key when the configuration classification calls for it; never store secrets in feature flags.
- Separate key administrators from runtime key users.
- Constrain key policies with account and source conditions where supported.

Encryption does not replace data minimization.

## Event schema validation

The collector must:

- Accept only known event names and versions.
- Enforce required fields, types, enums, string lengths, object depth, and a small payload size.
- Allow only declared properties for each event.
- Validate timestamps against an allowed skew.
- Assign trusted `received_at` and environment fields server-side.
- Reject authentication material, payment fields, and direct identifiers.
- Emit rejection counts by low-cardinality reason.
- Send invalid records to a controlled diagnostic path only when doing so does not retain prohibited content.

Contract tests should include malformed JSON, unknown versions, oversized properties, PII canaries, replayed IDs, and out-of-order events.

## No PII by default

Do not collect:

- Email, name, phone number, postal address
- Raw IP address or full user agent unless specifically approved
- Password, session token, API key, or authentication header
- Card, bank, or payment instrument data
- Free-form customer text
- Sensitive demographic, health, education, or minor data without explicit review

Use random opaque identifiers. Keep any identity mapping inside the transactional application's protected boundary. Small segments can still create re-identification risk, so suppress or coarsen low-count reports.

## Retention and deletion

Recommended starting points:

| Data | Default | Rationale |
| --- | ---: | --- |
| Raw validated events | 90 days | Supports baseline, replay, and recent experiments |
| Rejected-event diagnostics | 7-14 days | Short debugging window; avoid prohibited payload retention |
| Athena query results | 7-30 days | Reproducibility without indefinite copies |
| Aggregates and decisions | 395 days | Year-over-year learning history |
| Application logs | 14-30 days | Operational diagnosis |
| CloudTrail management events | At least 365 days where governance requires | Change audit |

Adjust for legal, contractual, and restore requirements. Define deletion by tenant or data subject before collecting identifiers that make such requests applicable.

## Audit and observability

- Use CloudTrail for management activity affecting IAM, KMS, S3, AppConfig, DynamoDB, and the analysis workflow.
- Protect the trail destination from public access and unauthorized deletion.
- Use structured CloudWatch logs with correlation IDs and no raw event body by default.
- Alarm on ingestion errors, rejected-event spikes, delivery failure, stale data, failed analysis, AppConfig rollback, and unusual Bedrock usage.
- Persist experiment decisions and flag versions in DynamoDB or an immutable report artifact.
- Test alarm recipients and runbooks.

Bedrock invocation logging can record prompts and responses. Because GrowthForge model inputs contain aggregates, logging may be acceptable after review, but it remains disabled by default until destination encryption, retention, and access are approved.

## Cost model

Every generated estimate must include:

```text
monthly events x average event bytes
API requests
Lambda requests and GB-seconds
Firehose GB ingested and processing
S3 storage, requests, lifecycle, and retrieval
Glue catalog/crawler use
Athena TB scanned
DynamoDB reads/writes/storage/backups
AppConfig retrieval/deployment behavior
EventBridge invocations
Bedrock input/output tokens and calls
CloudWatch logs, custom metrics, dashboards, and alarms
SNS/SES delivery
KMS requests
CloudTrail storage/data events
```

Use current official pricing for the chosen Region and date the estimate. Free-tier benefits are discounts, not permanent assumptions.

## Budget alarms

For a $150/month ceiling:

| Threshold | Amount | Response |
| --- | ---: | --- |
| 50% actual | $75 | Review top service and trend |
| 80% actual | $120 | Pause nonessential Bedrock runs and ad hoc Athena scans |
| 100% actual | $150 | Apply kill-switch order and notify owner |
| Forecast | Before $150 | Review assumptions before the bill crosses the ceiling |

Configure AWS Cost Anomaly Detection with a threshold that is meaningful at this scale, such as a minimum impact plus a percentage change. Route alerts to an owned SNS destination.

Use a dedicated Bedrock budget or usage alarm. AWS documentation currently notes that Cost Anomaly Detection does not cover some third-party model charges when they are billed through AWS Marketplace or another billing entity.

## Kill-switch strategy

The learning stack must degrade in this order:

1. Pause Bedrock insight generation; publish deterministic metrics only.
2. Reduce analysis from daily to weekly.
3. Stop optional ad hoc Athena queries and compaction.
4. Disable low-value diagnostic events.
5. Preserve primary funnel, revenue, error, and `experiment_exposed` events.
6. Force all experiments to control if data quality or cost makes decisions unsafe.
7. Stop ingestion only as a final action approved by product and engineering owners.

Bedrock and treatment rollout require independent switches.

## Bedrock cost ceiling

Default controls:

- One scheduled insight run per day
- No more than two model calls per run
- Aggregate input only
- Explicit input and output token caps
- One approved model or inference profile
- Timeout and bounded retry
- Daily invocation-count alarm
- Monthly budget allocation
- Deterministic no-model fallback

The model must not retry malformed outputs indefinitely. Validate once, optionally repair once within the same run budget, then publish the fallback.

## Athena cost controls

- Use a dedicated workgroup with enforced settings.
- Require partition predicates for production queries.
- Set bytes-scanned cutoffs appropriate to the monthly budget.
- Compress events; compact to Parquet only when measured savings justify the job.
- Expire query results.
- Version production SQL.
- Separate human exploration from scheduled queries and tag both.

## Control ownership

| Control | Owner | Review trigger |
| --- | --- | --- |
| Event allowlist | Analytics/product engineering | New event or version |
| IAM policies | Cloud/security owner | New service or permission |
| Retention | Product/legal/security | New data class or jurisdiction |
| AppConfig rollback | Experiment owner and on-call | Every experiment |
| Budget thresholds | Engineering and finance owner | Traffic/model/Region change |
| Bedrock input policy | Security/product owner | New metric or model |
| Kill switches | On-call and product owner | Alarm exercise or incident |

No control is complete until its owner and response are tested.
