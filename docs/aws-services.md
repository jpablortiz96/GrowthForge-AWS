# AWS Services

GrowthForge uses AWS services as a small decision loop, not as a service checklist. The master prompt must remove or defer a component when the product's volume, latency, or risk does not justify it.

## Service map

| AWS service | Role in GrowthForge | Why it is used | Primary cost driver |
| --- | --- | --- | --- |
| Amazon API Gateway | Public or application-facing event endpoint | Authentication integration, throttling, quotas, request limits, and Lambda routing | Requests and data transfer |
| AWS Lambda | Event collector and scheduled analyzer | Serverless validation, enrichment, query orchestration, and bounded model invocation | Invocations, duration, memory |
| Amazon Data Firehose | Buffered event delivery to S3 | Managed delivery, retry, compression/format options, and failed-record handling | Data ingested and optional processing |
| Amazon S3 | Durable event lake, query results, reports | Low-cost object storage, lifecycle, partitioning, encryption, and replay source | Stored GB, requests, retrieval |
| AWS Glue Data Catalog | Event-table metadata | Gives Athena controlled schemas over S3 data | Catalog requests and optional crawlers |
| Amazon Athena | Funnel and experiment SQL | Serverless analysis without an always-on warehouse | Data scanned |
| Amazon DynamoDB | Experiment registry and state | Conditional state transitions, ownership, decision history, and low-ops storage | Reads, writes, storage, backups |
| AWS AppConfig | Feature-flag configuration delivery | Validators, gradual deployment, caching, and CloudWatch-alarm rollback | Configuration requests and deployments |
| Amazon EventBridge | Analysis schedule | Starts daily or weekly analysis without an always-on scheduler | Events |
| Amazon Bedrock | Evidence-grounded insight | Converts computed aggregates into a structured observation, uncertainty, and action | Model calls and tokens |
| Amazon CloudWatch | Metrics, logs, dashboards, alarms | Operates ingestion, delivery, analytics, flags, and model workflow | Log ingestion/retention, metrics, alarms |
| AWS IAM | Authorization boundaries | Separate least-privilege deployment, ingestion, analysis, flag-read, and human roles | No direct charge |
| AWS KMS | Encryption key control | Customer-managed encryption where classification or governance requires it | Key and API requests |
| AWS CloudTrail | Control-plane audit | Records changes to flags, roles, keys, storage, and experiment infrastructure | Trail delivery and data events if enabled |
| AWS Budgets | Planned-spend alerts | Warns owners as actual or forecast spend approaches the ceiling | Budget actions/notifications by pricing terms |
| AWS Cost Anomaly Detection | Unusual-spend detection | Detects changing spend patterns and sends alerts | Review current pricing; service setup itself may have no additional charge |
| Amazon SNS or Amazon SES | Alert/report delivery | SNS for operational fan-out; SES for formatted email reports when needed | Notifications or emails sent |

Amazon Data Firehose is the current service name for what was formerly **Kinesis Data Firehose**.

## Data plane

### Amazon API Gateway

The event endpoint is isolated from the product's transactional API where practical. Configure:

- Producer-appropriate authentication
- Payload-size limit below the service maximum
- Per-stage throttling and quotas
- Access logs with identifiers redacted
- Explicit CORS only for approved web origins

For a backend-only producer, direct AWS SDK delivery may be cheaper, but it changes the trust and retry model. The generated architecture must explain the choice.

### AWS Lambda collector

The collector:

1. Parses a bounded JSON body.
2. Validates the event name, version, fields, timestamp, and property allowlist.
3. Rejects or redacts prohibited data.
4. Assigns trusted server fields such as `received_at`.
5. Emits accepted/rejected metrics.
6. Sends newline-delimited records to Firehose.

It must not perform funnel analysis synchronously.

### Amazon Data Firehose

Firehose buffers records and delivers them to S3. The plan should define:

- Buffer size/interval and expected freshness
- Compression and newline delimiters
- S3 prefixes, for example `event_date=!{timestamp:yyyy-MM-dd}/event_name=.../`
- Backup or error prefix
- Delivery role and KMS permissions
- Delivery-success and freshness alarms

Firehose delivery semantics and retries mean consumers must tolerate duplicates.

### Amazon S3

S3 is the durable analytics source. Use:

- Block Public Access and bucket-owner-enforced object ownership
- TLS-only bucket policy
- Default encryption, with a customer-managed KMS key when required
- Lifecycle for raw, aggregate, result, and error data
- Separate prefixes or buckets for environments
- Versioning only where its recovery value exceeds retained-object cost

### AWS Glue Data Catalog and Amazon Athena

Glue stores table and column metadata for event data in S3. Prefer explicit table definitions or partition projection for a stable event contract; use a crawler only when its schema inference is worth the variability and cost.

Athena provides:

- Validated-event views
- Funnel queries
- Experiment exposure/outcome joins
- Data-quality checks
- Reproducible result tables

Use a dedicated workgroup with an enforced output location, encryption, query tagging, and bytes-scanned controls. Partitioning, compression, and columnar compaction are cost decisions, not cosmetic optimizations.

## Experiment control plane

### Amazon DynamoDB

DynamoDB stores experiment definitions and decisions, not raw events. Conditional writes enforce valid state transitions and prevent overlapping experiments on the same surface. Point-in-time recovery should be decided from the registry's recovery requirement.

### AWS AppConfig

AppConfig stores and deploys validated flag configuration. It can:

- Validate configuration before deployment
- Roll out changes gradually
- Serve cached configuration through the AppConfig Agent where supported
- Roll back a deployment when a configured CloudWatch alarm enters `ALARM`

GrowthForge separately defines deterministic variant assignment and statistical analysis. A flag being enabled does not prove a user was exposed; the application must emit `experiment_exposed` when the variant is actually used.

### Amazon EventBridge

An EventBridge schedule starts the analysis Lambda daily or weekly. The target must have retry and failure handling, and the workflow must publish a stale-analysis signal if a run does not complete.

## Insight and reporting

### Amazon Bedrock

Bedrock receives aggregate metrics only. Lambda constrains the model with:

- A strict input and output schema
- Metric identifiers and query version
- Token and call caps
- An allowlist of decisions
- `insufficient_evidence` behavior
- JSON validation before publication

Model availability and price vary by Region and model. The generated plan selects by capability, availability, data policy, latency, and cost instead of hard-coding a model.

### Amazon CloudWatch

CloudWatch covers:

- Structured logs with controlled retention
- Service and custom metrics
- A small operational dashboard
- Alarms for ingestion, delivery, freshness, analysis, AppConfig rollback, and Bedrock

Avoid raw user IDs or event IDs as metric dimensions.

### Amazon SNS or Amazon SES

Use SNS for alarm fan-out and simple reports. Use SES only when a formatted email requirement justifies identity/domain setup. Neither should be the only copy of an experiment decision; persist decisions in the registry or report store.

## Security and financial controls

### IAM, KMS, and CloudTrail

- IAM separates deployment, collection, delivery, analysis, flag retrieval, and human access.
- KMS controls encryption for classified data and separates key administration from use.
- CloudTrail records management activity. Enable selected data events only after evaluating audit value and cost.

### AWS Budgets and Cost Anomaly Detection

Budgets enforce the planned ceiling with actual and forecast alerts. Cost Anomaly Detection complements budgets by detecting unusual patterns.

Use a dedicated Bedrock budget or usage alarm as well. Current AWS documentation notes that some third-party or marketplace-related charges can fall outside Cost Anomaly Detection coverage depending on billing treatment.

## Official references

- [Amazon Data Firehose Developer Guide](https://docs.aws.amazon.com/firehose/latest/dev/)
- [AWS AppConfig feature-flag deployments and rollback](https://docs.aws.amazon.com/appconfig/latest/userguide/deploying-feature-flags.html)
- [Athena with the AWS Glue Data Catalog](https://docs.aws.amazon.com/athena/latest/ug/data-sources-glue.html)
- [Amazon Bedrock model invocation monitoring](https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html)
- [AWS Cost Anomaly Detection](https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html)
