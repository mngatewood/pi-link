import { expect, test } from '@playwright/test';
import { emptyDatabase, registerLoginUser } from './test-helpers'

test.describe('login page', () => {

    test.beforeAll(async () => {
        await emptyDatabase();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/logout');
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
