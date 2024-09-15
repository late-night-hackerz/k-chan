<script lang="ts">
	import type { PageData } from './$types';
	import AccessForm from './access-form.svelte';

	export let data: PageData;
</script>

<main class="flex h-[100dvh] flex-col justify-center">
	<AccessForm data={data.form} />
</main>
