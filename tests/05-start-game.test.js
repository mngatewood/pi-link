import { expect, test } from '@playwright/test';
import { registerLoginUser, hostGame, startGame } from './test-helpers'

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

        await page.getByRole('link', { name: "Continue" }).click();

        await page.screenshot({ path: `./test-results/game-lobby.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Waiting for players...' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Your invitation code is ' })).toBeVisible();
        await expect(page.getByText('David J. Host')).toBeVisible();
        await expect(page.getByText('At least 4 players are')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Exit' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
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

    test("can successfully start a game", async ({ page }, workerInfo) => {
        await startGame({ page });

        await page.screenshot({ path: `./test-results/game-start.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();
    });

});
