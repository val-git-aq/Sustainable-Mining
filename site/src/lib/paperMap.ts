import type { CollectionEntry } from 'astro:content';
import { AREAS, type ThemeColor, type ThemeTag } from './themes';

// Builds the "paper network" on the home page: one dot per journal paper, grouped into one
// constellation per research area, with lines between papers that share a lab author.
// Everything is computed at build time, so the layout is the same on every visit.

export interface MapCluster {
  slug: string;
  name: string;
  /** Shorter name for the narrow phone layout */
  short: string;
  color: ThemeColor;
  count: number;
  x: number;
  y: number;
  labelY: number;
}
export interface MapNode {
  id: string;
  cluster: string;
  color: ThemeColor;
  x: number;
  y: number;
  r: number;
  glow: number;
  newest: boolean;
  title: string;
  venue: string;
  year: number;
  authors: string[];
  labAuthors: string[];
  href?: string;
}
export interface MapLayout {
  width: number;
  height: number;
  clusters: MapCluster[];
  nodes: MapNode[];
  edges: [number, number][];
}

// A paper with several tags joins the most specific area first
const PRIORITY: { slug: string; tags: ThemeTag[] }[] = [
  { slug: 'phytomining', tags: ['phytomining'] },
  { slug: 'battery-recycling', tags: ['battery-recycling'] },
  { slug: 'rare-earth-elements', tags: ['ree'] },
  { slug: 'lithium', tags: ['lithium'] },
  { slug: 'other-areas', tags: ['gold', 'carbon', 'nickel', 'other'] },
];

// Cluster centres for a wide (desktop) and a tall (phone) canvas
const CENTRES = {
  wide: {
    width: 1200,
    height: 660,
    spacing: 25,
    // Two rows: the three smaller clusters along the top, the two largest along the bottom
    at: {
      'rare-earth-elements': [250, 190],
      phytomining: [600, 160],
      'battery-recycling': [955, 180],
      lithium: [330, 470],
      'other-areas': [830, 475],
    } as Record<string, [number, number]>,
  },
  tall: {
    width: 600,
    height: 1120,
    spacing: 24,
    at: {
      lithium: [165, 230],
      'rare-earth-elements': [440, 250],
      phytomining: [160, 545],
      'battery-recycling': [445, 555],
      'other-areas': [300, 880],
    } as Record<string, [number, number]>,
  },
};

const SHORT: Record<string, string> = {
  lithium: 'Lithium',
  'rare-earth-elements': 'Rare earths',
  phytomining: 'Phytomining',
  'battery-recycling': 'Batteries',
  'other-areas': 'Other areas',
};

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export function buildPaperMap(
  pubs: CollectionEntry<'publications'>[],
  memberOf: (author: string) => string | undefined,
  shape: 'wide' | 'tall',
): MapLayout {
  const frame = CENTRES[shape];
  const journal = pubs
    .filter((p) => p.data.type === 'journal')
    .sort((a, b) => b.data.year - a.data.year || a.data.seq - b.data.seq);
  const years = journal.map((p) => p.data.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const scale = shape === 'tall' ? 1.35 : 1;

  const areaOf = (themes: string[]) =>
    PRIORITY.find((g) => g.tags.some((t) => themes.includes(t)))?.slug ?? 'other-areas';
  // Lithium-ion battery papers also belong with the lithium work, so they appear in both clusters
  const inArea = (themes: string[], slug: string) =>
    areaOf(themes) === slug || (slug === 'lithium' && themes.includes('lithium') && themes.includes('battery-recycling'));

  const clusters: MapCluster[] = [];
  const nodes: MapNode[] = [];
  const edges: [number, number][] = [];

  PRIORITY.forEach(({ slug }, ci) => {
    const area = AREAS.find((a) => a.slug === slug)!;
    const papers = journal.filter((p) => inArea(p.data.themes, slug));
    const [cx, cy] = frame.at[slug];
    const start = nodes.length;
    const turn = ci * 0.9; // rotate each spiral a little so clusters don't look identical

    papers.forEach((p, i) => {
      // Newest paper sits at the centre; older papers spiral outwards
      const dist = frame.spacing * Math.sqrt(i + 0.6);
      const angle = i * GOLDEN + turn;
      const recency = maxYear === minYear ? 1 : (p.data.year - minYear) / (maxYear - minYear);
      const authors = p.data.authors.map((a) => a.trim());
      const labAuthors = authors.filter((a) => memberOf(a));
      nodes.push({
        id: p.id,
        cluster: slug,
        color: area.color,
        x: Math.round((cx + dist * Math.cos(angle)) * 10) / 10,
        y: Math.round((cy + dist * Math.sin(angle)) * 10) / 10,
        r: Math.round((3.2 + 4.6 * recency ** 1.6) * scale * 10) / 10,
        glow: Math.round((0.35 + 0.65 * recency) * 100) / 100,
        newest: p.data.year >= maxYear - 1,
        title: p.data.title,
        venue: p.data.venue,
        year: p.data.year,
        authors,
        labAuthors,
        href: p.data.doi ? `https://doi.org/${p.data.doi}` : undefined,
      });
    });

    // Lines: each paper joins its nearest older paper that shares a lab member (other than the PI,
    // who is on nearly every paper). Degree is capped so the constellation stays readable.
    const degree = new Map<number, number>();
    const team = (n: MapNode) => new Set(n.labAuthors.map(memberOf).filter((id) => id && id !== 'ehsan-vahidi'));
    for (let i = start; i < nodes.length; i++) {
      const mine = team(nodes[i]);
      if (mine.size === 0) continue;
      let best = -1;
      let bestDist = Infinity;
      for (let j = i + 1; j < nodes.length; j++) {
        if ((degree.get(j) ?? 0) >= 3) continue;
        if (![...team(nodes[j])].some((id) => mine.has(id))) continue;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < bestDist) {
          bestDist = d;
          best = j;
        }
      }
      if (best >= 0) {
        edges.push([i, best]);
        degree.set(i, (degree.get(i) ?? 0) + 1);
        degree.set(best, (degree.get(best) ?? 0) + 1);
      }
    }

    const radius = frame.spacing * Math.sqrt(Math.max(papers.length, 1));
    clusters.push({
      slug,
      name: area.name,
      short: SHORT[slug],
      color: area.color,
      count: papers.length,
      x: cx,
      y: cy,
      labelY: Math.round(cy - radius - (shape === 'tall' ? 30 : 22)),
    });
  });

  return { width: frame.width, height: frame.height, clusters, nodes, edges };
}
