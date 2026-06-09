# Contributing to GrowthForge AWS

GrowthForge is a prompt product. Contributions should make its output more accurate, reusable, testable, or easier to review without turning the repository into a full application.

## Improve the master prompt

1. Open [`prompt/growthforge-master-prompt.md`](prompt/growthforge-master-prompt.md).
2. Keep the 24-section output contract and final quality gate internally consistent.
3. Tie new instructions to a measurable artifact, control, threshold, owner, or validation step.
4. Update the worked examples and evidence pack when behavior changes.
5. Preserve the distinction between AWS AppConfig configuration delivery and application-owned assignment/statistical analysis.

## Add an example

- Use a fictional company and clearly label illustrative metrics.
- Include the business model, funnel, traffic assumptions, budget, Region, and data classification.
- Use opaque identifiers and no direct PII.
- Show an inconclusive path as well as win/rollback criteria.
- Keep event names, score arithmetic, flags, metrics, and tasks consistent across the example.

## Validate changes

- Open [`demo/index.html`](demo/index.html) on desktop and mobile widths.
- Check all local Markdown links.
- Confirm code fences and Mermaid blocks are balanced.
- Run the same dependency-free checks defined in [`.github/workflows/validate.yml`](.github/workflows/validate.yml).
- Verify the key terms remain accurate: GrowthForge AWS, Revenue Learning Score, Amazon Bedrock, AWS AppConfig, Kiro-ready, and Well-Architected.

## Style principles

- Write for a technical startup founder and an AWS reviewer.
- Prefer specific contracts, thresholds, and decisions over generic best-practice language.
- Separate inputs, facts, assumptions, estimates, and recommendations.
- Do not claim statistical significance without method and evidence.
- Do not present cost estimates as exact bills.
- Keep the architecture proportional to the stated traffic and budget.
- Use ASCII text and repository-relative links.

## Data safety

Do not add confidential information, credentials, account identifiers, production logs, real customer data, or real customer PII. Redact screenshots and use synthetic fixtures only.
