import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.baseToken) {
		locals.pb.authStore.clear();
	}
	throw redirect(307, '/');
};
