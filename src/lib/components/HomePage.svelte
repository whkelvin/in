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
		addBookmark(
			'Notion Developer Notes',
			'https://www.notion.so/Developer-Notes-1130e35001fb80a48eddc045bf20ee42'
		);
		addBookmark('Gmail', 'https://mail.google.com/mail/u/0/#inbox');
		addBookmark('LinkedIn', 'https://www.linkedin.com/feed/');
		addBookmark(
			'Google Wallet Console',
			'https://pay.google.com/business/console/u/1/products/passes/BCR2DN4T2P47N437'
		);
		addBookmark(
			'Google Cloud Console',
			'https://console.cloud.google.com/welcome?project=classifii-dev'
		);
		addBookmark(
			'Classifii Invoices',
			'https://www.notion.so/cb4d8334bb8640d9a7185eed944ced5e?v=11533439c9bf4985b02403d6bbad455a'
		);
		addBookmark(
			'Classifii Timesheet',
			'https://docs.google.com/spreadsheets/d/1edlQIwYt5JY_7Z5I9PyEC-ajlea_0z5Y9FsTUXnoBAc/edit?gid=0#gid=0'
		);
		addBookmark('ChatGPT', 'https://chatgpt.com/');
		addBookmark('Calude', 'https://claude.ai/new');
		addBookmark(
			'Cpanel',
			'https://sv70.ifastnet.com:2083/cpsess8060342479/frontend/jupiter/index.html?login=1&post_login=55101796439551'
		);
		addBookmark(
			'Cpanel Files',
			'https://sv70.ifastnet.com:2083/cpsess8060342479/frontend/jupiter/filemanager/index.html'
		);
		addBookmark(
			'Wordpress',
			'https://sv70.ifastnet.com:2083/cpsess8060342479/frontend/jupiter/softaculous/index.live.php?act=wordpress'
		);
		addBookmark('Classifii', 'https://classifii.com');
		addBookmark(
			'Figma',
			'https://www.figma.com/design/q117SVTDDDuA37C8BgtFgJ/Kelendy?node-id=0-1&node-type=canvas&t=fF4Ju0SqRABYIjrt-0'
		);
		addBookmark('Shadcn', 'https://next.shadcn-svelte.com');
		addBookmark('Lucide', 'https://lucide.dev/icons/');
		addBookmark('Calendar', 'https://calendar.google.com/calendar/u/0/r');
		addBookmark('Messenger', 'https://www.messenger.com/e2ee/t/8778745138839838/');
		addBookmark('YIZY', 'https://yizy.rootxsnowstudio.com');
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
