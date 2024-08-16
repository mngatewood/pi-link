import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'
console.log(process.env.VITE_DB_URL);

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'cleanup db',
			testMatch: /global\.teardown\.js/,
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			dependencies: [ 'cleanup db' ],
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
			dependencies: ['cleanup db'],
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
			dependencies: ['cleanup db'],
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
			dependencies: ['cleanup db'],
		},

		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
			dependencies: ['cleanup db'],
		},

		/* Test against branded browsers. */
		{
			name: 'Microsoft Edge',
			use: {
				...devices['Desktop Edge'],
				channel: 'msedge'
			},
			dependencies: ['cleanup db'],
		},

		{
			name: 'Google Chrome',
			use: {
				...devices['Desktop Chrome'],
				channel: 'chrome'
			},
			dependencies: ['cleanup db'],
		},	]
});

