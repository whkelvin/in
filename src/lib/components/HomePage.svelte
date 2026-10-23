<svelte:options
	customElement={{
		tag: 'home-page',
		shadow: 'none'
	}}
/>

<script lang="ts">
	import '../../app.css';
	import BookmarksSearch from './in/BookmarksSearch.svelte';
	import UrlSearch from './in/UrlSearch.svelte';
	import Whichkey from './in/Whichkey.svelte';
	import KeywordSearch from './in/KeywordSearch.svelte';
	import ImportBookmark from './in/ImportBookmark.svelte';
	import { onMount } from 'svelte';
	import { addBookmark } from '$lib/state';

	let urlSearch: ReturnType<typeof UrlSearch>;
	let whichKey: ReturnType<typeof Whichkey>;
	let bookmarksSearch: ReturnType<typeof BookmarksSearch>;
	let keywordSearch: ReturnType<typeof KeywordSearch>;
	let importBookmark: ReturnType<typeof ImportBookmark>;

	let hasOpenDialog = $state(false);

	function onkeypress(event: KeyboardEvent) {
		switch (event.key) {
			case ' ':
				if (!hasOpenDialog) {
					whichKey.open();
				}
				break;
			default:
				break;
		}
	}

	onMount(() => {
		addBookmark('Github', 'https://github.com/');
		addBookmark('Gmail', 'https://mail.google.com/mail/u/0/#inbox');
		addBookmark('LinkedIn', 'https://www.linkedin.com/feed/');
		addBookmark('ChatGPT', 'https://chatgpt.com/');
		addBookmark('Calude', 'https://claude.ai/new');
		addBookmark(
			'Figma',
			'https://www.figma.com/design/q117SVTDDDuA37C8BgtFgJ/Kelendy?node-id=0-1&node-type=canvas&t=fF4Ju0SqRABYIjrt-0'
		);
		addBookmark('Shadcn', 'https://next.shadcn-svelte.com');
		addBookmark('Lucide', 'https://lucide.dev/icons/');
		addBookmark('Calendar', 'https://calendar.google.com/calendar/u/0/r');
		addBookmark('Messenger', 'https://www.messenger.com/e2ee/t/8778745138839838/');
		addBookmark('YIZY', 'yizy.dev');
		addBookmark('Youtube', 'https://youtube.com');
	});
</script>

<UrlSearch
	bind:this={urlSearch}
	onOpenChange={(val) => {
		hasOpenDialog = val;
	}}
/>
<BookmarksSearch
	bind:this={bookmarksSearch}
	onOpenChange={(val) => {
		hasOpenDialog = val;
	}}
/>
<KeywordSearch
	bind:this={keywordSearch}
	onOpenChange={(val) => {
		hasOpenDialog = val;
	}}
/>
<ImportBookmark
	bind:this={importBookmark}
	onOpenChange={(val) => {
		hasOpenDialog = val;
	}}
/>

<Whichkey
	bind:this={whichKey}
	onBookmarkSearchSelected={() => {
		whichKey.close();
		bookmarksSearch.open();
	}}
	onUrlSearchSelected={() => {
		whichKey.close();
		urlSearch.open();
	}}
	onKeywordSearchSelected={async () => {
		whichKey.close();
		keywordSearch.open();
	}}
	onImportBookmarkSelected={() => {
		whichKey.close();
		importBookmark.open();
	}}
/>

<svelte:window {onkeypress} />
