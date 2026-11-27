# ADR 0001: Separate k6 execution from Node tooling

Status: Proposed. Requirements: FR-004, FR-007.

## Context
k6 executes JavaScript/TypeScript in its own runtime. Node tooling and fixture libraries may depend on APIs not available to k6.

## Decision
Use native TypeScript execution where supported by the pinned k6 release; Node is used for development tooling, fixture and orchestration. Keep pure helpers portable. Introduce bundling only for a demonstrated compatibility need.

## Alternatives
Bundling all tests adds configuration and build overhead. A single Node-centric runtime obscures k6 constraints.

## Consequences
Two runtime boundaries and corresponding checks are needed. Exact versions and dependency compatibility are resolved in #9. Validate with real k6 execution before accepting FR-004.
