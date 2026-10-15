import type { CollectionEntry } from 'astro:content';

const normalize = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Maps every spelling of a lab member's name (name + aliases) to their person id. */
export function buildAuthorIndex(people: CollectionEntry<'people'>[]) {
  const index = new Map<string, string>();
  for (const p of people) {
    // First entry wins, so a second record for the same person (e.g. an earlier degree) doesn't take over the link
    for (const n of [p.data.name, ...p.data.aliases]) {
      const key = normalize(n);
      if (!index.has(key)) index.set(key, p.id);
    }
  }
  return (author: string) => index.get(normalize(author));
}
