import { expect, test } from '@playwright/test';
import { emptyDatabase, registerLoginUser } from './test-helpers'

test.describe('host a game', () => {

    test.beforeAll(async () => {
        await emptyDatabase();
    });

    test.beforeEach(async ({ page }) => {
        await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
    });

    test("can successfully host a game", async ({ page }, workerInfo) => {
        await page.getByRole('link', { name: 'Host a Game' }).click();

        await page.screenshot({ path: `./test-results/game-host.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Host a New Game' })).toBeVisible();
        await expect(page.getByTestId('host-code-notepad')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();

        await page.getByRole('link', { name: "Continue" }).click();

        await page.screenshot({ path: `./test-results/game-lobby.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Waiting for players...' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Your invitation code is ' })).toBeVisible();
        await expect(page.getByText('David J. Host')).toBeVisible();
        await expect(page.getByText('At least 4 players are')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Exit' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    });

});
