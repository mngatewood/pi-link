import { expect, test } from '@playwright/test';
import { emptyDatabase, registerLoginUser, startGame } from './test-helpers'

test.describe('start a game', () => {

    test.beforeAll(async () => {
        await emptyDatabase();
    });

    test.beforeEach(async ({ page }) => {
        await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
    });

    test('take a screenshot', async ({ page }, workerInfo) => {
        await page.screenshot({ path: `./test-results/game-home.${workerInfo.project.name}.png` });
    });

    test("can successfully start a game", async ({ page }, workerInfo) => {
        await startGame({ page });

        await page.screenshot({ path: `./test-results/game-start.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();
    });

});
