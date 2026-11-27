# k6StarterKit Constitution

Version: 0.1.0 | Status: Proposed | Date: 2026-11-27

## I. Specification first
Every behavior change MUST have a reviewed specification, stable requirement IDs, acceptance criteria and a plan before implementation. PRs MUST link issues and verification evidence. Changes to requirements MUST update specs and traceability in the same PR.

## II. Reproducibility and local-first
Core examples MUST run against deterministic local fixtures without cloud accounts, credentials or public endpoints. Pin toolchain versions and dependencies; document clean setup and teardown.

## III. Runtime compatibility and simplicity
Use TypeScript-first, k6-compatible modules and native execution where supported. Node tooling is separate from the k6 runtime. Prefer minimal dependencies, reusable modules and explicit configuration over abstractions without demonstrated need.

## IV. Verifiable quality gates
Checks, thresholds and exit codes MUST be explicit. Verify passing and failing cases using real k6 runs. CI MUST preserve failure status and publish sanitized evidence when available. Performance budgets are illustrative until approved for a target.

## V. Safe configuration
Validate configuration before traffic; default to bounded local workloads. Nonlocal heavy traffic requires explicit opt-in. Never commit or report credentials. Optional integrations MUST NOT be required for core execution.

## VI. Maintainability
Document public interfaces, examples, limitations and compatibility. Prefer small independently verifiable changes. Keep browser and observability capabilities optional.

## Governance
The maintainer approves the constitution and changes through PR review. Amendments require a version bump, rationale and impact review against existing specs. Exceptions require an explicit ADR with scope and expiry/review date. No approval is implied by this draft.
