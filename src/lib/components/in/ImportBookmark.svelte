<script lang="ts">
	interface Bookmark {
		title: string;
		url: string;
	}
	import * as Dialog from '$lib/components/ui/dialog';

	let isOpen = $state(false);

	export function open() {
		isOpen = true;
		onOpenChange(isOpen);
	}
	export function close() {
		isOpen = false;
		onOpenChange(isOpen);
	}

	let {
		onOpenChange
	}: {
		onOpenChange: (val: boolean) => void;
	} = $props();

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			close();
		}

		event.stopPropagation();
	}

	function readHtmlFile(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			if (!file.type || file.type !== 'text/html') {
				return reject(new Error('Invalid file type. Please upload an HTML file.'));
			}

			const reader = new FileReader();

			reader.onload = () => {
				if (reader.result) {
					resolve(reader.result.toString());
				} else {
					reject(new Error('FileReader result is empty.'));
				}
			};

			reader.onerror = () => {
				reject(new Error('An error occurred while reading the file.'));
			};

			reader.readAsText(file);
		});
	}

	const bookmarks: Bookmark[] = $state([]);

	function extractLinks(dlElement: HTMLDListElement): void {
		Array.from(dlElement.children).forEach((child) => {
			if (child.tagName === 'DT') {
				const dtElement = child as HTMLElement;

				const anchorElement = dtElement.querySelector('A');
				if (anchorElement) {
					bookmarks.push({
						title: anchorElement.textContent || 'Unnamed Bookmark',
						url: (anchorElement as HTMLAnchorElement).href
					});
				}

				const nestedDl = dtElement.querySelector('DL');
				if (nestedDl) {
					extractLinks(nestedDl as HTMLDListElement);
				}
			}
		});
	}

	function parseChromeBookmarksFlat(htmlContent: string): { title: string; url: string }[] {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlContent, 'text/html');
		const rootDL = doc.querySelector('DL');
		if (!rootDL) {
			throw new Error('Invalid Chrome bookmarks HTML format.');
		}
		extractLinks(rootDL as HTMLDListElement);
		return bookmarks;
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="px-4 pb-2 pt-0" onkeydown={onKeyDown}>
		<div class="flex flex-col pb-2">
			<div class="mt-0 flex">
				<div
					class="mx-auto bg-primary px-4 py-1 text-center text-sm font-black text-primary-foreground"
				>
					Import Bookmark
				</div>
			</div>
			<input
				type="file"
				id="fileInput"
				accept=".html"
				onchange={async (event) => {
					const input = event.target as HTMLInputElement;
					if (input.files && input.files[0]) {
						const file = input.files[0];
						const content = await readHtmlFile(file);
						const res = parseChromeBookmarksFlat(content);
					}
				}}
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
