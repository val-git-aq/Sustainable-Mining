import type { CollectionEntry } from 'astro:content';

/** Newest year first; within a year, keep the order the CV lists them in. */
export const byRecent = (a: CollectionEntry<'publications'>, b: CollectionEntry<'publications'>) =>
  b.data.year - a.data.year || a.data.seq - b.data.seq;
