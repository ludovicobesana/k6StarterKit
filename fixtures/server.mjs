import { createServer } from 'node:http'
import { setTimeout as delay } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'

const host = '127.0.0.1'
const maxBodyBytes = 8192

function json(response, status, payload) {
	response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
	response.end(JSON.stringify(payload))
}

export function createFixture() {
	const items = new Map()
	let nextId = 1
	return createServer(async (request, response) => {
		try {
			const url = new URL(request.url, 'http://localhost')
			const route = request.method + ' ' + url.pathname
			if (route === 'GET /health') return json(response, 200, { status: 'ok' })
			if (route === 'GET /items') return json(response, 200, { items: [...items.values()] })
			if (route === 'POST /items') {
				let size = 0
				const chunks = []
				for await (const chunk of request) {
					size += chunk.length
					if (size <= maxBodyBytes) chunks.push(chunk)
				}
				if (size > maxBodyBytes) return json(response, 413, { error: 'body too large' })
				let body
				try {
					body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
				} catch {
					return json(response, 400, { error: 'invalid JSON' })
				}
				if (typeof body?.name !== 'string' || !body.name.trim() || body.name.length > 100)
					return json(response, 400, { error: 'invalid name' })
				if (items.size >= 1000) return json(response, 409, { error: 'fixture capacity reached' })
				const item = { id: nextId++, name: body.name }
				items.set(item.id, item)
				return json(response, 201, item)
			}
			if (route === 'GET /delay') {
				const value = url.searchParams.get('ms') ?? '100'
				const ms = Number(value)
				if (!/^\d+$/.test(value) || !Number.isInteger(ms) || ms > 5000)
					return json(response, 400, { error: 'ms must be between 0 and 5000' })
				await delay(ms)
				return json(response, 200, { delayedMs: ms })
			}
			if (route === 'GET /error') return json(response, 503, { error: 'simulated failure' })
			if (route === 'GET /') {
				response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
				return response.end('<!doctype html><html lang="en"><title>k6 fixture</title><main><h1>k6 fixture</h1><button id="action">Run action</button><p id="result" role="status">Ready</p></main><script>document.querySelector("#action").addEventListener("click",()=>{document.querySelector("#result").textContent="Done"})</script></html>')
			}
			return json(response, 404, { error: 'not found' })
		} catch {
			if (!response.headersSent && !response.destroyed)
				json(response, 500, { error: 'fixture failure' })
		}
	})
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const port = Number(process.env.FIXTURE_PORT ?? '3000')
	if (!Number.isInteger(port) || port < 1 || port > 65535) {
		console.error('FIXTURE_PORT must be an integer between 1 and 65535')
		process.exitCode = 1
	} else {
		const server = createFixture()
		server.on('error', (error) => {
			console.error(error.message)
			process.exitCode = 1
		})
		server.listen(port, host, () => console.log(`Fixture ready at http://${host}:${port}`))
		function shutdown() {
			server.close()
			server.closeAllConnections()
		}
		process.once('SIGINT', shutdown)
		process.once('SIGTERM', shutdown)
	}
}
