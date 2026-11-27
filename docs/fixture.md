# Local fixture (FR-002)

Start with Node 22.16.0: `npm run fixture` (or `node fixtures/server.mjs`). No dependencies, cloud services or credentials required. Default address: http://127.0.0.1:3000. Set FIXTURE_PORT to override. Wait for the readiness log and GET /health with a 5-second readiness budget. Stop with Ctrl+C; restart resets all in-memory state.

| Method | Path | Expected result |
|---|---|---|
| GET | /health | 200, {"status":"ok"} |
| GET | /items | 200, items array |
| POST | /items | 201, sequential ID and name |
| GET | /delay?ms=100 | 200 after bounded delay (0–5000 ms) |
| GET | /error | 503 simulated failure |
| GET | / | 200, interactive browser page |

Malformed JSON or invalid names return 400, bodies over 8192 bytes return 413, capacity at 1000 items returns 409, unknown routes return 404. Fixture binds loopback only. This is a synthetic target, not a production server. Container networking is deferred to #18.

Run `node --test tests/integration/fixture.test.mjs` or `npm run test:fixture`. Tests use ephemeral ports and separate state.
