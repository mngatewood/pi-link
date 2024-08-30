import { expect, test } from '@playwright/test';
import {
	emptyDatabase,
	gameplayTestDbSetup,
	loginUser,
	joinGame,
	mockCompleteVotes
} from './test-helpers';

let game;

test.describe('clue validation', () => {
	test.beforeAll(async () => {
		await emptyDatabase();
		game = await gameplayTestDbSetup();
	});

	test('informer can only enter one word of 20 characters or less', async ({ page }, workerInfo) => {
		await loginUser({ page }, 'djones@gmail.com', '1234abcd');
		await joinGame({ page }, game.code.toString());

		await page.screenshot({
			path: `./test-results/clue-validation-1.${workerInfo.project.name}.png`
		});
		await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'inform detectives' })).toBeVisible();
		await expect(page.getByText('Role: Informant')).toBeVisible();
		await expect(page.getByPlaceholder('Enter Clue')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Clear' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
		await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();

		await page.getByPlaceholder('Enter Clue').fill('invalid clue');
		await page.getByRole('button', { name: 'Submit' }).click();
		await page.screenshot({
			path: `./test-results/clue-validation-2.${workerInfo.project.name}.png`
		});
		await expect(page.getByRole('heading', { name: 'inform detectives' })).toBeVisible();

		await page.getByPlaceholder('Enter Clue').fill('supercalifragilisticexpialidocious');
		await page.screenshot({
			path: `./test-results/clue-validation-3.${workerInfo.project.name}.png`
		});
		await expect(page.getByPlaceholder('Enter Clue')).toHaveValue("supercalifragilistic")

		await page.getByPlaceholder('Enter Clue').fill('valid-clue');
		await page.getByRole('button', { name: 'Submit' }).click();
		await expect(page.getByRole('heading', { name: 'Round One' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'submit evidence' })).toBeVisible();
		await expect(page.getByText('Role: Informant')).toBeVisible();
		await expect(page.getByText('Clue: **********')).toBeVisible();
		await expect(page.getByRole('button', { name: 'All players have played two' })).toBeVisible();
		await expect(page.getByRole('button', { name: '[+]   Help' })).toBeVisible();
	});
});
