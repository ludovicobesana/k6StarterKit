# Contributing

Requirement: NFR-001 (#7). Status: proposed until merged.

## Workflow
1. Select an issue and read the [constitution](.specify/memory/constitution.md) and [requirements matrix](specs/README.md).
2. Update the relevant specification, plan and tasks if behavior changes. Obtain review before implementing.
3. Create a focused branch and implement the smallest change satisfying the acceptance criteria.
4. Add positive and negative tests, run the documented checks and record command, runtime version, result and requirement ID.
5. Open a PR using the template. Do not mark unexecuted checks as passing.

## Prerequisites and verification
The current branch contains documentation and contracts only. Git is sufficient to review it. Node, npm, k6 versions, installation commands and executable validation scripts will be defined in #9; local target startup in #2; smoke execution in #1. Do not assume these commands are available today.

Planned interface (not yet executable): npm ci, npm run format:check, npm run lint, npm run typecheck, npm run test, npm run smoke. Run load only against an authorized target; default to the local fixture.

## TypeScript conventions
- Strict typing; descriptive type names, Array<T> for arrays, function declarations where appropriate.
- Tabs, single quotes, no semicolons (Prettier configuration in repository).
- Explicit return types for public contracts where helpful. Avoid any and unsafe casts.
- Prefer pure configuration and data helpers; inject runtime dependencies only where justified.
- Use k6-compatible APIs inside src/ and examples/; Node-only APIs belong in tooling or fixtures.
- No secrets in commits, logs, screenshots or reports.

## Review
Confirm acceptance criteria, dependency direction, deterministic fixtures, bounded workloads, failure semantics and evidence. Documentation-only changes may use manual link and contract review; explain why runtime checks are not applicable.
