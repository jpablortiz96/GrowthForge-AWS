# GrowthForge AWS Evidence Pack

This file maps submission claims to repository evidence. Checkboxes indicate that the artifact exists in this version; they do not claim that a live AWS environment has been deployed.

## Prompt package completeness

- [x] Copy-paste master prompt with role, mission, inputs, and bounded clarifying questions - [`prompt/growthforge-master-prompt.md`](prompt/growthforge-master-prompt.md)
- [x] Exact 24-section output contract - [master prompt](prompt/growthforge-master-prompt.md#output-contract)
- [x] Architecture, event, funnel, experiment, AppConfig, Bedrock, security, cost, reliability, and validation requirements - [master prompt](prompt/growthforge-master-prompt.md)
- [x] Final quality gate for internal consistency - [master prompt](prompt/growthforge-master-prompt.md#final-quality-gate)
- [x] Prerequisites and user-input guidance - [`docs/prerequisites.md`](docs/prerequisites.md)
- [x] Complete fictional startup input - [`examples/startup-input-example.md`](examples/startup-input-example.md)
- [x] Abbreviated but internally consistent generated output - [`examples/generated-output-example.md`](examples/generated-output-example.md)
- [x] Kiro-ready requirements, design, and tasks example - [`examples/kiro-tasks-example.md`](examples/kiro-tasks-example.md)

## AWS Well-Architected coverage

- [x] Operational Excellence - versioned contracts, staged delivery, runbooks, owners, and decision records
- [x] Security - opaque IDs, validation, IAM separation, encryption, audit, and bounded model input
- [x] Reliability - idempotency, durable S3 source, replay, graceful degradation, and rollback
- [x] Performance Efficiency - serverless scaling, batch analysis, partitioning, and measured optimization triggers
- [x] Cost Optimization - usage-based components, scan limits, retention, budgets, anomaly alerts, and AI ceilings
- [x] Sustainability - minimal taxonomy, demand-aligned compute, lifecycle, and avoided unnecessary processing
- [x] Concrete evidence and remaining risks mapped per pillar - [`docs/well-architected-mapping.md`](docs/well-architected-mapping.md)

## Security controls

- [x] No direct PII by default; opaque identifiers and property allowlists
- [x] Server-authoritative revenue events instead of client-asserted outcomes
- [x] Unknown event names and versions fail closed
- [x] API authentication strategy, throttling, quotas, and bounded payloads
- [x] S3 Block Public Access, TLS-only policy, encryption, and lifecycle
- [x] Separate collector, Firehose, analyzer, insight, flag-reader, CI/CD, and human roles
- [x] KMS key-user and key-administrator separation
- [x] CloudTrail management audit and controlled log retention
- [x] Aggregate-only Bedrock inputs and strict JSON output validation
- [x] Threat model includes spoofing, replay, PII leakage, prompt injection, flag tampering, and cost denial of service
- [x] Detailed evidence - [`docs/security-cost-controls.md`](docs/security-cost-controls.md)

## Cost controls

- [x] User-supplied monthly ceiling; default early-stage example is $150/month
- [x] Service-by-service usage assumptions and ranges required
- [x] Pricing inputs must be dated; estimates cannot be presented as exact bills
- [x] AWS Budget alerts at 50%, 80%, and 100%, plus forecast review
- [x] AWS Cost Anomaly Detection monitor and owned notification path
- [x] Dedicated Bedrock budget or usage monitoring
- [x] Default one insight run per day and at most two model calls per run
- [x] Explicit model token caps and independent Bedrock pause switch
- [x] Athena workgroup, partition predicates, and bytes-scanned limits
- [x] Ordered kill switch preserves primary revenue and exposure events

## Observability

- [x] API Gateway request, 4XX/5XX, and throttle signals
- [x] Lambda errors, duration, throttles, and analysis success age
- [x] Accepted, rejected, duplicate, and prohibited-event metrics
- [x] Firehose delivery success, freshness, and error-prefix monitoring
- [x] Athena query failures and bytes scanned
- [x] DynamoDB throttles and conditional-write failures
- [x] AppConfig deployment state and rollback alarms
- [x] Bedrock invocation, latency, errors, and token-use monitoring
- [x] SNS/SES delivery failure and stale-report detection
- [x] Low-cardinality metric guidance and structured logging rules

## Demo evidence

- [x] One-file offline demo - [`demo/index.html`](demo/index.html)
- [x] No npm, build step, external fonts, scripts, images, or official AWS logos
- [x] Numbered judge path links to the five primary proof points
- [x] 87/100 Revenue Learning Score and four visible components
- [x] Checkout funnel with the largest drop called out
- [x] Four-field versus seven-field experiment with guardrails
- [x] Bedrock insight separates observation from recommended action
- [x] Kiro task preview shows traceability from evidence to implementation
- [x] AWS service footprint and cost-estimate disclaimer
- [x] Responsive desktop and mobile layout

## Visual evidence

- [x] README hero asset exists - [`assets/readme/hero.svg`](assets/readme/hero.svg)
- [x] Architecture diagram exists - [`assets/readme/architecture-diagram.svg`](assets/readme/architecture-diagram.svg)
- [x] Desktop demo screenshot exists - [`assets/readme/demo-screenshot.png`](assets/readme/demo-screenshot.png)
- [x] Mobile demo screenshot exists - [`assets/readme/demo-screenshot-mobile.png`](assets/readme/demo-screenshot-mobile.png)
- [x] Revenue Learning Score visual exists - [`assets/readme/revenue-learning-score.svg`](assets/readme/revenue-learning-score.svg)
- [x] Judge path visual exists - [`assets/readme/judge-path.svg`](assets/readme/judge-path.svg)

## Static publishing evidence

- [x] GitHub Pages deployment workflow exists - [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
- [x] Root landing page exists - [`index.html`](index.html)
- [x] Demo can be served as a dependency-free static site - [`demo/index.html`](demo/index.html)

## Example output evidence

- [x] Architecture summary
- [x] Versioned event taxonomy
- [x] Five-stage funnel with counts and explicit step conversion
- [x] Ranked experiment backlog with explained ICE score
- [x] Complete recommended experiment and predeclared decisions
- [x] AWS AppConfig flag document and responsibility boundary
- [x] Revenue Learning Score arithmetic equals 87/100
- [x] Strict JSON Bedrock insight with metric IDs and uncertainty
- [x] AWS service, security, and illustrative cost plan
- [x] Evidence location - [`examples/generated-output-example.md`](examples/generated-output-example.md)

## Reusability

- [x] Inputs support subscription, transaction, marketplace, and other business models
- [x] Unknown baseline and traffic values trigger explicit assumptions rather than invented facts
- [x] Event taxonomy adapts to the product while preserving a stable naming convention
- [x] Cost ceiling, Region, retention, compliance, cadence, and IaC tooling are configurable
- [x] Prompt removes or defers AWS services when volume does not justify them
- [x] Experiment output supports low-traffic inconclusive outcomes
- [x] Kiro artifacts use traceable requirement and task IDs
- [x] Contribution guidance prohibits confidential data and real customer PII - [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Judge review checklist

- [ ] Read the one-sentence pitch and hidden problem - [`JUDGE_ONE_PAGER.md`](JUDGE_ONE_PAGER.md)
- [ ] Open the demo and follow Score -> Funnel -> Experiment -> Bedrock -> Kiro - [`demo/index.html`](demo/index.html)
- [ ] Confirm the prompt has a strict output contract and final quality gate - [`prompt/growthforge-master-prompt.md`](prompt/growthforge-master-prompt.md)
- [ ] Verify AppConfig is used for safe configuration, not misrepresented as the statistical engine
- [ ] Verify Bedrock receives aggregates only and has call/token ceilings
- [ ] Check the 87/100 score arithmetic across README, example, and demo
- [ ] Review the Kiro artifacts for testable acceptance criteria and dependency order
- [ ] Review security, cost, rollback, and troubleshooting evidence
- [ ] Read the final three-sentence pitch - [`submission.md`](submission.md#final-three-sentence-pitch)

## Automated repository evidence

The dependency-free workflow at [`.github/workflows/validate.yml`](.github/workflows/validate.yml) checks required structure, non-empty files, key submission phrases, offline demo constraints, and score consistency on every push and pull request.
