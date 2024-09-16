<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { newPostFormSchema, type NewPostFormSchema } from './schema';
	import { Input } from '$lib/components/ui/input';

	export let data: SuperValidated<Infer<NewPostFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(newPostFormSchema)
		// onSubmit: ({ formData }) => {
		// 	console.log(formData);
		// }
	});

	const POST_TYPES = ['text', 'image'];

	const { form: formData, enhance } = form;

	$: selectedType = $formData.type
		? {
				label: $formData.type,
				value: $formData.type
			}
		: undefined;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="type">
		<Form.Control let:attrs>
			<Form.Label>Type</Form.Label>
			<Select.Root
				selected={selectedType}
				onSelectedChange={(v) => {
					v && ($formData.type = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="What type of post?" />
				</Select.Trigger>
				<Select.Content>
					{#each POST_TYPES as postType}
						<Select.Item value={postType}>{postType}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.type} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- {#if $formData.type === 'image'} -->
	<!-- <Form.Field {form} name="file">
		<Form.Control let:attrs>
			<Form.Label>Upload an Image</Form.Label>
			<Input type="file" {...attrs} bind:value={$formData.file} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field> -->
	<!-- {/if} -->

	<Form.Field {form} name="content">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea
				{...attrs}
				placeholder="Spill your heart out!"
				bind:value={$formData.content as string}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Post!</Form.Button>
</form>
