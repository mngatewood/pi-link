import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(307, '/play');
    }
}

export const actions = {
    default: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const code = formData.code;
        const userId = locals.pb.authStore.model.id;

        try {
            // Find the game with the given code
            const game = await locals.pb.collection('games').getFirstListItem( `code = "${code}"` );

            // Add the player to the game
            const data = {
                'players+': [userId]
            }

            try {
                const update = await locals.pb.collection('games').update(game.id, data);
                if(update) {
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

        } catch (err) {
            if(err.status == 404) {
                return {
                    error: true,
                    message: `No game found with code '${code}'.  Please try again.`
                }
            } else {
                console.log('error', err);
                console.log('data', err.data);
                return {
                    error: true,
                    message: err.message
                }
            }
        }
    }
}
