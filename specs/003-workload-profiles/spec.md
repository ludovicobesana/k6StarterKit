# workload profiles specification

Status: Proposed | Version: 0.1.0

## Scope
Advanced workloads, API journeys, container execution and release readiness.

## FR-009: Provide reusable workload profiles

Tracking: [#11](https://github.com/ludovicobesana/k6StarterKit/issues/11)

**Requirement:** FR-009 | **Priority:** P1 | **Status:** Proposed

### User story
As a performance engineer, I can select the appropriate workload model.

### Requirements
Provide smoke, average load, stress, spike and soak profiles with documented VUs or arrival rates, ramp stages, duration, graceful stop and capacity bounds; explain open vs closed models.

### Acceptance criteria
- Each profile has a valid bounded configuration and can be exercised with reduced local settings
- invalid profile is rejected
- arrival-rate dropped iterations are visible.

### Dependencies
#1, #4, FR-008

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

---

## FR-011: Support API workflows and test data lifecycle

Tracking: [#13](https://github.com/ludovicobesana/k6StarterKit/issues/13)

**Requirement:** FR-011 | **Priority:** P1 | **Status:** Proposed

### User story
As a tester, I can model authenticated multi-step API journeys.

### Requirements
Provide GET/POST workflow, headers, optional token-based auth, parameterized data, setup/teardown and per-VU data isolation where needed; use deterministic fixtures and avoid logging tokens.

### Acceptance criteria
- Two concurrent VUs do not overwrite each other's data
- invalid credentials and malformed response are handled and counted
- cleanup is verified after normal completion
- interrupted-run cleanup limitations documented.

### Dependencies
#2, #4, FR-008

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

---

## NFR-004: Package a reproducible container execution option

Tracking: [#18](https://github.com/ludovicobesana/k6StarterKit/issues/18)

**Requirement:** NFR-004 | **Priority:** P1 | **Status:** Proposed

### User story
As a CI user, I can execute without installing k6 on the host.

### Requirements
Provide pinned container image or Docker configuration, mounted reports, fixture networking and browser variant guidance; avoid unnecessary privileged mode.

### Acceptance criteria
- Documented container run passes local smoke and produces host-readable artifacts
- invalid configuration fails
- browser limitations and permissions documented.

### Dependencies
#2, FR-007, FR-012

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

---

## NFR-005: Prepare template adoption and release readiness

Tracking: [#19](https://github.com/ludovicobesana/k6StarterKit/issues/19)

**Requirement:** NFR-005 | **Priority:** P1 | **Status:** Proposed

### User story
As a team adopting the kit, I can start a new project from a stable version.

### Requirements
Define release checklist, semantic versioning, changelog, template onboarding and compatibility policy; ensure demo defaults and secrets hygiene; document supported platform matrix.

### Acceptance criteria
- A clean copy runs MVP checks
- release checklist maps to P0 requirements and verification evidence
- no personal endpoints or credentials are embedded.

### Dependencies
SDD-001, NFR-002, NFR-003

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

## Edge cases
Invalid workload, exhausted VU capacity, duplicate test data, interrupted cleanup, container mount permissions.
