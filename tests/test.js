import { expect, test } from '@playwright/test';

test.describe('index page', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('take a screenshot', async ({ page }, workerInfo) => {
		await page.screenshot({ path: `./test-results/index.${workerInfo.project.name}.png` });
	});

	test('index page has title and icons', async ({ page }) => {
		await expect(page.getByText('PI Link')).toBeVisible();
		await expect(page.getByAltText('account icon')).toBeVisible();
		await expect(page.getByAltText('account icon')).toBeVisible();
	})
	
	test('index page has expected h1 and register/login links', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Register' })).toHaveCount(2);
		await expect(page.getByRole('link', { name: 'Login' })).toHaveCount(2);
		await expect(page.getByTestId('login-inline')).toBeVisible();
		await expect(page.getByTestId('login-button')).toBeVisible();
		await expect(page.getByTestId('register-inline')).toBeVisible();
		await expect(page.getByTestId('register-button')).toBeVisible();
	});

})
	
test.describe('register page', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByTestId('register-button').click();
	});

	test('take a screenshot', async ({ page }, workerInfo) => {
		await page.screenshot({ path: `./test-results/register.${workerInfo.project.name}.png` });
	});

	test('register page has expected h1, inputs, and buttons', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
		await expect(page.getByTestId('register-firstname')).toBeVisible();
		await expect(page.getByTestId('register-lastname')).toBeVisible();
		await expect(page.getByTestId('register-email')).toBeVisible();
		await expect(page.getByTestId('register-password')).toBeVisible();
		await expect(page.getByLabel('Confirm Password*')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
	})

	test("can successfully register", async ({ page }) => {
		await page.getByTestId('register-firstname').click();
		await page.getByTestId('register-firstname').fill('David');
		await page.getByTestId('register-lastname').fill('Jones');
		await page.getByTestId('register-email').fill('djones@gmail.com');
		await page.getByTestId('register-password').fill('1234abcd');
		await page.waitForTimeout(1000);
		await page.getByLabel('Confirm Password*').fill('1234abcd');
		await page.waitForTimeout(1000);
		await page.getByRole('button', { name: 'Sign Up' }).click();

		await expect(page).toHaveURL("/login");
		await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
		await expect(page.locator('div').filter({ hasText: /^Registration successful\. Please login\.$/ })).toBeVisible();
	})

	test("email must be unique", async ({ page }) => {
		await page.getByTestId('register-firstname').fill('David');
		await page.getByTestId('register-lastname').fill('Jones');
		await page.getByTestId('register-email').fill('djones@gmail.com');
		await page.getByTestId('register-password').fill('1234abcd');
		await page.waitForTimeout(1000);
		await page.getByLabel('Confirm Password*').fill('1234abcd');
		await page.waitForTimeout(1000);
		await page.getByRole('button', { name: 'Sign Up' }).click();

		await expect(page).toHaveURL("/register");
		await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
		// await expect(page.getByText('The email djones@gmail.com is invalid or already in use.')).toBeVisible();
	})
})

test.describe('login page', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByTestId('login-button').click();
	});

	test('take a screenshot', async ({ page }, workerInfo) => {
		await page.screenshot({ path: `./test-results/login.${workerInfo.project.name}.png` });
	});

	test('login page has expected h1, inputs, and buttons', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
		await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
		await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
	});

	test("can successfully login", async ({ page }) => {
		await page.goto('/register');
		await page.getByTestId('register-firstname').fill('David');
		await page.getByTestId('register-lastname').fill('Jones');
		await page.getByTestId('register-email').fill('djones@gmail.com');
		await page.getByTestId('register-password').fill('1234abcd');
		await page.waitForTimeout(1000);
		await page.getByLabel('Confirm Password*').fill('1234abcd');
		await page.getByRole('button', { name: 'Sign Up' }).click();
		await page.goto('login');
		await page.getByRole('textbox', { name: 'Email Address' }).fill('djones@gmail.com');
		await page.getByRole('textbox', { name: 'Password' }).fill('1234abcd');
		await page.waitForTimeout(1000);
		await page.getByRole('button', { name: 'Log In' }).click();

		await expect(page).toHaveURL("/play");
		await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'join' })).toHaveCount(2);
		await expect(page.getByRole('link', { name: 'host' })).toHaveCount(2);
	})

})

	
	