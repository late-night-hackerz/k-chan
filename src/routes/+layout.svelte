<script>
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';

	const queryClient = new QueryClient();

	const POST_TYPES = ['rant', 'confession', 'opinion'];
</script>

<QueryClientProvider client={queryClient}>
	<header class="sticky top-0 flex w-full flex-col border-b border-input bg-background pt-3">
		<div class="px-4">
			<a
				class={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-full py-7')}
				href="/new-post"
			>
				New Post
			</a>
		</div>

		<div class="pt-4">
			<ScrollArea class="flex w-full flex-col items-start pb-3" orientation="horizontal">
				<ToggleGroup.Root type="multiple">
					{#each POST_TYPES as postType}
						<ToggleGroup.Item value={postType} class="rounded-full text-muted-foreground">
							#{postType}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</ScrollArea>
		</div>
	</header>

	<main class="flex flex-col gap-3 px-4 py-4">
		<slot></slot>
	</main>
</QueryClientProvider>
