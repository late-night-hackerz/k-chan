import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { newPostFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { check } from '$lib/funcs/auth';

export const load: PageServerLoad = async ({ cookies }) => {
	const authCookie = cookies.get('auth');
	const loggedIn = authCookie ? await check(authCookie) : false;

	if (!loggedIn) {
		redirect(302, '/');
	}

	return {
		form: await superValidate(zod(newPostFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(newPostFormSchema));
		console.log(form.data);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return {
			form
		};
	}
};
