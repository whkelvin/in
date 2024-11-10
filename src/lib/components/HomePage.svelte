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

	let urlSearch: ReturnType<typeof UrlSearch>;
	let whichKey: ReturnType<typeof Whichkey>;
	let bookmarksSearch: ReturnType<typeof BookmarksSearch>;
	let keywordSearch: ReturnType<typeof KeywordSearch>;

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
		event.stopPropagation();
	}
</script>

<UrlSearch bind:this={urlSearch} />
<BookmarksSearch bind:this={bookmarksSearch} />
<KeywordSearch bind:this={keywordSearch} />
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
/>

<svelte:window {onkeypress} />
