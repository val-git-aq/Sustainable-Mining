import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const theme = z.enum(['lithium', 'ree', 'phytomining', 'battery-recycling', 'gold', 'carbon', 'other']);

const people = defineCollection({
  loader: file('src/data/people.yaml'),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    aliases: z.array(z.string()).default([]),
    role: z.enum(['pi', 'postdoc', 'research-scientist', 'phd', 'ms', 'undergrad']),
    status: z.enum(['current', 'alumni']),
    position: z.string().optional(),
    affiliation: z.string().optional(),
    program: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
    project: z.string().optional(),
    note: z.string().optional(),
    awards: z.array(z.string()).default([]),
    nowAt: z.string().optional(),
    photo: z.string().optional(),
    order: z.number().default(9999),
    scholar: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    email: z.string().optional(),
    themes: z.array(theme).default([]),
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    title: z.string(),
    sponsor: z.string(),
    sponsorType: z.enum(['federal', 'industry', 'foundation']),
    year: z.number().int(),
    role: z.enum(['PI', 'Co-I']),
    status: z.enum(['active', 'completed']),
    themes: z.array(theme).min(1),
    summary: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    type: z.enum(['journal', 'under-review', 'proceedings', 'presentation']),
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    doi: z.string().optional(),
    corresponding: z.boolean().default(false),
    themes: z.array(theme).min(1),
    seq: z.number().default(9999),
  }),
});

const news = defineCollection({
  loader: file('src/data/news.yaml'),
  schema: z.object({
    kind: z.enum(['media', 'video', 'award', 'talk']),
    year: z.number().int(),
    outlet: z.string(),
    title: z.string(),
    link: z.string().url().optional(),
    // Image path under public/, used for video thumbnails
    thumbnail: z.string().optional(),
  }),
});

const sponsors = defineCollection({
  loader: file('src/data/sponsors.yaml'),
  schema: z.object({
    name: z.string(),
    short: z.string().optional(),
    note: z.string().optional(),
    group: z.enum(['sponsor', 'partner']),
    order: z.number().default(9999),
    logo: z.string().optional(),
    showName: z.boolean().default(false),
    url: z.string().url().optional(),
  }),
});

export const collections = { people, projects, publications, news, sponsors };
