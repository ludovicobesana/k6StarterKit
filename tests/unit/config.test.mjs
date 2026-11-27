import assert from 'node:assert/strict'
import { test } from 'node:test'
import { loadConfiguration, publicConfiguration } from '../../src/config/config.ts'

test('FR-008: safe local defaults and explicit overrides', () => {
	const defaults = loadConfiguration({})
	assert.equal(defaults.baseUrl, 'http://127.0.0.1:3000')
	assert.equal(defaults.vus, 1)
	const custom = loadConfiguration({ TEST_VUS: '5', TEST_DURATION_SECONDS: '20', MAX_ERROR_RATE: '0.05' })
	assert.equal(custom.vus, 5)
	assert.equal(custom.durationSeconds, 20)
	assert.equal(custom.maxErrorRate, 0.05)
	assert.ok(Object.isFrozen(custom))
})

test('FR-008: invalid input fails without disclosing values', () => {
	for (const [key, value] of Object.entries({
		TEST_ENV: 'unknown',
		BASE_URL: 'https://secret@example.com',
		TEST_VUS: '101',
		TEST_DURATION_SECONDS: '0',
		MAX_P95_MS: 'NaN',
		MAX_ERROR_RATE: '1.1',
		MIN_CHECK_RATE: '-1',
		API_TOKEN: 'secret\nvalue',
		ALLOW_REMOTE_TARGET: 'yes',
	})) {
		assert.throws(() => loadConfiguration({ [key]: value }), (error) => error.message === 'Invalid configuration: ' + key)
	}
})

test('FR-008: remote traffic requires explicit consent and HTTPS', () => {
	assert.throws(() => loadConfiguration({ BASE_URL: 'https://example.com' }), /ALLOW_REMOTE_TARGET/)
	assert.throws(() => loadConfiguration({ TEST_ENV: 'staging' }), /BASE_URL/)
	assert.throws(() => loadConfiguration({ BASE_URL: 'http://example.com', ALLOW_REMOTE_TARGET: 'true' }), /BASE_URL/)
	const config = loadConfiguration({ TEST_ENV: 'staging', BASE_URL: 'https://example.com/', ALLOW_REMOTE_TARGET: 'true' })
	assert.equal(config.baseUrl, 'https://example.com')
})

test('FR-008: reports omit tokens and target URLs', () => {
	const config = loadConfiguration({ API_TOKEN: 'private-token' })
	const output = JSON.stringify(publicConfiguration(config))
	assert.ok(!output.includes('private-token'))
	assert.ok(!output.includes('127.0.0.1'))
	assert.ok(!output.includes('apiToken'))
})
