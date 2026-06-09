# GrowthForge AWS - Final Challenge Submission

## Title

**GrowthForge AWS: Agentic Revenue Experimentation Stack for Startups**

## Tagline

**Most prompts help startups deploy. GrowthForge helps them decide what to improve next.**

## Complete prompt summary

GrowthForge AWS is a reusable, copy-paste prompt for Kiro or another agentic coding assistant. Given a startup's product, funnel, traffic, stack, AWS Region, data constraints, and monthly ceiling, it generates a production-minded revenue experimentation specification:

- A minimal versioned product-event contract
- A measurable revenue and activation funnel
- A ranked backlog and one fully specified experiment
- AWS AppConfig feature flags with stable assignment, actual exposure logging, staged rollout, rollback, and a kill switch
- S3, Glue, and Athena analytics with data-quality and experiment-integrity checks
- A DynamoDB experiment registry
- A bounded Amazon Bedrock insight workflow grounded in computed aggregates
- A 0-100 Revenue Learning Score
- Security, reliability, observability, and cost controls
- Kiro-ready `requirements.md`, `design.md`, and `tasks.md`

The prompt has a strict 24-section output contract and a final quality gate. It tells the assistant not to invent baselines, force a winner at low traffic, send raw customer events to a model, or misrepresent AppConfig as a native statistical experimentation engine.

## Complete prompt location

[`prompt/growthforge-master-prompt.md`](prompt/growthforge-master-prompt.md)

Supporting review paths:

- [30-second static demo](demo/index.html)
- [Judge one-pager](JUDGE_ONE_PAGER.md)
- [Evidence pack](EVIDENCE_PACK.md)
- [Worked generated output](examples/generated-output-example.md)

## Prerequisites

- AWS account, selected Region, and controlled deployment permissions
- Existing or planned MVP with a server or client capable of emitting approved events
- One primary revenue or activation outcome
- Current funnel and event knowledge, including explicit unknowns
- Opaque identity strategy for anonymous and authenticated journeys
- Traffic and baseline estimates, or a baseline collection plan
- Data classification, privacy, residency, and compliance constraints
- Monthly budget ceiling and alert owners
- Optional Kiro IDE or another coding agent

No customer PII, credentials, production logs, or confidential data should be pasted into the prompt.

## Use case

The target user is an early-stage startup, indie hacker, SaaS founder, or developer team that has deployed an MVP but cannot confidently answer:

- Where does the path to value break?
- Which hypothesis deserves the next sprint?
- What evidence will trigger ramp, ship, stop, or rollback?
- Can the learning loop fit the startup's AWS budget?

The repository's fictional example, Eduky Cloud Academy, has a measurable loss before checkout details submission. GrowthForge does not assume the cause. It first specifies the missing instrumentation, then recommends a reversible test of a four-field checkout against the current seven-field form.

## Expected outcome

The user receives a reviewable implementation specification before any infrastructure is deployed:

```text
business goal
  -> event contract
  -> funnel evidence
  -> experiment hypothesis
  -> safe feature flag
  -> aggregate analysis
  -> grounded insight
  -> accountable decision
  -> Kiro-ready tasks
```

The worked example shows a five-step funnel, experiment eligibility and exposure rules, primary and guardrail metrics, a staged rollout, rollback criteria, an 87/100 Revenue Learning Score, an aggregate-grounded Bedrock insight, and dependency-ordered implementation tasks.

## AWS services

| Service | Purpose |
| --- | --- |
| Amazon API Gateway | Controlled product-event endpoint |
| AWS Lambda | Event validation, enrichment, scheduled analysis, and model orchestration |
| Amazon Data Firehose | Buffered, managed delivery to S3 |
| Amazon S3 | Durable event lake, query results, and reports |
| AWS Glue Data Catalog | Controlled event metadata |
| Amazon Athena | Funnel, quality, experiment, and guardrail SQL |
| Amazon DynamoDB | Experiment state and decision registry |
| AWS AppConfig | Validated flags, staged configuration rollout, and alarm-driven rollback |
| Amazon EventBridge | Daily or weekly analysis schedule |
| Amazon Bedrock | Structured interpretation of computed aggregates |
| Amazon CloudWatch | Metrics, logs, dashboards, alarms, and rollback signals |
| AWS IAM and AWS KMS | Least-privilege authorization and encryption controls |
| AWS CloudTrail | Management-action audit |
| AWS Budgets and Cost Anomaly Detection | Planned and unusual-spend alerts |
| Amazon SNS or SES | Operational alerts and report delivery |

The design deliberately avoids an always-on warehouse, cluster, or real-time consumer unless measured volume or latency requirements justify it.

## Well-Architected alignment

- **Operational Excellence:** versioned contracts, IaC-ready resource definitions, staged rollout, runbooks, owners, and decision records
- **Security:** opaque IDs, fail-closed schemas, separate runtime roles, encryption, CloudTrail, and aggregate-only Bedrock input
- **Reliability:** idempotency, durable S3 source, conditional registry transitions, replay, no-model fallback, and AppConfig rollback
- **Performance Efficiency:** serverless scaling, batch analysis, partitioned data, caching, and measured optimization triggers
- **Cost Optimization:** consumption pricing, retention, Athena scan limits, budgets, anomaly alerts, and Bedrock call/token ceilings
- **Sustainability:** minimal event collection, demand-aligned compute, lifecycle policies, and avoided unnecessary processing

The full evidence-and-risk mapping is in [`docs/well-architected-mapping.md`](docs/well-architected-mapping.md).

## Security

- No direct PII by default; use opaque identifiers and approved property allowlists
- Server-authoritative revenue outcomes rather than client claims
- Known event names and versions only, with bounded payloads and timestamp rules
- API authentication appropriate to the producer, plus throttling and quotas
- S3 Block Public Access, TLS-only policy, encryption, and retention
- Separate collector, delivery, analyzer, insight, flag-reader, CI/CD, and human roles
- KMS administrator/user separation and CloudTrail management audit
- Aggregate-only Bedrock input, no user-controlled free text, and strict output validation

The prompt does not claim compliance certification. It identifies decisions that still require product, legal, privacy, or security approval.

## Cost optimization

- Configurable monthly cost ceiling; the example uses under $150/month
- Service-by-service estimates with Region, volume, retention, scan, model, and token assumptions
- AWS Budget notifications at 50%, 80%, and 100%, plus forecast review
- Cost Anomaly Detection and a dedicated Bedrock budget or usage signal
- One scheduled insight run and at most two model calls per day by default
- Explicit input/output token caps and a deterministic no-model report
- Athena workgroup and bytes-scanned controls
- S3 compression, partitioning, and lifecycle
- Ordered kill switches: pause Bedrock, reduce analysis, stop optional scans/events, preserve primary revenue/exposure evidence

All figures remain dated estimates, not billing guarantees.

## Operational excellence

GrowthForge turns operational requirements into named evidence:

- Structured logs and low-cardinality metrics
- Ingestion, delivery, freshness, query, flag, model, report, and cost alarms
- Dev, staging, shadow, baseline, internal, 5%, 25%, and target deployment stages
- Exit criteria and rollback actions for every stage
- Durable experiment state, result IDs, query versions, owners, and decision dates
- Synthetic fixtures and validation before production treatment exposure
- Kiro tasks small enough for focused implementation and code review

## Troubleshooting

The output contract requires a runbook for no events, rejected events, Firehose delivery failure, empty or duplicate funnel results, AppConfig variants not changing, exposure imbalance, sample-ratio mismatch, rising Bedrock cost, unsupported model insights, Athena/KMS permissions, alarm noise, taxonomy drift, and stale scheduled analysis.

Every issue includes a symptom, fast check, likely causes, diagnostic action, remediation, and prevention. The complete reference is in [`docs/troubleshooting.md`](docs/troubleshooting.md).

## Why this prompt matters

Deployment is no longer the final technical question for a startup. The harder post-launch question is how to connect product behavior, evidence, a reversible change, and a revenue decision without buying or building an oversized analytics platform.

GrowthForge makes that operating loop explicit. The team knows what to instrument, what to test, which evidence counts, what can trigger rollback, how much the loop may cost, who owns the decision, and what engineering task comes next.

## Why it is reusable

- Business model, product stack, funnel, Region, retention, analysis cadence, compliance context, budget, and IaC tooling are inputs.
- Unknown values are labeled and turned into baseline actions instead of fabricated facts.
- The minimal event taxonomy adapts to checkout, signup, activation, upgrade, retention, marketplace, or usage-based products.
- The service plan can remove components at low scale and add measured optimizations when evidence justifies them.
- The output remains tool-portable while providing native Kiro-ready artifacts.

## Why it is production-ready

Production-ready here means the prompt produces the controls and acceptance criteria required for responsible implementation, not that this repository silently deploys a live system. It covers data contracts, least privilege, encryption, audit, identity, exposure integrity, statistical uncertainty, staged delivery, rollback, replay, graceful degradation, observability, cost ceilings, troubleshooting, and pre-production validation.

The repository also provides a worked input, generated output, Kiro specification, architecture, offline demo, evidence pack, contribution rules, MIT license, and dependency-free GitHub validation.

## Final three-sentence pitch

GrowthForge AWS turns a deployed MVP into a measurable revenue learning loop using serverless AWS analytics, safe AppConfig flags, aggregate-grounded Amazon Bedrock insights, and Kiro-ready implementation tasks. It is different from a generic deployment prompt because it ends with an accountable product decision, complete with evidence quality, experiment integrity, rollback, security, observability, and a cost ceiling. Copy the prompt, describe the MVP, and turn the next AWS deployment into the next measurable growth decision.
