<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import AccessForm from './access-form.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: console.log(form?.emailSent);
</script>

<main class="flex h-[100dvh] flex-col justify-center">
	<AccessForm data={data.form} />
</main>
