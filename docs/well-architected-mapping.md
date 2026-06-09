# AWS Well-Architected Mapping

GrowthForge maps concrete design evidence to the six pillars of the [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html). This is a design review aid, not a claim that every generated workload has completed a formal Well-Architected review.

## Operational Excellence

| Practice | GrowthForge evidence | Remaining risk |
| --- | --- | --- |
| Operations as code | Generated IaC resource plan and Kiro tasks | Deployment permissions and repository conventions require review |
| Observable outcomes | CloudWatch dashboard, structured logs, data-freshness and analysis-age alarms | Product metric ownership may remain unclear |
| Small reversible changes | AppConfig staged rollout and explicit experiment state transitions | A treatment can still have downstream business effects |
| Runbook-driven response | Troubleshooting, rollback, replay, and cost kill-switch procedures | Runbooks must be exercised |
| Continuous learning | Decision record and Revenue Learning Score | Score thresholds need calibration against the product |

**Review question:** Can an on-call engineer identify whether ingestion, delivery, analysis, flag deployment, or reporting failed without reading raw customer data?

## Security

| Practice | GrowthForge evidence | Remaining risk |
| --- | --- | --- |
| Strong identity foundation | Separate deployment and runtime roles; no root usage | Human access lifecycle is organization-specific |
| Traceability | CloudTrail for management actions and durable experiment decisions | Data-event logging can add material cost |
| Defense in depth | API throttling, schema validation, allowlists, S3 public-access block | Public producers may require additional abuse controls |
| Data protection | TLS, S3/DynamoDB/log encryption, KMS where required | Key policy errors can create either lockout or excess access |
| Data minimization | Opaque IDs, no direct PII, aggregate-only Bedrock input | Indirect identifiers and small cohorts can still re-identify |
| Secure AI boundary | Structured evidence, output validation, no raw event text | Model invocation logs may retain prompts if enabled |

**Review question:** Can every principal's access be explained by one runtime responsibility and scoped to named resources?

## Reliability

| Practice | GrowthForge evidence | Remaining risk |
| --- | --- | --- |
| Idempotent processing | `event_id`, duplicate policy, conditional registry writes | Producer retries can still create semantic duplicates |
| Durable recovery source | S3 event lake and Firehose error prefix | Bad source instrumentation cannot be reconstructed |
| Failure isolation | Bedrock and scheduled analysis can stop while ingestion continues | Reports become stale during extended analysis failure |
| Automated recovery | Service retries and AppConfig rollback alarms | Alarm thresholds require baseline tuning |
| Controlled rollout | Internal, canary, ramp, and full stages | Low traffic slows detection of regressions |
| Tested rollback | Global treatment kill switch and last-known-good flag | Client cache duration affects rollback time |

Analytics is not on the transactional purchase path. Its recovery targets should be realistic, for example an RPO bounded by accepted Firehose records and an RTO measured in hours rather than seconds.

**Review question:** If analysis and Bedrock are unavailable for 24 hours, can the product transact and preserve events for later replay?

## Performance Efficiency

| Practice | GrowthForge evidence | Remaining risk |
| --- | --- | --- |
| Serverless scaling | API Gateway, Lambda, Firehose, Athena, DynamoDB | Bursty producers can hit configured throttles |
| Right technology | S3/Athena for early analytical volume instead of an always-on warehouse | Athena latency is not suitable for real-time personalization |
| Efficient data layout | Date/event partitions, compression, optional Parquet compaction | Over-partitioning creates small-file overhead |
| Bounded model use | Aggregate payloads and scheduled invocation | Large experiment histories can expand context |
| Measured optimization | Compaction or service upgrades triggered by observed cost/latency | Premature thresholds may need revision |

**Review question:** Is each optimization tied to a measured latency, throughput, or scan-cost threshold?

## Cost Optimization

| Practice | GrowthForge evidence | Remaining risk |
| --- | --- | --- |
| Consumption model | Usage-based serverless components | Logs and scans can grow silently |
| Unit economics | Per-service usage assumptions and ranges | AWS pricing and model availability change |
| Spend visibility | Tags, Budgets at 50/80/100%, anomaly monitor | Alert ownership can fail without testing |
| Query controls | Athena workgroup limits and partition filters | Ad hoc human queries may bypass intended patterns |
| AI controls | Daily cadence, call/token caps, independent pause | Marketplace billing treatment may affect anomaly coverage |
| Lifecycle management | Raw and aggregate retention policies | Legal retention can override savings |

**Review question:** Which exact switch is used first when forecast spend exceeds the monthly ceiling?

## Sustainability

| Practice | GrowthForge evidence | Remaining risk |
| --- | --- | --- |
| Align supply with demand | Serverless compute and scheduled rather than continuous analysis | Minimum managed-service overhead still exists |
| Reduce unnecessary processing | Minimal event taxonomy and aggregate-only model calls | Teams may add events without decision value |
| Data lifecycle | Expire raw/error/query-result data when no longer useful | Long retention may persist by habit |
| Efficient data access | Partitioning, compression, and optional columnar format | Repeated poorly filtered queries increase work |
| Avoid unused resources | Removal triggers in the service inventory | Ownership is needed to act on triggers |
| Region choice | Availability, customer needs, and sustainability considered together | Business and residency constraints can dominate |

**Review question:** Is the system collecting, retaining, querying, or sending to a model any data that does not support a named decision?

## Review cadence

Run a lightweight review:

- Before the first production baseline
- Before starting each experiment
- After a rollback or cost alarm
- When event volume grows by 10x
- When regulated data or a new Region is introduced
- At least quarterly while the system is active

Record pillar gaps in the experiment registry or engineering backlog with an owner and review date.
