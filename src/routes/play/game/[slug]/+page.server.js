import { error, redirect } from "@sveltejs/kit";

export const ssr = false;

const startGame = async (locals, gameId) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(307, '/login');
    } else {
        try {
            // get game data
            const game = await locals.pb.collection('games').getOne(gameId, {
                expand: 'players',
                fields: 'id, code, host, status, players, round, stage, playerRoles, playerOrder, clue, votes, votingCompleted, results, expand'
            });

            if (game?.players.length > 3) {

                // shuffle array of players
                const shuffle = (array) => {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                }; 
                const players = shuffle(game.players);

                // players go twice if less than 6
                const playerList = players.length < 6 ? [...players, ...players] : players
                // create object of players and play order
                const playerOrder = playerList.reduce((obj, el, index) => {
                        obj[index + 1] = el;
                        return obj;
                    }, {});

                // add player order object to game
                game.playerOrder = playerOrder

                return game;
            }
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            return {
                error: true,
                message: err.message
            }
        }
    }
}

const startRound = (game) => {
    // increment round
    game.round ++;

    // select informant based on turn order
    const informantId = game.playerOrder[game.round];

    // create object of remaining players
    const keys = [...Array(game.players.length).keys()].map(i => i + 1);
    const playerOrder = {}
    keys.forEach((key) => {
        if (game.playerOrder[key] != informantId) {
            playerOrder[key] = game.playerOrder[key]
        }
    })

    // assign roles to remaining players
    const playerKeys = Object.keys(playerOrder);
    const conspiratorKey = playerKeys[Math.floor(Math.random() * playerKeys.length)];
    const detectiveKeys = playerKeys.filter((key) => key != conspiratorKey);

    // // create object of player roles based on keys above
    let playerRoles = {};
    playerRoles[informantId] = "Informant";
    playerRoles[playerOrder[conspiratorKey]] = "Conspirator";
    detectiveKeys.forEach((key) => playerRoles[playerOrder[key]] = "Detective");

    // add playerRoles to game data and return
    game.playerRoles = playerRoles;
    return game;
}

export const load = async ({ locals, params }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(307, '/login');
    } else {
        try {
            // Fetch and return the game with the given id
            const gameId = params.slug;
            const game = await locals.pb.collection('games').getOne(gameId, {
                expand: 'players',
                fields: 'id, code, host, status, players, round, stage, playerRoles, playerOrder, clue, votes, votingCompleted, results, expand'
            });
            if (game && game.status == "ended") {
                throw redirect(307, '/play?ended=true')
            } else if (game) {
                return { game: game };
            } else {
                throw error(404, {
                    message: "Game not found.",
                });
            }
        } catch(err) {
            console.log('error', err);
            console.log('data', err.data);
            return {
                error: true,
                message: err.message
            }
        }
    }
}

export const actions = {
    start: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());

        // get game data and establish player order
        const startGameData = await startGame(locals, formData.gameId);

        // increment round and assign player roles
        const startRoundData = await startRound(startGameData);

        // update round, playerOrder, playerRoles, and status
        const data = {
            'status': "in-progress",
            'round': startRoundData.round,
            'stage': "inform detectives",
            'playerOrder': startRoundData.playerOrder,
            'playerRoles': startRoundData.playerRoles
        }
        try {
            const update = await locals.pb.collection('games').update(formData.gameId, data);
            if (update) {
                return {
                    success: true,
                    game: update,
                }
            }
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            return {
                error: true,
                message: err.message
            }
        }
    },

    remove: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const data = {
            'players-': [formData.playerId]
        }
        try {
            const update = await locals.pb.collection('games').update(formData.gameId, data);
            if (update) {
                return {
                    success: true,
                    game: update,
                }
            }
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            return {
                error: true,
                message: err.message
            }
        }
    },

    quit: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const data = {
            'players-': [formData.userId]
        }
        try {
            const update = await locals.pb.collection('games').update(formData.gameId, data);
            if (update) {
                return {
                    success: true,
                    game: update,
                }
            }
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            return {
                error: true,
                message: err.message
            }
        }
    },

    end: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const data = {
            'status': "ended"
        }
        try {
            const update = await locals.pb.collection('games').update(formData.gameId, data);
            if (update) {
                return {
                    success: true,
                    game: update,
                }
            }
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            return {
                error: true,
                message: err.message
            }
        }
    },

    submitClue:  async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isInformant) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {
            const data = {
                clue: formData.clue,
                stage: "submit evidence"
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    return {
                        success: true,
                        game: update,
                    }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }

        }
    },

    finishPlay: async ({request, locals}) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isInformant) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {
            const data = {
                stage: "defend evidence"
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    return {
                        success: true,
                        game: update,
                    }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    },

    finishDefense: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isInformant) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {
            const data = {
                stage: "vote on conspirator"
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    return {
                        success: true,
                        game: update,
                    }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    },

    submitVote: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isInformant) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {

            const vote = {[formData.userId]: formData.candidates};
            const votes = JSON.parse(formData.votes);
            const updatedVotes = {...votes, ...vote};
            const players = formData.players.split(',');
            const voters = Object.keys(updatedVotes);
            const votingCompleted = players.sort().join(',') == voters.sort().join(',');

            const data = {
                "votes": updatedVotes,
                "votingCompleted": votingCompleted,
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    return {
                        success: true,
                        game: update,
                    }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    },

    finishVoting: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isInformant) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {
            const round = formData.round;
            const votes = JSON.parse(formData.votes);
            const playerRoles = JSON.parse(formData.playerRoles);
            const informantId = Object.keys(playerRoles).find(key => playerRoles[key] == "Informant");
            const conspiratorId = Object.keys(playerRoles).find(key => playerRoles[key] == "Conspirator");
            const detectiveIds = Object.keys(playerRoles).filter(key => playerRoles[key] == "Detective");
            let results = JSON.parse(formData.results);
            
            results[round] = {};
            Object.keys(playerRoles).forEach((player) => {
                results[round][player] = 0;
                
            });

            detectiveIds.forEach((detectiveId) => {
                if (votes[detectiveId] == conspiratorId) {
                    results[round][detectiveId] = 3;
                }
            })
            
            const correctVotes = Object.values(votes).filter((vote) => vote == conspiratorId);
            if (correctVotes.length < 2) {
                results[round][conspiratorId] = 5;
                results[round][informantId] = 4;
            };

            const data = {
                stage: "view results",
                results: results,
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    return {
                        success: true,
                        game: update,
                    }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    },

    finishResults: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isInformant) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {
            let data
            data = {
                stage: "round end",
                playerRoles: null,
                clue: "",
                votingCompleted: false,
                votes: {},
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    return {
                        success: true,
                        game: update,
                    }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    },

    finishRound: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isHost) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {
            let data
            let game = {
                round: formData.round,
                playerOrder: JSON.parse(formData.playerOrder),
                players: JSON.parse(formData.players),
            }
            const startRoundData = await startRound(game);
            data = {
                stage: "inform detectives",
                round: startRoundData.round,
                playerRoles: startRoundData.playerRoles,
                players: startRoundData.players
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    return {
                        success: true,
                        game: update,
                    }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    },

    endGame: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        if (!formData.isHost) {
            throw error(500, {
                message: "Internal Server Error",
            });
        }
        else {
            const data = {
                status: "ended"
            }
            try {
                const update = await locals.pb.collection('games').update(formData.gameId, data);
                if (update) {
                    throw redirect(303, '/play');
                    // return {
                    //     success: true,
                    //     game: update,
                    // }
                }
            } catch (err) {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    },
}

