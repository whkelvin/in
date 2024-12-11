import { readonly, writable } from "svelte/store";

interface Bookmark {
  name: string;
  url: string;
}

const _bookmarks = writable<Bookmark[]>([]);
export const bookmarks = readonly(_bookmarks);

export function addBookmark(name: string, url: string) {
  _bookmarks.update((b: Bookmark[]) => {
    b.push({ name: name, url: url });
    return b;
  });
}

export function removeBookmark(name: string) {
  _bookmarks.update((b: Bookmark[]) => {
    b = b.filter((b) => b.name != name);
    return b;
  });
}

export function addBookmarksFromHtml(bookmarksHtml: string) {
  const res = parseChromeBookmarksFlat(bookmarksHtml);
  _bookmarks.update((b) => {
    b = b.concat(res);
    return b;
  });
}

function extractLinks(dlElement: HTMLDListElement): Bookmark[] {
  const bookmarks: Bookmark[] = [];
  Array.from(dlElement.children).forEach((child) => {
    if (child.tagName === "DT") {
      const dtElement = child as HTMLElement;

      const anchorElement = dtElement.querySelector("A");
      if (anchorElement) {
        bookmarks.push({
          name: anchorElement.textContent || "Unnamed Bookmark",
          url: (anchorElement as HTMLAnchorElement).href,
        });
      }

      const nestedDl = dtElement.querySelector("DL");
      if (nestedDl) {
        extractLinks(nestedDl as HTMLDListElement);
      }
    }
  });
  return bookmarks;
}

function parseChromeBookmarksFlat(
  htmlContent: string,
): Bookmark[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const rootDL = doc.querySelector("DL");
  if (!rootDL) {
    throw new Error("Invalid Chrome bookmarks HTML format.");
  }
  return extractLinks(rootDL as HTMLDListElement);
}
