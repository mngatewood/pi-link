import { redirect } from '@sveltejs/kit';

export async function load({ cookies, locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(307, '/login');
	} else {
		try {
			const userId = locals.pb.authStore.model.id;
			const games = await locals.pb
				.collection('games')
				.getFullList({ fields: 'code', filter: 'status = "not-started"' });
			const currentCodes = games.map((game) => game.code);
			let invitationCode = Math.floor(Math.random() * 9999) + 1;

			// Increment the code if it is already in use
			while (currentCodes.includes(invitationCode)) {
				invitationCode++;
			}

			// Create new game with the current user and code
			try {
				const data = {
					code: invitationCode,
					host: userId,
					status: 'not-started',
					players: [userId]
				};

				const game = await locals.pb.collection('games').create(data);

				if (game) {
					return {
						code: invitationCode,
						gameId: game.id
					};
				} else {
					return {
						error: true,
						message: 'Could not create game'
					};
				}
			} catch (err) {
				console.log('error', err);
				console.log('data', err.data);
				return {
					error: true,
					message: err.message
				};
			}
		} catch (err) {
			console.log('error', err);
			console.log('data', err.data);
			return {
				error: true,
				message: err.message
			};
		}
	}
}
