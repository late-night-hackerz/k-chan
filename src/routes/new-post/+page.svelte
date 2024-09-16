<script lang="ts">
	import type { PageData } from './$types';
	import NewPostForm from './new-post-form.svelte';

	export let data: PageData;
</script>

<main class="flex flex-col px-4 py-6">
	<NewPostForm data={data.form} />
</main>
