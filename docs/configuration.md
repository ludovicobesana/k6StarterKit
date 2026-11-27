# Configuration (FR-008)

Pass environment variables to loadConfiguration during k6 init, before any network traffic. The parser is pure and portable; it does not read Node process.env or rely on the browser URL API. Entrypoints will supply __ENV in #1.

Explicit environment values override defaults. Empty values are invalid. .env.example is a reference, not automatically loaded by k6. Use k6 -e for nonsecret overrides or your shell/CI secret manager for credentials. Do not use k6 -e for secrets.

| Variable | Default | Allowed |
|---|---|---|
| TEST_ENV | local | local, staging, production |
| BASE_URL | http://127.0.0.1:3000 (local only) | HTTP(S) origin; remote requires HTTPS |
| TEST_VUS | 1 | 1–100 |
| TEST_DURATION_SECONDS | 10 | 1–600 |
| MAX_P95_MS | 500 | 1–60000 |
| MAX_ERROR_RATE | 0.01 | 0–1 |
| MIN_CHECK_RATE | 1 | 0–1 |
| ALLOW_REMOTE_TARGET | false | true, false |
| API_TOKEN | unset | optional nonblank single-line value |

All nonlocal targets or nonlocal environment names require explicit opt-in. IPv6 and URL paths are intentionally not supported in this baseline. Local means localhost or 127.0.0.1; this is a configuration guard, not a network sandbox. Redirect handling and native k6 option overrides need explicit control in #1 and #11; do not bypass guardrails with native flags or K6_* variables. Limits are illustrative and not a production SLO.

Use publicConfiguration for reports; it allowlists fields and excludes URLs and tokens. Validation errors include field names only. Avoid logging full configuration.

Run: node --test tests/unit/config.test.mjs (Node 22.16.0 supports type stripping; alternatively npm run test:config).
