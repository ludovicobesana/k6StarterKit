# Product requirements and traceability

Status: Proposed baseline (0.1.0). The repository is greenfield; no runtime behavior is implemented yet.

## Product vision
A reusable, local-first, TypeScript-oriented k6 performance testing starter kit for QA engineers and developers.

## MVP
All P0 requirements: governance, modular tooling, local fixture, validated configuration, HTTP smoke, thresholds, reports, CI, verification and onboarding. P1 extends workloads, API/browser and packaging; P2 adds optional observability. Distributed load orchestration, mandatory cloud services and production SLO definitions are out of scope.

## Traceability
All verification entries are planned, not executed.

| Requirement | Priority | Issue | Specification | Planned verification |
|---|---|---|---|---|
| FR-001 | P0 | [#1](https://github.com/ludovicobesana/k6StarterKit/issues/1) | [002-http-testing](002-http-testing/spec.md) | HTTP pass/fail exit codes |
| FR-002 | P0 | [#2](https://github.com/ludovicobesana/k6StarterKit/issues/2) | [001-foundation](001-foundation/spec.md) | Fixture startup/reset |
| FR-003 | P2 | [#3](https://github.com/ludovicobesana/k6StarterKit/issues/3) | [005-observability](005-observability/spec.md) | Faro on/off correlation |
| FR-004 | P0 | [#4](https://github.com/ludovicobesana/k6StarterKit/issues/4) | [001-foundation](001-foundation/spec.md) | Shared module smoke/typecheck |
| FR-005 | P0 | [#5](https://github.com/ludovicobesana/k6StarterKit/issues/5) | [002-http-testing](002-http-testing/spec.md) | CI pass/fail and fork review |
| FR-006 | P1 | [#6](https://github.com/ludovicobesana/k6StarterKit/issues/6) | [004-browser-testing](004-browser-testing/spec.md) | Browser journey and failure cleanup |
| NFR-001 | P0 | [#7](https://github.com/ludovicobesana/k6StarterKit/issues/7) | [001-foundation](001-foundation/spec.md) | Contribution walkthrough |
| SDD-001 | P0 | [#8](https://github.com/ludovicobesana/k6StarterKit/issues/8) | [001-foundation](001-foundation/spec.md) | Matrix coverage and spec review |
| FR-007 | P0 | [#9](https://github.com/ludovicobesana/k6StarterKit/issues/9) | [001-foundation](001-foundation/spec.md) | Clean install and runtime checks |
| FR-008 | P0 | [#10](https://github.com/ludovicobesana/k6StarterKit/issues/10) | [001-foundation](001-foundation/spec.md) | Config validation and redaction |
| FR-009 | P1 | [#11](https://github.com/ludovicobesana/k6StarterKit/issues/11) | [003-workload-profiles](003-workload-profiles/spec.md) | Reduced profile runs and invalid profile |
| FR-010 | P0 | [#12](https://github.com/ludovicobesana/k6StarterKit/issues/12) | [002-http-testing](002-http-testing/spec.md) | Slow/error threshold cases |
| FR-011 | P1 | [#13](https://github.com/ludovicobesana/k6StarterKit/issues/13) | [003-workload-profiles](003-workload-profiles/spec.md) | Concurrent data isolation and auth errors |
| FR-012 | P0 | [#14](https://github.com/ludovicobesana/k6StarterKit/issues/14) | [002-http-testing](002-http-testing/spec.md) | JSON summary and exit status |
| FR-013 | P2 | [#15](https://github.com/ludovicobesana/k6StarterKit/issues/15) | [005-observability](005-observability/spec.md) | Dashboard metrics and disabled mode |
| NFR-002 | P0 | [#16](https://github.com/ludovicobesana/k6StarterKit/issues/16) | [002-http-testing](002-http-testing/spec.md) | Positive/negative regression harness |
| NFR-003 | P0 | [#17](https://github.com/ludovicobesana/k6StarterKit/issues/17) | [002-http-testing](002-http-testing/spec.md) | Fresh clone walkthrough |
| NFR-004 | P1 | [#18](https://github.com/ludovicobesana/k6StarterKit/issues/18) | [003-workload-profiles](003-workload-profiles/spec.md) | Container smoke and artifacts |
| NFR-005 | P1 | [#19](https://github.com/ludovicobesana/k6StarterKit/issues/19) | [003-workload-profiles](003-workload-profiles/spec.md) | Clean template and release checklist |

## Open decisions
- Exact k6/Node versions and supported platform matrix: #9.
- Fixture technology and API contract: #2.
- Config schema, safe workload limits and opt-in mechanism: #10.
- Illustrative numeric thresholds: #12.
- Summary schema and output APIs: #14.
- Browser runtime prerequisites: #6.
- Metrics backend and Faro collector: #15 and #3.
- Whether to install GitHub Spec Kit CLI or retain the compatible manual layout: maintainer review.

## Review workflow
Constitution → specification → plan → tasks → implementation → verification. Each change links requirement ID, issue and evidence. Issues are execution tracking; versioned specs are the intended source of truth after approval. Resolve discrepancies in review before implementation.
