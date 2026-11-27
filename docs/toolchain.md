# Toolchain (FR-007)

Proposed baseline: Node 22.16.0, npm 10.9.2, k6 0.57.0, TypeScript 5.8.3. These are explicit compatibility pins, not a claim of latest releases; review security and support before merge. k6 0.57 enables native TypeScript by default.

Install Node using .nvmrc and k6 using the official installation instructions for the pinned release. The npm registry was unavailable during authoring, so the lockfile must be generated and reviewed before accepting #9.

```sh
npm install --package-lock-only --ignore-scripts
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
npm run smoke:toolchain
```

The smoke test makes no network requests. The HTTP fixture smoke command will be added under #1 and #2. Lint currently checks TypeScript and Node syntax only; a dedicated semantic linter remains pending. Node scripts use built-in modules; k6 scripts use k6 imports.

## Acceptance evidence
- Exact dependencies and runtime pins: configured.
- Lockfile generation and clean npm ci: pending network access.
- Prettier and pinned TypeScript checks: pending dependency installation.
- Native k6 run: pending installed binary.
- Runtime validator: positive/negative tests provided.
- Full acceptance of #9: pending all above checks.
