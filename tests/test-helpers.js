import PocketBase from 'pocketbase';

const pb = new PocketBase("http://127.0.0.1:8090");

const users = [
    {
        firstname: 'David',
        lastname: 'Jones',
        email: 'djones@gmail.com',
        password: '1234abcd',
        passwordConfirm: '1234abcd',
        username: "djones" + Math.random().toString(36).slice(2, 6),
    },
    {
        firstname: 'Salley',
        lastname: 'Fields',
        email: 'sfields@gmail.com',
        password: '5678efgh',
        passwordConfirm: '5678efgh',
        username: "sfields" + Math.random().toString(36).slice(2, 6),
    },
    {
        firstname: 'David',
        lastname: 'Smith',
        email: 'dsmith@gmail.com',
        password: 'abcd1234',
        passwordConfirm: 'abcd1234',
        username: "dsmith" + Math.random().toString(36).slice(2, 6),
    },
    {
        firstname: 'Alice',
        lastname: 'Park',
        email: 'apark@gmail.com',
        password: 'efgh5678',
        passwordConfirm: 'efgh5678',
        username: "apark" + Math.random().toString(36).slice(2, 6),
    },
]

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

export const emptyDatabase = async () => {
    console.log('deleting test database...');

    const allGames = await getAllGameIds();
    const allUsers = await getAllUserIds();

    if (allGames.length) {
        await deleteAllGames();
    }

    if (allUsers.length) {
        await deleteAllUsers();
    }

}

export async function registerUser ( { page }, first, last, email, password ) {
    await page.goto('/logout');
    await page.goto('/register');
    await page.getByTestId('register-firstname').fill(first);
    await page.getByTestId('register-lastname').fill(last);
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.waitForTimeout(500);
    await page.getByLabel('Confirm Password*').fill(password);
    await page.getByRole('button', { name: 'Sign Up' }).click();
    return;
}

export async function loginUser ( { page }, email, password ) {
    await page.goto('logout');
    await page.goto('login');
    await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Log In' }).click();
    return;
};

export async function registerLoginUser ( { page }, first, last, email, password ) {
    await registerUser( { page }, first, last, email, password );
    await page.waitForTimeout(500);
    await loginUser( { page }, email, password );
    return;
};

async function logoutUser ({ page }) {
    await page.goto('logout');
    return;
};

export async function hostGame ({ page }) {
    await page.goto('play');
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'Host a Game' }).click();

    const code = await page.locator("#host-code").innerText()

    await page.getByRole('link', { name: "Continue" }).click();
    await logoutUser({ page });
    return code;
};

export async function joinGame ({ page }, gameCode ) {
    await page.getByRole('link', { name: 'Join a Game' }).click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Enter Code').fill(gameCode);
    await page.getByRole('button', { name: 'Join' }).click();
    await page.waitForTimeout(500);
    return page.url().split("/").slice(-1)[0];
};

export async function startGame ({ page }) {
    await registerLoginUser({ page }, "David", "Jones", "djones@gmail.com", "1234abcd");
    await page.waitForTimeout(500);
    const gameCode = await hostGame({ page });
    await registerLoginUser({ page }, "Sally", "Fields", "sfields@gmail.com", "5678efgh");
    await joinGame({ page }, gameCode);
    await logoutUser({ page });
    await registerLoginUser({ page }, "David", "Smith", "dsmith@gmail.com", "abcd1234");
    await joinGame({ page }, gameCode);
    await logoutUser({ page });
    await registerLoginUser({ page }, "Alice", "Park", "apark@gmail.com", "efgh5678");
    await joinGame({ page }, gameCode);
    await logoutUser({ page });
    await page.waitForTimeout(500);
    await loginUser({ page }, "djones@gmail.com", "1234abcd");
    await joinGame({ page }, gameCode);
    await page.getByRole('button', { name: 'Start' }).click();
    return;
}

export async function gameplayTestDbSetup () {
    let gameData = {
        code: '1234',
        players: new Array(),
        status: "in-progress",
        round: 1,
        stage: "inform detectives",
        host: "",
        playerOrder: {},
        playerRoles: {},
    }
    for (const user of users) {
        const dbUser = await pb.collection('users').create(user);
        gameData.players.push(dbUser.id)
    };
    gameData.host = gameData.players[0];
    gameData.playerOrder = {
        "1": gameData.players[0],
        "2": gameData.players[1],
        "3": gameData.players[2],
        "4": gameData.players[3],
        "5": gameData.players[0],
        "6": gameData.players[1],
        "7": gameData.players[2],
        "8": gameData.players[3],
    }
    gameData.playerRoles = {
        [gameData.players[0]] : "Informant",
        [gameData.players[1]] : "Conspirator",
        [gameData.players[2]] : "Detective",
        [gameData.players[3]] : "Detective",
    }

    const game = await pb.collection('games').create(gameData);
    return game;
}

export async function mockCompleteVotes(game) {
    const voters = game.players.filter((userId) => userId != game.playerOrder["1"])
    let votes = {};

    voters.forEach(voter => {
        const vote = voters.filter((userId) => userId != voter)[0];
        votes[voter] = vote;
    });

    const update = await pb.collection('games').update(game.id, {votes: votes, votingCompleted: true});
    return update;
}

export async function mockSubmitClue(game) {
    const data = {
        clue: "clue",
        stage: "submit evidence"
    }
    const update = await pb.collection('games').update(game.id, data);
    return update;
}

export async function mockSubmitEvidence(game) {
    const data = {
        stage: "defend evidence"
    }
    const update = await pb.collection('games').update(game.id, data);
    return update;
}

export async function mockDefendEvidence(game) {
    const data = {
        stage: "vote on conspirator"
    }
    const update = await pb.collection('games').update(game.id, data);
    return update;
}

export async function mockViewResults(game) {
    const data = {
        stage: "view results",
        results: {
            1: {
                [game.players[0]]: 0,
                [game.players[1]]: 0,
                [game.players[2]]: 3,
                [game.players[3]]: 3,
            }
        }
    }
    const update = await pb.collection('games').update(game.id, data);
    return update;
}

export async function mockViewScores(game) {
    const data = {
        stage: "round end",
        playerRoles: null,
        clue: "",
        votingCompleted: false,
        votes: {},
    }
    const update = await pb.collection('games').update(game.id, data);
    return update;
}

export async function mockFinishRound(game) {
    const data = {
        stage: "inform detectives",
        round: 2,
        playerRoles: {
            [game.players[0]]: "Detective",
            [game.players[1]]: "Informant",
            [game.players[2]]: "Detective",
            [game.players[3]]: "Conspirator",
        }
    }
    const update = await pb.collection('games').update(game.id, data);
    return update;
}
