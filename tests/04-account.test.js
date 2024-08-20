import { expect, test } from '@playwright/test';
import { registerLoginUser } from './test-helpers'

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
