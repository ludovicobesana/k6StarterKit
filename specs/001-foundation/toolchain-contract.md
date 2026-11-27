# Toolchain implementation contract

FR-007 / #9. Proposed; foundation and architecture reviews pending.

Given a fresh clone with pinned Node/npm/k6 and network access, generate and commit the npm lockfile, then npm ci must succeed. Format, typecheck, lint and test commands must exit zero. The native TypeScript probe must pass with no network requests. A missing or mismatched k6 must exit nonzero with an actionable message. Generated dependencies remain ignored.

Tasks: pin versions; add strict TS config; add native execution probe; add runtime validation and tests; generate and review lockfile; run all acceptance commands. Do not close #9 until every task is verified.
