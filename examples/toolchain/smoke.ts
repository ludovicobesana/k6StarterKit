import { check } from 'k6'

export const options = {
	vus: 1,
	iterations: 1,
	thresholds: {
		checks: ['rate==1'],
	},
}

export default function () {
	const result: number = 2 + 2
	check(result, {
		'TypeScript runs natively': (value) => value === 4,
	})
}
