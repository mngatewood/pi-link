import { expect, test } from '@playwright/test';
import { emptyDatabase, registerUser } from './test-helpers'

test.describe.configure({ mode: 'serial' });

test.describe('register page', () => {

    test.beforeAll(async () => {
        await emptyDatabase();
    });

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
