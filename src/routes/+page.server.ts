import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { accessFormSchema } from './schema';
import { client } from '$lib/api';
import { check, login } from '$lib/funcs/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const authCookie = cookies.get('auth');
	const loggedIn = authCookie ? await check(authCookie) : false;

	if (loggedIn) {
		redirect(302, '/feed');
	}

	return {
		form: await superValidate(zod(accessFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(accessFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
				emailSent: false
			});
		}

		const email = form.data.email;
		const { data, error } = await login(email);
		if (error) {
			// TODO: show error in client
			console.error(error);
			return fail(400, {
				form,
				emailSent: false
			});
		}

		return {
			form,
			emailSent: true
		};
	}
};
