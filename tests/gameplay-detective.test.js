import { expect, test } from '@playwright/test';
import { emptyDatabase, gameplayTestDbSetup, loginUser, joinGame, mockSubmitClue, mockSubmitEvidence, mockDefendEvidence, mockCompleteVotes, mockViewResults, mockViewScores, mockFinishRound } from './test-helpers'

let game;

test.describe('detective journey', () => {

    test.beforeAll(async () => {
        await emptyDatabase();
        game = await gameplayTestDbSetup();
    });

    test('detective can complete a round', async ({ page }, workerInfo) => {

        await loginUser({ page }, "dsmith@gmail.com", "abcd1234");
        await joinGame({ page }, game.code.toString());

        await page.screenshot({ path: `./test-results/gameplay-detective-s1.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'inform detectives' })).toBeVisible();
        await expect(page.getByText('Role: **********')).toBeVisible();
        await expect(page.getByText('Informant: David J.')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Waiting for the Informant to' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: 'Magnifying Glass Icon' }).click();
        await expect(page.getByText('Role: Detective')).toBeVisible();
        await expect(page.getByText('Role: **********')).not.toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-detective-s1-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);
        
        await mockSubmitClue(game);
        await page.screenshot({ path: `./test-results/gameplay-detective-s2.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'submit evidence' })).toBeVisible();
        await expect(page.getByText('Role: **********')).toBeVisible();
        await expect(page.getByText('Informant: David J.')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Waiting for all players to play' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: 'Magnifying Glass Icon' }).nth(1).click();
        await expect(page.getByText('Clue: clue')).toBeVisible();
        await expect(page.getByText('Clue: **********')).not.toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-detective-s2-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);

        await mockSubmitEvidence(game);
        await page.screenshot({ path: `./test-results/gameplay-detective-s3.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'defend evidence' })).toBeVisible();
        await expect(page.getByText('Role: **********')).toBeVisible();
        await expect(page.getByText('Informant: David J.')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Waiting for all players to defend' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-detective-s3-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);

        await mockDefendEvidence(game);
        await page.screenshot({ path: `./test-results/gameplay-detective-s4a.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'vote on conspirator' })).toBeVisible();
        await expect(page.getByText('Role: **********')).toBeVisible();
        await expect(page.getByText('Informant: David J.')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Select a player' })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Salley F.' })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Alice P.' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.locator('label').filter({ hasText: 'Salley F.' }).click();
        await page.screenshot({ path: `./test-results/gameplay-detective-s4b.${workerInfo.project.name}.png` });
        await page.getByRole('button', { name: 'Submit' }).click();

        await page.screenshot({ path: `./test-results/gameplay-detective-s4c.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'vote on conspirator' })).toBeVisible();
        await expect(page.getByText('Role: **********')).toBeVisible();
        await expect(page.getByText('Informant: David J.')).toBeVisible();
        await expect(page.getByText('Clue: **********')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Your vote has been submitted.' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Once all players have voted ' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-detective-s4-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);

        await mockCompleteVotes(game);
        await mockViewResults(game);
        // await page.getByRole('button', { name: 'Proceed to next stage.' }).click();
        await page.screenshot({ path: `./test-results/gameplay-detective-s5.${workerInfo.project.name}.png` });
        await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'view results' })).toBeVisible();
        await expect(page.getByText('Role: Informant')).not.toBeVisible();
        await expect(page.getByText('Clue: **********')).not.toBeVisible();
        await expect(page.getByText('David J.')).toBeVisible();
        await expect(page.getByText('Salley F.')).toBeVisible();
        await expect(page.getByText('David S.')).toBeVisible();
        await expect(page.getByText('Alice P.')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Finish Round' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-detective-s5-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);

        await mockViewScores(game);

        await page.screenshot({ path: `./test-results/gameplay-detective-s6.${workerInfo.project.name}.png` });
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
        await expect(page.getByRole('heading', { name: 'Please wait for the host to ' })).toBeVisible();
        await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

        await page.getByRole('button', { name: '[+]   Help' }).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `./test-results/gameplay-detective-s6-help.${workerInfo.project.name}.png` });

        await page.getByRole('button', { name: '[-]   Help' }).click();
        await page.waitForTimeout(1000);

        await mockFinishRound(game);

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
