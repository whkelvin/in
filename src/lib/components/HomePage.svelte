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
		console.log('keypress, dialog already opened?' + hasOpenDialog);

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

	function onDialogOpenChanged(open: boolean) {
		if (open) {
			console.log('dialog is open');
			hasOpenDialog = true;
		} else {
			console.log('dialog is close');
			hasOpenDialog = false;
		}
	}
</script>

<UrlSearch
	bind:this={urlSearch}
	onOpenChange={(val: boolean) => {
		onDialogOpenChanged(val);
	}}
/>
<BookmarksSearch
	bind:this={bookmarksSearch}
	onOpenChange={(val: boolean) => {
		onDialogOpenChanged(val);
	}}
/>
<KeywordSearch
	bind:this={keywordSearch}
	onOpenChange={(val: boolean) => {
		onDialogOpenChanged(val);
	}}
/>
<Whichkey
	bind:this={whichKey}
	onBookmarkSearchSelected={() => {
		bookmarksSearch.open();
	}}
	onUrlSearchSelected={() => {
		urlSearch.open();
	}}
	onKeywordSearchSelected={() => {
		keywordSearch.open();
	}}
	onOpenChange={(val: boolean) => {
		onDialogOpenChanged(val);
	}}
/>

<svelte:window {onkeypress} />
