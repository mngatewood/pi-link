import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(307, '/play');
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
			if (locals.pb.authStore.isValid) {
				throw redirect(303, '/');
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
};
