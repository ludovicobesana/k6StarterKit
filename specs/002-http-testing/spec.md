# http testing specification

Status: Proposed | Version: 0.1.0

## Scope
Runnable HTTP smoke, quality gates, reporting, CI and adoption.

## FR-001: Add basic example

Tracking: [#1](https://github.com/ludovicobesana/k6StarterKit/issues/1)

**Requirement:** FR-001 | **Priority:** P0 | **Status:** Proposed

### User story
As a QA engineer, I can run a minimal HTTP smoke test from a fresh clone.

### Requirements
Provide a GET example with status/body checks, bounded VUs and duration, and a check-rate threshold. Document the exact command.

### Acceptance criteria
- Given the local test target is healthy, when the example runs, then checks and thresholds pass and exit code is 0.
- Given an incorrect response, when it runs, then the check threshold fails and exit code is nonzero.

### Dependencies
#2, #4

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria automated where feasible, with evidence
- [ ] Documentation updated and CI green

---

## FR-010: Define performance thresholds and failure semantics

Tracking: [#12](https://github.com/ludovicobesana/k6StarterKit/issues/12)

**Requirement:** FR-010 | **Priority:** P0 | **Status:** Proposed

### User story
As a QA engineer, I can enforce explicit performance budgets.

### Requirements
Provide configurable HTTP failure rate, p95 latency and check-rate thresholds; distinguish checks from thresholds and tag scenario-specific metrics; use illustrative defaults, not production SLO claims.

### Acceptance criteria
- Healthy fixture passes
- deterministic slow/error fixture violates selected thresholds and exits nonzero
- checks alone are not mistaken for a failing quality gate.

### Dependencies
#1, #2, FR-008

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

---

## FR-012: Generate portable test summaries and artifacts

Tracking: [#14](https://github.com/ludovicobesana/k6StarterKit/issues/14)

**Requirement:** FR-012 | **Priority:** P0 | **Status:** Proposed

### User story
As a CI consumer, I can inspect and archive test results.

### Requirements
Provide human-readable summary and machine-readable JSON using supported k6 output APIs; capture run ID, scenario, sanitized configuration, checks, thresholds, durations and outcome; document optional HTML if supported.

### Acceptance criteria
- Passing and failing executions produce readable artifacts when summary generation is reached
- filenames avoid collisions
- report publication never masks k6 exit status
- no credentials in outputs.

### Dependencies
#1, FR-010

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

---

## FR-005: Add GitHub Actions Example

Tracking: [#5](https://github.com/ludovicobesana/k6StarterKit/issues/5)

**Requirement:** FR-005 | **Priority:** P0 | **Status:** Proposed

### User story
As a maintainer, I can verify changes automatically in GitHub Actions.

### Requirements
Pin runtime versions, run formatting/type checks and local smoke tests on pull requests; publish sanitized summaries; heavier tests opt-in with timeouts and least permissions.

### Acceptance criteria
- Given a passing PR, then CI succeeds and exposes a report.
- Given a threshold violation, then CI fails even if report publication runs.
- Given an untrusted fork, then no secrets or production traffic are required.

### Dependencies
#1, #2, #4

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria automated where feasible, with evidence
- [ ] Documentation updated and CI green

---

## NFR-002: Verify starter kit behavior and regression cases

Tracking: [#16](https://github.com/ludovicobesana/k6StarterKit/issues/16)

**Requirement:** NFR-002 | **Priority:** P0 | **Status:** Proposed

### User story
As a maintainer, I can prove the kit itself works.

### Requirements
Add deterministic tests for config validation, profile selection, data helpers and fixture behavior plus real k6 integration tests for passing/failing cases; map tests to requirements.

### Acceptance criteria
- CI executes positive and negative cases
- negative tests assert expected nonzero codes without failing the verification harness itself
- no public target dependency.

### Dependencies
#2, #5, FR-007, FR-010, FR-012

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

---

## NFR-003: Publish onboarding and usage documentation

Tracking: [#17](https://github.com/ludovicobesana/k6StarterKit/issues/17)

**Requirement:** NFR-003 | **Priority:** P0 | **Status:** Proposed

### User story
As a new user, I can adopt the starter kit without prior project knowledge.

### Requirements
Document prerequisites, installation, local target, first run, workload selection, config, thresholds, CI, reports, troubleshooting, browser and optional telemetry; include architecture and extension examples.

### Acceptance criteria
- A fresh-clone walkthrough completes using documented commands
- optional features clearly marked
- all commands and links validated
- license retained.

### Dependencies
#1, #2, #4, #7, FR-007

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

## Edge cases
Unreachable fixture, malformed body, threshold failure, missing summary after abrupt abort, untrusted fork.
