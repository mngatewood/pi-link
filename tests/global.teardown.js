import { test as teardown } from '@playwright/test';
import PocketBase from 'pocketbase';
const pb = new PocketBase("http://127.0.0.1:8090");

const getAllUserIds = async () => {
    const allUsers = await pb.collection('users').getFullList({});
    return allUsers.map(user => user.id)
}

const deleteAllUsers = async () => {
    const userIds = await getAllUserIds();
    await Promise.all(userIds.map(async (userId) => {
        await pb.collection('users').delete(userId)
    }));
}

const getAllGameIds = async () => {
    const allGames = await pb.collection('games').getFullList({});
    return allGames.map(game => game.id)
}

const deleteAllGames = async () => {
    const gameIds = await getAllGameIds();
    await Promise.all(gameIds.map(async (gameId) => {
        await pb.collection('games').delete(gameId)
    }));
}

teardown('delete database', async ({ }) => {
    console.log('deleting test database...');

    const allGames = await getAllGameIds();
    const allUsers = await getAllUserIds();

    if (allGames.length) {
        await deleteAllGames();
    }

    if (allUsers.length) {
        await deleteAllUsers();
    }

});
