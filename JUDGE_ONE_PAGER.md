# GrowthForge AWS: Judge One-Pager

## One-sentence pitch

**GrowthForge AWS is a copy-paste master prompt that turns a deployed startup MVP into an AWS-native revenue learning system: trustworthy events, a measurable funnel, reversible experiments, grounded Amazon Bedrock insights, and Kiro-ready implementation tasks.**

> Most cloud prompts help a startup go live. GrowthForge helps it decide what to improve next.

## The hidden problem

Deployment is visible; post-launch uncertainty is not. Early-stage teams often have logs but no product event contract, dashboards but no decision rule, feature flags but no exposure integrity, and AI summaries without bounded evidence. They can ship changes, yet cannot confidently answer where users drop, what to test, when to stop, or how much the learning loop will cost.

## Why this matters to AWS Startups

GrowthForge extends the value of an AWS-hosted MVP beyond infrastructure delivery. It gives small teams a proportional, serverless path from product behavior to an accountable growth decision without requiring a dedicated data platform or experimentation team.

- **More useful AWS workloads:** instrumentation, analytics, configuration, AI, and operations serve one business decision.
- **Startup-appropriate economics:** usage-based services, explicit retention, query limits, model call caps, budgets, and kill switches.
- **Safer iteration:** no direct PII by default, least-privilege roles, staged rollout, alarm-driven rollback, and durable evidence.
- **Faster implementation:** the recommendation becomes testable `requirements.md`, `design.md`, and `tasks.md`.

## What the prompt generates

1. A versioned event contract and minimal product taxonomy
2. A revenue or activation funnel with explicit denominators and windows
3. A ranked experiment backlog and one fully specified experiment
4. AWS AppConfig flags, stable assignment, actual exposure logging, rollout, and rollback
5. S3, Glue, and Athena analytics with data-quality and integrity checks
6. An aggregate-only Amazon Bedrock insight workflow with strict output validation
7. A 0-100 Revenue Learning Score with evidence and remediation
8. IAM, KMS, CloudTrail, CloudWatch, budget, anomaly, reliability, and troubleshooting plans
9. Kiro-ready requirements, design, and dependency-ordered tasks

## Why it is different

| Common prompt category | Usually ends with | GrowthForge adds |
| --- | --- | --- |
| Deployment | A running workload | A measurable post-launch decision loop |
| Cost optimization | Savings recommendations | A cost-capped learning system with ordered kill switches |
| Security | A control checklist | Controls tied to event, experiment, model, and operator boundaries |
| RAG / generative AI | A model over retrieved content | Bedrock interpreting deterministic aggregates only |
| Analytics | A dashboard | Hypotheses, exposure integrity, guardrails, stop rules, and owners |

AWS AppConfig safely distributes configuration; GrowthForge does not misrepresent it as a native statistical experimentation engine. Assignment, exposure, and analysis are specified explicitly.

## 30-second demo path

Open [`demo/index.html`](demo/index.html), then follow the numbered judge path:

1. **Score:** 87/100 shows whether the team is ready to make a decision.
2. **Funnel drop:** the largest measured loss is before checkout details submission.
3. **Experiment:** test a four-field checkout against the current seven-field flow.
4. **Bedrock insight:** the model separates evidence, uncertainty, and action instead of inventing causality.
5. **Kiro tasks:** the recommendation becomes traceable implementation work.
6. **Architecture:** serverless AWS services connect signal to decision with security and cost controls.

## AWS services used

Amazon API Gateway, AWS Lambda, Amazon Data Firehose, Amazon S3, AWS Glue Data Catalog, Amazon Athena, Amazon DynamoDB, AWS AppConfig, Amazon EventBridge, Amazon Bedrock, Amazon CloudWatch, AWS IAM, AWS KMS, AWS CloudTrail, AWS Budgets, AWS Cost Anomaly Detection, and Amazon SNS or SES.

## Revenue Learning Score

The score measures **readiness to learn**, not predicted revenue:

```text
Signal quality (25)
+ Funnel clarity (25)
+ Experiment readiness (25)
+ Decision velocity (25)
= Revenue Learning Score (100)
```

The worked example scores **87/100**: `23 + 21 + 22 + 21`. Every point requires evidence; missing evidence produces a named next action.

## Production-readiness checklist

- [x] Versioned event schemas and rejection rules
- [x] No direct PII by default; aggregate-only Bedrock input
- [x] Stable assignment and actual `experiment_exposed` semantics
- [x] Predeclared metrics, guardrails, stop rules, and owner
- [x] AppConfig validation, staged deployment, rollback alarms, and kill switch
- [x] Separate least-privilege runtime roles and KMS boundaries
- [x] CloudTrail audit and CloudWatch metrics, logs, dashboard, and alarms
- [x] AWS Budgets, Cost Anomaly Detection, Athena scan limits, and Bedrock call caps
- [x] Replay, stale-analysis, no-model fallback, and troubleshooting paths
- [x] Kiro-ready acceptance criteria, design traceability, and implementation tasks

## Why this can help thousands of developers

The prompt is product- and stack-adaptable: it starts from a startup's business goal, current MVP, traffic, Region, data classification, and budget. A developer can reuse the same contract for checkout, signup, activation, upgrade, retention, marketplace, or usage-based funnels while the prompt scales the AWS plan down or up based on evidence. It packages experimentation, analytics, security, FinOps, observability, and spec-driven delivery into one repeatable starting point.

## Review next

- [Static demo](demo/index.html)
- [Evidence pack](EVIDENCE_PACK.md)
- [Final submission copy](submission.md)
- [Worked generated output](examples/generated-output-example.md)
- [Master prompt](prompt/growthforge-master-prompt.md)
