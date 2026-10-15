# Sustainable Mining Lab website

The website of the Sustainable Mining Lab (PI: Dr. Ehsan Vahidi), Department of Mining and Metallurgical Engineering,
University of Nevada, Reno. It is built with [Astro](https://astro.build) and published to GitHub Pages.

**You don't need to write code to update the site.** Almost everything lives in four text files in `src/data/`.

## Updating content

| To change… | Edit | Notes |
|---|---|---|
| People (new students, graduations, "now at") | `src/data/people.yaml` | To graduate someone, change `status: current` to `status: alumni` and add `end:` and `nowAt:`. |
| Sponsored projects | `src/data/projects.yaml` | `status: active` or `completed`. Do not add funding amounts. |
| Publications | `src/data/publications.yaml` | Copy an existing entry. `id` must be unique; `seq` controls order within a year (lower = first). |
| News, awards, talks | `src/data/news.yaml` | `kind: media`, `award` or `talk`. `link:` is optional. |
| Research-area text | `src/lib/themes.ts` | The `AREAS` list holds the text for the Lithium, Rare Earth Elements, Phytomining and Other pages. |
| Contact details | `src/lib/site.ts` | Email, office phone and address. |

**Theme tags** (`themes:` in every file): `lithium`, `ree`, `phytomining`, `battery-recycling`, `gold`, `carbon`, `other`.
They decide which research page an item appears on.

**Lab authors are highlighted automatically.** If someone publishes under a different spelling, add it to their `aliases:`
in `people.yaml` (for example `aliases: [Seyedkamal Mousavinezhad]`).

### Adding photos

1. Save a square photo (about 400×400 px, JPG) in `public/images/team/`, for example `kamal-mousavi.jpg`.
2. Add `photo: kamal-mousavi.jpg` to that person in `people.yaml`.

Without a photo, the person's initials are shown.

YAML tip: indentation matters (use spaces, not tabs), and wrap text in quotes if it contains a colon (`:`).

## Running it locally

Requires [Node.js](https://nodejs.org) 22.12 or newer.

```sh
npm install
npm run dev      # preview at http://localhost:4321
npm run build    # production build into dist/ (also validates all data files)
```

If a data file has a mistake, `npm run build` stops and tells you which entry and field is wrong.

## Publishing

Every push to the `main` branch rebuilds and publishes the site through `.github/workflows/deploy.yml`.
One-time setup in the GitHub repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The site is then served at `https://<account>.github.io/<repository>/`.

## Project layout

```
src/
  data/          content (people, projects, publications, news)
  lib/           site settings, research-area text, helpers
  components/    header, footer, hero illustration, list items
  layouts/       page shell
  pages/         one file per page (research/[area].astro builds the four research pages)
  styles/        global.css: colours, type and spacing tokens (light and dark mode)
public/          favicon and images
```
