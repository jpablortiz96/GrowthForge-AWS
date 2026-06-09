# Troubleshooting

Start with the failing boundary. Do not change event schemas, flags, queries, and alarms simultaneously.

## No events received

**Fast checks**

1. Confirm the application is calling the expected API Gateway stage and Region.
2. Check API Gateway request count, 4XX/5XX, and throttles.
3. Check Lambda invocation, error, throttle, and duration metrics.
4. Search collector logs by a test correlation ID.
5. Send one synthetic event that contains no customer data.

**Likely causes**

- Wrong endpoint, stage, route, or CORS origin
- Missing/expired authorization
- API throttling or payload limit
- Collector role cannot call Firehose
- Event rejected by schema/version validation

**Remediation**

Fix the first failing hop. Do not weaken validation globally; add a versioned schema change with tests when the product legitimately needs a new field.

## Funnel query returns empty

**Fast checks**

- Query the validated-event view for the date range and exact event names.
- Confirm S3 partitions and Glue column types.
- Compare event timezone with query boundaries.
- Check identity, session, and conversion-window fields for nulls.

**Likely causes**

- Query points to the wrong environment or database
- Event names differ from the contract
- Partitions are not visible or projection is misconfigured
- Timestamp strings cannot be parsed
- Inner joins remove users missing an intermediate step
- Baseline window predates instrumentation

**Remediation**

Run counts by `event_name` first, then add funnel steps one at a time. Use a hand-calculated synthetic fixture to verify denominator and deduplication logic.

## AppConfig variant not changing

**Fast checks**

- Verify application, environment, profile, and deployed version.
- Check whether the flag is enabled and allocation permits treatment.
- Inspect AppConfig Agent/cache refresh behavior.
- Recalculate assignment with the same opaque key, experiment salt, and allocation.
- Confirm the test user has not been intentionally assigned stably to control.

**Likely causes**

- Configuration was saved but not deployed
- Application reads another environment/profile
- Last-known-good cache has not refreshed
- Stable assignment correctly keeps the same variant
- Allocation is zero or rollout has not reached the entity
- An alarm rolled the deployment back

**Remediation**

Use a known synthetic assignment key or a controlled internal allowlist. Never randomize on every request to make the UI appear to change; that breaks experiment integrity.

## Bedrock costs rising

**Fast checks**

- Review invocation count, input/output token metrics, model ID, and caller role.
- Compare EventBridge schedule with completed analysis IDs.
- Check retry counts and malformed-output repair calls.
- Review budget and Cost Explorer by service and billing entity.

**Likely causes**

- Duplicate schedules or retries
- Raw rows or oversized histories in prompts
- Higher-cost model selected
- Unbounded output tokens
- Manual/ad hoc invocations outside the scheduled role

**Remediation**

Activate the Bedrock kill switch, publish deterministic metrics only, then cap calls/tokens, deduplicate analysis IDs, reduce context, and scope `bedrock:InvokeModel` to approved resources. Keep a dedicated budget because anomaly detection coverage can vary for marketplace-related model charges.

## Athena query permissions issue

**Common symptoms**

- `AccessDenied` for S3 source or result bucket
- KMS decrypt/encrypt denial
- Glue catalog access denied
- Workgroup disabled or result location rejected

**Checks**

- Confirm the principal can use the named workgroup.
- Verify `glue:GetDatabase`, `GetTable`, and required partition actions.
- Verify S3 list/read on source prefixes and write on the result prefix.
- Verify KMS key policy and grants for both data and results.
- Confirm bucket policies do not deny the role through source conditions.

**Remediation**

Update the narrow role or resource policy. Do not grant broad S3 or KMS access as a shortcut. Retest with the scheduled analyzer role, not an administrator identity.

## CloudWatch alarm noise

**Likely causes**

- Threshold ignores normal low-volume variance
- Missing-data behavior is wrong
- Alarm watches a raw count instead of an error rate
- Short evaluation period reacts to single cold starts
- Multiple alarms notify for the same root failure

**Remediation**

- Use rates and minimum-volume conditions.
- Set missing data according to the signal: stale analysis should breach; zero errors should not.
- Use multiple evaluation periods for noncritical signals.
- Route symptoms to a composite alarm where useful.
- Preserve immediate alarms for data loss, security, and runaway cost.
- Record every threshold change with an owner and reason.

## Incorrect event taxonomy

**Symptoms**

- Similar actions use multiple names
- A renamed event breaks historical trends
- Properties contain inconsistent types
- Funnel order is impossible
- Product teams emit implementation details instead of business actions

**Remediation**

1. Freeze new unreviewed event names.
2. Measure usage by name and version.
3. Define the canonical business event and schema.
4. Add a new version or compatibility view; do not rewrite raw history silently.
5. Update producers, contract tests, Glue schema, Athena views, and documentation together.
6. Set a deprecation date and dashboard for legacy producers.

## Firehose data not arriving in S3

Check Firehose incoming records, delivery success, data freshness, error logs, delivery-role permissions, KMS access, S3 bucket policy, buffering interval, and error prefix. Remember that low volume can legitimately wait for the configured buffer interval.

## Duplicate conversions

Check producer retries, repeated `event_id`, Firehose delivery behavior, purchase identifier reuse, and query joins. Deduplicate the qualifying conversion by the declared entity and transaction key before joining to exposure.

## Exposure imbalance or sample ratio mismatch

Stop or pause interpretation when observed allocation materially differs from configured allocation. Verify assignment-key stability, eligibility filters, cache versions, exposure timing, bot/internal traffic, and dropped variants. Do not let Bedrock explain an effect until integrity passes.

## Bedrock insight contradicts metrics

Treat the deterministic result as authoritative. Validate that the model received the correct analysis ID and query version, reject unsupported metric citations, and publish the fallback report. Tighten the schema and instruction rather than editing the numbers in prose.

## Scheduled analysis is stale

Check EventBridge target invocation, Lambda errors/timeouts, Athena query state, concurrency, result location, Bedrock timeout, and report-write permissions. Alarm on age of the last successful analysis, not only on individual function errors.

## Escalation packet

When escalation is required, include:

- Environment, Region, and UTC time range
- Correlation or analysis ID, never customer PII
- First failing service boundary
- Relevant metric and alarm state
- Flag and query version
- Expected versus actual result
- Changes made and rollback state
- Current cost impact

This keeps diagnosis reproducible without exporting raw customer data.
