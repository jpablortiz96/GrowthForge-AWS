# GrowthForge AWS Demo Script

- **Target length:** 35-42 seconds
- **Format:** screen recording with voiceover, no setup or terminal footage
- **Starting screen:** [`demo/index.html`](demo/index.html) at the top of the page

## First five seconds: hook

**On screen**

- Show the GrowthForge hero and the "Most prompts stop at deployment" value.
- Move immediately to the Judge path and select **1. Score**.

**Voiceover**

> "Most AWS prompts help a startup deploy. GrowthForge helps it decide what to improve next."

## Timed voiceover and actions

| Time | On-screen action | Voiceover |
| --- | --- | --- |
| 0-5s | Hero, then click **1. Score** | "Most AWS prompts help a startup deploy. GrowthForge helps it decide what to improve next." |
| 5-10s | Hold on **Revenue Learning Score: 87/100** and its four components | "It starts with a Revenue Learning Score: 87 out of 100 means this team is decision-ready, with the remaining evidence gaps named." |
| 10-16s | Click **2. Funnel drop**; point to the loss before details submission | "The funnel exposes the largest measurable constraint: forty percent of checkout starts never submit details." |
| 16-23s | Click **3. Experiment**; show control, treatment, and guardrails | "GrowthForge converts that signal into a reversible test: four checkout fields versus seven, with payment, refund, latency, duplicate-order, and activation guardrails." |
| 23-29s | Click **4. Bedrock insight**; hold on observation and recommended action | "Amazon Bedrock receives aggregates only, separates evidence from uncertainty, and refuses to invent causality." |
| 29-35s | Click **5. Kiro tasks**; show task IDs and states | "The recommendation becomes traceable, Kiro-ready requirements, design, and implementation tasks." |
| 35-42s | Scroll to the AWS service footprint, then cut to the architecture diagram in [`architecture/architecture.md`](architecture/architecture.md) | "All of it runs as a cost-capped, observable AWS decision loop with validated events, safe flags, rollback, and a durable analytics path." |

## Suggested recording sequence

1. Use a 1440x900 or 1280x800 browser window.
2. Hide bookmarks, unrelated tabs, notifications, and the mouse halo.
3. Load the demo before recording; do not show a local file picker.
4. Record one continuous pass through the numbered Judge path.
5. At the service footprint, switch to a pre-opened rendered view of `architecture/architecture.md`.
6. Keep every hold under six seconds; the score and funnel need the longest holds.
7. Add captions for `87/100`, `40% drop`, `4 vs 7 fields`, `aggregates only`, and `Kiro-ready`.
8. Use cuts only if needed to keep the final runtime below 45 seconds.

## Exact ending CTA

End on the architecture or repository hero with this voiceover and on-screen text:

> **"Copy the GrowthForge master prompt, describe your MVP, and turn your next AWS deployment into your next measurable growth decision."**

## Recording guardrails

- Do not claim that the example is a live customer deployment.
- Keep cost figures labeled as illustrative estimates, not exact pricing.
- Do not show customer data, credentials, account IDs, or AWS console sessions.
- Do not use official AWS logos or copyrighted brand assets.
- Say "AWS AppConfig feature flags" or "safe flag rollout," not "native AppConfig statistical experiments."
