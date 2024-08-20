import { expect, test } from '@playwright/test';
import { emptyDatabase, registerLoginUser, hostGame } from './test-helpers'

test.describe('join a game', () => {

    test.beforeAll(async () => {
        await emptyDatabase();
    });

    test.beforeEach(async ({ page }) => {
        await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
    });

    test("can successfully join a game", async ({ page }, workerInfo) => {
        await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
        await page.waitForTimeout(1000);

        const gameCode = await hostGame({ page });

        await registerLoginUser({ page }, "Sally", "Fields", "sfields@gmail.com", "5678efgh");
        await page.getByRole('link', { name: 'Join a Game' }).click();
        await page.waitForTimeout(1000);
        await page.getByPlaceholder('Enter Code').fill(gameCode);
        await page.getByRole('button', { name: 'Join' }).click();

        await page.screenshot({ path: `./test-results/game-join.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Waiting for players...' })).toBeVisible();
        await expect(page.getByText('David J. Host')).toBeVisible();
        await expect(page.getByText('Sally F.')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Exit' })).toBeVisible();
    });

});
