import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateVersion } from './check-runtime.mjs'

test('accepts the pinned runtime', () => {
	assert.doesNotThrow(() => validateVersion('k6 v0.57.0 (linux/amd64)', '0.57.0'))
})

test('rejects mismatched and malformed runtime versions', () => {
	for (const output of ['k6 v0.58.0', 'unknown', 'k6 v0.57.0-rc1', '']) {
		assert.throws(() => validateVersion(output, '0.57.0'), /Expected k6/)
	}
})
