import { test as teardown } from '@playwright/test';
import { emptyDatabase } from './test-helpers';
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

teardown('delete database', async ({}) => {
	emptyDatabase();
});
