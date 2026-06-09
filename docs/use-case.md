# Use Case

## The post-launch gap

Early-stage teams can deploy a credible MVP quickly, yet still lack the operating system required to improve it. Application logs show that requests happened. Revenue reports show that money moved. Neither reliably explains where users failed, which product change caused an outcome, or what the team should test next.

GrowthForge AWS addresses this post-launch gap. It is a reusable prompt for designing the smallest AWS-native loop that turns product behavior into a controlled decision:

```text
instrument -> baseline -> hypothesize -> expose -> measure -> interpret -> decide -> implement
```

## Target users

### Early-stage startups

Teams that have product-market evidence to seek, limited platform capacity, and a hard monthly budget. They need an architecture that can begin small without becoming a throwaway prototype.

### Indie hackers

Solo builders who cannot maintain a warehouse, experimentation platform, and AI pipeline. GrowthForge converts product context into a staged, serverless plan with explicit stopping points.

### SaaS founders

Founders improving signup, trial activation, checkout, upgrade, or retention. The prompt forces each idea into a falsifiable hypothesis, primary metric, guardrails, and decision rule.

### Developer teams

Engineers who already operate an AWS workload but need a shared event contract, controlled feature flags, queryable product evidence, and tasks that fit their repository.

### Deployed MVP teams that do not know what to improve

The primary use case is a team that can ship changes but cannot rank them with evidence. GrowthForge identifies the largest measurable constraint and recommends one reversible experiment rather than generating an unbounded feature backlog.

## Example decision

Eduky Cloud Academy sees many learners start checkout but fewer submit their details. The team suspects its seven-field form creates avoidable friction.

GrowthForge defines:

- A versioned event path from `checkout_started` to `activation_completed`
- A baseline segmented by device without collecting direct PII
- A 50/50 experiment between seven-field and four-field checkout
- Stable assignment and an `experiment_exposed` event
- Purchase conversion as the primary metric
- Payment errors, refund rate, and latency as guardrails
- A gradual AWS AppConfig rollout with rollback alarms
- Athena queries for effect and sample-ratio checks
- A bounded Bedrock insight that cites computed metrics
- Kiro tasks for implementation and validation

The output is not "make checkout better." It is a testable decision system.

## Jobs to be done

| When | The team needs to | So it can |
| --- | --- | --- |
| An MVP has launched | Define a minimal event taxonomy | Establish a trustworthy baseline |
| A funnel leaks | Rank evidence-backed hypotheses | Test the highest-value constraint |
| A variant is ready | Release it without a full redeploy | Ramp or reverse safely |
| Metrics arrive | Separate effect from noise | Make an explicit decision |
| AI is introduced | Ground it in aggregates | Avoid persuasive but unsupported narratives |
| Spend grows | Identify the cost driver | Preserve the learning loop within budget |
| A decision is made | Generate implementation tasks | Move from insight to shipped change |

## In scope

- Product event contract and ingestion design
- Revenue and activation funnel definitions
- Experiment backlog and one recommended experiment
- AWS AppConfig flag, assignment, exposure, ramp, and rollback plan
- S3/Glue/Athena analytics
- Experiment state in DynamoDB
- EventBridge-scheduled analysis
- Amazon Bedrock interpretation of aggregates
- Revenue Learning Score
- Security, privacy, reliability, observability, and cost controls
- Kiro-ready specification artifacts

## Out of scope

- A turnkey multi-tenant analytics SaaS
- A general customer data platform
- Real-time personalization
- A guarantee of statistical significance or revenue lift
- Collection of arbitrary behavioral data
- Automated product decisions without an accountable owner
- Replacement for legal, privacy, finance, or security review

## Success criteria

GrowthForge has succeeded when the team can answer all of the following:

1. What exact user behavior represents progress toward revenue or value?
2. Is the underlying event data valid, fresh, and sufficiently complete?
3. What is the largest measurable funnel constraint?
4. What single change will test a falsifiable explanation for that constraint?
5. How will eligible users receive a stable variant?
6. What result causes ramp, ship, stop, or rollback?
7. What is the monthly cost and which switch reduces it first?
8. Who owns the next decision, and when will it be made?
