<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { accessFormSchema, type AccessFormSchemaType } from './schema';

	export let data: SuperValidated<Infer<AccessFormSchemaType>>;

	const form = superForm(data, {
		validators: zodClient(accessFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex w-full flex-col">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Input {...attrs} placeholder="Enter your E-mail..." class="" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button type="submit" variant="secondary" class="flex gap-3">
		Send me the link
		<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
			/>
		</svg>
	</Form.Button>
</form>
