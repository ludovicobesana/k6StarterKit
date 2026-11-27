import assert from 'node:assert/strict'
import { once } from 'node:events'
import { test } from 'node:test'
import { performance } from 'node:perf_hooks'
import { createFixture } from '../../fixtures/server.mjs'

async function startFixture(context) {
	const server = createFixture()
	server.listen(0, '127.0.0.1')
	await once(server, 'listening')
	context.after(async () => {
		const closed = once(server, 'close')
		server.close()
		server.closeAllConnections()
		await closed
	})
	return `http://127.0.0.1:${server.address().port}`
}

test('FR-002: health and browser page', async (context) => {
	const base = await startFixture(context)
	const health = await fetch(base + '/health')
	assert.equal(health.status, 200)
	assert.deepEqual(await health.json(), { status: 'ok' })
	const page = await fetch(base)
	assert.equal(page.status, 200)
	assert.match(await page.text(), /id="action"/)
})

test('FR-002: deterministic isolated state and malformed input', async (context) => {
	const base = await startFixture(context)
	const other = await startFixture(context)
	const created = await fetch(base + '/items', {
		method: 'POST',
		body: JSON.stringify({ name: 'sample' }),
	})
	assert.equal(created.status, 201)
	assert.deepEqual(await created.json(), { id: 1, name: 'sample' })
	assert.deepEqual(await (await fetch(base + '/items')).json(), { items: [{ id: 1, name: 'sample' }] })
	assert.deepEqual(await (await fetch(other + '/items')).json(), { items: [] })
	for (const body of ['{', '{}', JSON.stringify({ name: 'x'.repeat(9000) })]) {
		const result = await fetch(base + '/items', { method: 'POST', body })
		assert.equal(result.status, body.length > 8192 ? 413 : 400)
	}
})

test('FR-002: bounded delay, simulated failure and unknown route', async (context) => {
	const base = await startFixture(context)
	const start = performance.now()
	const result = await fetch(base + '/delay?ms=50')
	assert.equal(result.status, 200)
	assert.deepEqual(await result.json(), { delayedMs: 50 })
	assert.ok(performance.now() - start >= 45)
	for (const value of ['-1', '5001', 'abc', '']) {
		assert.equal((await fetch(base + '/delay?ms=' + value)).status, 400)
	}
	assert.equal((await fetch(base + '/error')).status, 503)
	assert.equal((await fetch(base + '/unknown')).status, 404)
})
