<script>
	import FeedCard from './feed-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';

	const POST_TYPES = ['rant', 'confession', 'opinion', 'type1', 'type2', 'type3', 'type4'];
</script>

<header class="sticky top-0 flex w-full flex-col border-b border-input bg-background pt-4">
	<div class="flex justify-center px-4">
		<a
			class={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-xl rounded-full py-5')}
			href="/new-post"
		>
			New Post
		</a>
	</div>

	<div class="pt-4">
		<ScrollArea class="flex w-full flex-col items-start pb-3" orientation="horizontal">
			<div class="flex px-4">
				<ToggleGroup.Root type="multiple">
					{#each POST_TYPES as postType}
						<ToggleGroup.Item value={postType} class="rounded-full text-muted-foreground">
							#{postType}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>
		</ScrollArea>
	</div>
</header>

<ScrollArea class="h-[calc(100dvh-121px)] px-4">
	<div class="flex flex-col gap-4 py-6">
		<FeedCard />
		<FeedCard />
		<FeedCard />
	</div>
</ScrollArea>
