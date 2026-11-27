# Configuration contract

FR-008 / #10. Proposed. Pure typed parser with explicit precedence, validated HTTP(S) origin, bounded VU/duration/threshold values, remote opt-in and allowlisted reporting. Invalid configuration throws before traffic when invoked in init. Tests cover defaults, overrides, invalid values, secret redaction and remote opt-in. Integration into a real k6 entrypoint and verification of actual exit status remain pending #1; native option bypass and redirects require review. No issue closure until runtime evidence is available.
