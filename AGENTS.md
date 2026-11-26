# Coding agent instructions

Read [constitution](.specify/memory/constitution.md), [specs](specs/README.md), [contribution guidelines](CONTRIBUTING.md) and [architecture](docs/architecture.md) before modifying code.

- Link every change to requirement IDs and an issue. Review specs before implementation; do not silently expand scope.
- Prefer native k6 TypeScript; keep Node tooling separate.
- Keep workloads bounded and local by default. Never run heavy tests against external services without explicit opt-in.
- Add positive and negative verification. Report actual commands and outcomes; do not claim unrun tests passed.
- Keep optional integrations isolated. Do not introduce credentials or generated reports into Git.
- Use tabs, single quotes, no semicolons, descriptive TypeScript types and function declarations.
- Do not merge or close issues without required review and acceptance evidence.
