import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export function validateVersion(output, expected) {
	const match = /^k6 v?(\d+\.\d+\.\d+)(?=\s|$)/.exec(output.trim())
	if (match?.[1] !== expected) {
		throw new Error(`Expected k6 ${expected}; received ${output.trim() || 'unknown version'}`)
	}
}

function main() {
	const expected = readFileSync(new URL('../.k6-version', import.meta.url), 'utf8').trim()
	const result = spawnSync('k6', ['version'], { encoding: 'utf8' })
	if (result.error || result.status !== 0) {
		throw new Error(`Install k6 ${expected} and ensure it is on PATH`)
	}
	validateVersion(result.stdout, expected)
	console.log(`k6 ${expected} verified`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		main()
	} catch (error) {
		console.error(error.message)
		process.exitCode = 1
	}
}
