import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { accessFormSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(accessFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(accessFormSchema));
		const email = form.data.email;

		console.log(email);

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
