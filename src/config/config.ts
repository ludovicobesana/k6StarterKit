export type EnvironmentVariables = Readonly<Record<string, string | undefined>>

export type TestEnvironment = 'local' | 'staging' | 'production'

export type TestConfiguration = Readonly<{
	environment: TestEnvironment
	baseUrl: string
	vus: number
	durationSeconds: number
	maxP95Ms: number
	maxErrorRate: number
	minCheckRate: number
	apiToken: string | undefined
}>

function invalid(key: string): never {
	throw new Error(`Invalid configuration: ${key}`)
}

function integer(raw: string | undefined, fallback: number, min: number, max: number, key: string): number {
	if (raw === undefined) return fallback
	if (!/^\d+$/.test(raw)) return invalid(key)
	const value = Number(raw)
	if (!Number.isSafeInteger(value) || value < min || value > max) return invalid(key)
	return value
}

function rate(raw: string | undefined, fallback: number, key: string): number {
	if (raw === undefined) return fallback
	if (!/^(?:0(?:\.\d+)?|1(?:\.0+)?)$/.test(raw)) return invalid(key)
	return Number(raw)
}

export function loadConfiguration(env: EnvironmentVariables): TestConfiguration {
	const environment = env.TEST_ENV ?? 'local'
	if (environment !== 'local' && environment !== 'staging' && environment !== 'production')
		return invalid('TEST_ENV')
	const rawUrl = env.BASE_URL ?? (environment === 'local' ? 'http://127.0.0.1:3000' : '')
	// Accept origins only: no userinfo, query, fragment or embedded credentials.
	const match = /^(https?):\/\/([a-zA-Z0-9.-]+)(?::(\d{1,5}))?\/?$/.exec(rawUrl)
	if (!match) return invalid('BASE_URL')
	const hostname = match[2]?.toLowerCase()
	if (!hostname || !hostname.split('.').every((label) => /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)))
		return invalid('BASE_URL')
	if (match[3] !== undefined) integer(match[3], 0, 1, 65535, 'BASE_URL')
	const local = hostname === '127.0.0.1' || hostname === 'localhost'
	if (env.ALLOW_REMOTE_TARGET !== undefined && !['true', 'false'].includes(env.ALLOW_REMOTE_TARGET))
		return invalid('ALLOW_REMOTE_TARGET')
	if ((!local || environment !== 'local') && env.ALLOW_REMOTE_TARGET !== 'true')
		return invalid('ALLOW_REMOTE_TARGET')
	if (!local && match[1] !== 'https') return invalid('BASE_URL')
	const apiToken = env.API_TOKEN
	if (apiToken !== undefined && (!apiToken.trim() || /[\r\n]/.test(apiToken))) return invalid('API_TOKEN')
	return Object.freeze({
		environment,
		baseUrl: rawUrl.replace(/\/$/, ''),
		vus: integer(env.TEST_VUS, 1, 1, 100, 'TEST_VUS'),
		durationSeconds: integer(env.TEST_DURATION_SECONDS, 10, 1, 600, 'TEST_DURATION_SECONDS'),
		maxP95Ms: integer(env.MAX_P95_MS, 500, 1, 60000, 'MAX_P95_MS'),
		maxErrorRate: rate(env.MAX_ERROR_RATE, 0.01, 'MAX_ERROR_RATE'),
		minCheckRate: rate(env.MIN_CHECK_RATE, 1, 'MIN_CHECK_RATE'),
		apiToken,
	})
}

export function publicConfiguration(config: TestConfiguration): Omit<TestConfiguration, 'apiToken' | 'baseUrl'> {
	const { environment, vus, durationSeconds, maxP95Ms, maxErrorRate, minCheckRate } = config
	return { environment, vus, durationSeconds, maxP95Ms, maxErrorRate, minCheckRate }
}
