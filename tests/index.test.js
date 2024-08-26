import { expect, test } from '@playwright/test';

test.describe('index page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/logout');
	});

	test('take a screenshot', async ({ page }, workerInfo) => {
		await page.screenshot({ path: `./test-results/index.${workerInfo.project.name}.png` });
	});

	test('index page has title and icons', async ({ page }) => {
		await expect(page.getByText('PI Link')).toBeVisible();
		await expect(page.getByAltText('account icon')).toBeVisible();
		await expect(page.getByAltText('account icon')).toBeVisible();
	});

	test('index page has expected h1 and register/login links', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Register' })).toHaveCount(2);
		await expect(page.getByRole('link', { name: 'Login' })).toHaveCount(2);
		await expect(page.getByTestId('login-inline')).toBeVisible();
		await expect(page.getByTestId('login-button')).toBeVisible();
		await expect(page.getByTestId('register-inline')).toBeVisible();
		await expect(page.getByTestId('register-button')).toBeVisible();
	});
});
