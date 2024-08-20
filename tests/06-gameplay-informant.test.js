import { expect, test } from '@playwright/test';
import { informantGameplayDbSetup, loginUser, joinGame, completeVotes } from './test-helpers'

let game;

test.describe('game page', () => {

    test.beforeAll(async () => {
        game = await informantGameplayDbSetup();
    });

    test('can play the game', async ({ page }, workerInfo) => {
        await loginUser({ page }, "djones@gmail.com", "1234abcd");
        await joinGame({ page }, game.code.toString());

        await page.screenshot({ path: `./test-results/gameplay-informant-s1.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'inform detectives' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).toBeVisible();
        await expect(page.getByPlaceholder('Enter Clue')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Clear' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Submit'})).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-informant-s1-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.getByPlaceholder('Enter Clue').fill('clue');
        await page.screenshot({ path: `./test-results/gameplay-informant-s1.${workerInfo.project.name}.png` });
        
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.screenshot({ path: `./test-results/gameplay-informant-s2a.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'submit evidence' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('button', { name: 'All players have played two' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-informant-s2-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'All players have played two' }).click();
        await page.screenshot({ path: `./test-results/gameplay-informant-s2b.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'submit evidence' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Proceed to next stage.' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: 'Proceed to next stage.' }).click();
        await page.screenshot({ path: `./test-results/gameplay-informant-s3a.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'defend evidence' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('button', { name: 'All players have defended' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-informant-s3-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'All players have defended' }).click();
        await page.screenshot({ path: `./test-results/gameplay-informant-s3b.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'defend evidence' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Proceed to next stage.' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: 'Proceed to next stage.' }).click();
        await page.screenshot({ path: `./test-results/gameplay-informant-s4a.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'vote on conspirator' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Awaiting Votes' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Once all players have voted,' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Proceed to next stage.' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-informant-s4-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);

        game = await completeVotes(game);
        await page.screenshot({ path: `./test-results/gameplay-informant-s4b.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'vote on conspirator' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'voting completed' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Click the button below to continue.' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Proceed to next stage.' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: 'Proceed to next stage.' }).click();
        await page.screenshot({ path: `./test-results/gameplay-informant-s5.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'view results' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).not.toBeVisible();
        await expect(page.getByText('Clue: **********')).not.toBeVisible();
        await expect(page.getByText('David J.')).toBeVisible();
        await expect(page.getByText('Salley F.')).toBeVisible();
        await expect(page.getByText('David S.')).toBeVisible();
        await expect(page.getByText('Alice P.')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Finish Round' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-informant-s5-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Finish Round' }).click();

        await page.screenshot({ path: `./test-results/gameplay-informant-s6.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'round end' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).not.toBeVisible();
        await expect(page.getByText('Clue: **********')).not.toBeVisible();
        await expect(page.getByText('Round 1 Total')).toBeVisible();
        await expect(page.getByText('David J.')).toBeVisible();
        await expect(page.getByText('Salley F.')).toBeVisible();
        await expect(page.getByText('David S.')).toBeVisible();
        await expect(page.getByText('Alice P.')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'The round has ended.' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Click the button below to' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Finish Round' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-informant-s6-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Finish Round' }).click();

        await expect(page.getByRole('heading', { name: 'Round Two' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'inform detectives' })).toBeVisible();
        await expect(page.getByText('Role: **********')).toBeVisible();
        await expect(page.getByText('Informant:')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Waiting for the Informant to' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Clear' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Submit' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

    });

});
