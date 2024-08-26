import { test as teardown } from '@playwright/test';
import { emptyDatabase } from './test-helpers';

teardown('delete database', async () => {
	emptyDatabase();
});
