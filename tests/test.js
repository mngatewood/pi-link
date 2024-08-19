import { expect, test } from '@playwright/test';
import { registerUser, registerLoginUser, hostGame, startGame } from './test-helpers'

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

});
	
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
		await registerUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
		await page.waitForTimeout(1000);

		await expect(page).toHaveURL("/login?registered=true");
		await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
		await expect(page.locator('div').filter({ hasText: /^Registration successful\. Please login\.$/ })).toBeVisible();
	})

	test("email must be unique", async ({ page }) => {
		await registerUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
		await page.waitForTimeout(1000);

		await expect(page).toHaveURL("/register");
		await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
		await expect(page.getByText('The email djones@gmail.com is invalid or already in use.')).toBeVisible();
	})
});

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
		await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");

		await expect(page).toHaveURL("/play");
		await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'join' })).toHaveCount(2);
		await expect(page.getByRole('link', { name: 'host' })).toHaveCount(2);
	});

});

test.describe('account page', () => {

	test.beforeEach(async ({ page }) => {
		await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
		await page.waitForTimeout(1000);
		await page.getByRole('link', { name: 'account icon' }).click();
	});

	test('take a screenshot', async ({ page }, workerInfo) => {
		await page.getByRole('link', { name: 'account icon' }).click();
		await page.screenshot({ path: `./test-results/account.${workerInfo.project.name}.png` });
	});

	test('account page has expected h1, email, and buttons', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Account' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'djones@gmail.com' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
	});

	test('can successfully log out', async ({ page }) => {
		await page.waitForTimeout(1000);
		await page.getByRole('link', { name: 'Log Out' }).click();

		await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Register' })).toHaveCount(2);
		await expect(page.getByRole('link', { name: 'Login' })).toHaveCount(2);

		await page.getByRole('link', { name: 'account icon' }).click()

		await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Register' })).toHaveCount(2);
		await expect(page.getByRole('link', { name: 'Login' })).toHaveCount(2);
	})

});

test.describe('game page', () => {

	test.beforeEach(async ({ page }) => {
		await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
	});

	test('take a screenshot', async ({ page }, workerInfo) => {
		await page.screenshot({ path: `./test-results/game-home.${workerInfo.project.name}.png` });
	});

	test("can successfully host a game", async ({ page }, workerInfo) => {
		await page.getByRole('link', { name: 'Host a Game' }).click();

		await page.screenshot({ path: `./test-results/game-host.${workerInfo.project.name}.png` });
		await expect(page.getByRole('heading', { name: 'Host a New Game' })).toBeVisible();
		await expect(page.getByTestId('host-code-notepad')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();

		await page.getByRole('link', { name: "Continue"}).click();

		await page.screenshot({ path: `./test-results/game-lobby.${workerInfo.project.name}.png` });
		await expect(page.getByRole('heading', { name: 'Waiting for players...' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Your invitation code is ' })).toBeVisible();
		await expect(page.getByText('David J. Host')).toBeVisible();
		await expect(page.getByText('At least 4 players are')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Exit Game' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Start Game' })).toBeVisible();
	});

	test("can successfully join a game", async ({ page }, workerInfo) => {
		await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
		await page.waitForTimeout(1000);

		const gameCode = await hostGame({ page });

		await registerLoginUser({ page}, "Sally", "Fields", "sfields@gmail.com", "5678efgh");
		await page.getByRole('link', { name: 'Join a Game' }).click();
		await page.waitForTimeout(1000);
		await page.getByPlaceholder('Enter Code').fill(gameCode);
		await page.getByRole('button', { name: 'Join' }).click();

		await page.screenshot({ path: `./test-results/game-join.${workerInfo.project.name}.png` });
		await expect(page.getByRole('heading', { name: 'Waiting for players...' })).toBeVisible();
		await expect(page.getByText('David J. Host')).toBeVisible();
		await expect(page.getByText('Sally F.')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Exit Game' })).toBeVisible();
	});

	test("can successfully start a game", async ({ page }, workerInfo) => {
		await startGame({ page });

		await page.screenshot({ path: `./test-results/game-start.${workerInfo.project.name}.png` });
		await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
		await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();
	});

});
	