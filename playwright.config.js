import { defineConfig, devices } from '@playwright/test';

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
			testMatch: /global\.teardown\.js/
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			dependencies: ['cleanup db']
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
			dependencies: ['cleanup db']
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
			dependencies: ['cleanup db']
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
			dependencies: ['cleanup db']
		},

		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
			dependencies: ['cleanup db']
		},

		{
			name: 'iPhone 14 Pro',
			use: { ...devices['iPhone 14 Pro'] },
			dependencies: ['cleanup db']
		},

		{
			name: 'OnePlus 8T',
			use: {
				userAgent:
					'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.36 Mobile Safari/537.36',
				viewport: {
					width: 412,
					height: 914
				},
				deviceScaleFactor: 2.625,
				isMobile: true,
				hasTouch: true,
				defaultBrowserType: 'chromium'
			},
			dependencies: ['cleanup db']
		},

		{
			name: 'Google Pixel 7',
			use: { ...devices['Pixel 7'] },
			dependencies: ['cleanup db']
		},

		/* Test against branded browsers. */
		{
			name: 'Microsoft Edge',
			use: {
				...devices['Desktop Edge'],
				channel: 'msedge'
			},
			dependencies: ['cleanup db']
		},

		{
			name: 'Google Chrome',
			use: {
				...devices['Desktop Chrome'],
				channel: 'chrome'
			},
			dependencies: ['cleanup db']
		}
	]
});
