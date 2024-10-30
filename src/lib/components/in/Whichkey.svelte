<svelte:options />

<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	let {
		onUrlSearchSelected,
		onBookmarkSearchSelected,
		onKeywordSearchSelected,
		onOpenChange
	}: {
		onUrlSearchSelected: () => void;
		onBookmarkSearchSelected: () => void;
		onKeywordSearchSelected: () => void;
		onOpenChange: (val: boolean) => void;
	} = $props();

	let isOpen = $state(false);

	export function open() {
		if (isOpen === false) {
			isOpen = true;
			onOpenChange(isOpen);
		}
	}
	export function close() {
		if (isOpen === true) {
			isOpen = false;
			onOpenChange(isOpen);
		}
	}

	function onSpecialKeyPress(event: KeyboardEvent) {
		if (event.key === '/') {
			isOpen = false;
			event.stopPropagation();
			onKeywordSearchSelected();
		}

		if (event.key === 'u') {
			isOpen = false;
			event.stopPropagation();
			onUrlSearchSelected();
		}

		if (event.key === 'b') {
			isOpen = false;
			event.stopPropagation();
			onBookmarkSearchSelected();
		}
	}
</script>

<Dialog.Root bind:open={isOpen} {onOpenChange}>
	<Dialog.Content class="border-none  px-4 pb-2 pt-0 outline-none" onkeypress={onSpecialKeyPress}>
		<div class="flex flex-col pb-2">
			<div class="mt-0 flex">
				<div
					class="mx-auto bg-primary px-4 py-1 text-center text-sm font-black text-primary-foreground"
				>
					Which Key?
				</div>
			</div>
			<ul>
				<li>/ for search</li>
				<li>u to navigate to url</li>
				<li>b to go to book marks</li>
			</ul>
		</div>
	</Dialog.Content>
</Dialog.Root>
