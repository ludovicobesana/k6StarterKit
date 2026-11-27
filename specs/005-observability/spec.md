# observability specification

Status: Proposed | Version: 0.1.0

## Scope
Optional metrics and RUM integrations.

## FR-003: Add grafana faro integration

Tracking: [#3](https://github.com/ludovicobesana/k6StarterKit/issues/3)

**Requirement:** FR-003 | **Priority:** P2 | **Status:** Proposed

### User story
As a performance engineer, I can correlate synthetic browser runs with frontend telemetry.

### Requirements
Provide optional Grafana Faro integration on the demo frontend, distinguish Faro RUM telemetry from k6 metrics, document configuration, consent/data handling and correlation tags. No mandatory cloud dependency.

### Acceptance criteria
- Given a configured collector, when a browser journey runs, then telemetry arrives with a documented correlation identifier.
- Given Faro is disabled or unavailable, then core smoke tests remain usable and no secrets appear in logs.

### Dependencies
#2, #6

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria automated where feasible, with evidence
- [ ] Documentation updated and CI green

---

## FR-013: Provide optional Grafana metrics integration

Tracking: [#15](https://github.com/ludovicobesana/k6StarterKit/issues/15)

**Requirement:** FR-013 | **Priority:** P2 | **Status:** Proposed

### User story
As a performance engineer, I can visualize k6 time-series metrics.

### Requirements
Document a supported metrics backend and Grafana dashboard with run/scenario tags; optional local setup or remote endpoint; distinguish k6 metrics from Faro RUM; bound tag cardinality.

### Acceptance criteria
- Configured run exposes latency, request rate, error rate and VUs in dashboard
- default local execution works without Grafana
- credentials remain external.

### Dependencies
FR-012

### Definition of done
- [ ] Versioned spec and implementation plan reviewed before coding
- [ ] Acceptance criteria verified with automated tests where feasible
- [ ] Documentation updated and CI green

## Edge cases
Collector offline, missing credentials, excessive tag cardinality, disabled telemetry.
