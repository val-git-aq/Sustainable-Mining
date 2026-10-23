export type ThemeTag = 'lithium' | 'ree' | 'phytomining' | 'battery-recycling' | 'gold' | 'carbon' | 'nickel' | 'other';

/** Short labels for the small theme markers shown beside list items. */
export const TAG_LABEL: Record<ThemeTag, string> = {
  lithium: 'Lithium',
  ree: 'Rare earths',
  phytomining: 'Phytomining',
  'battery-recycling': 'Battery recycling',
  gold: 'Gold',
  carbon: 'Carbon',
  nickel: 'Nickel',
  other: 'Other',
};

export type ThemeColor = 'li' | 'ree' | 'phyto' | 'batt' | 'misc';

/** Which marker colour each tag uses (see --theme-* tokens). */
export const TAG_COLOR: Record<ThemeTag, ThemeColor> = {
  lithium: 'li',
  'battery-recycling': 'batt',
  ree: 'ree',
  phytomining: 'phyto',
  gold: 'misc',
  carbon: 'misc',
  nickel: 'misc',
  other: 'misc',
};

export interface ResearchArea {
  slug: string;
  name: string;
  tags: ThemeTag[];
  color: ThemeColor;
  short: string;
  /** Figure shown on the home page card (path inside public/). */
  /** `src` is shown on the page; optional `full` is the original opened when the figure is clicked. */
  image?: { src: string; alt: string; full?: string };
  intro: string[];
  questions: string[];
  methods: string[];
}

export const AREAS: ResearchArea[] = [
  {
    slug: 'lithium',
    name: 'Lithium',
    tags: ['lithium'],
    color: 'li',
    image: {
      src: '/images/Research images/Lithium.png',
      alt: 'Map comparing operating cost, capital cost intensity and global warming potential per tonne of lithium carbonate equivalent for Nevada sedimentary rock, Nevada brine (direct and conventional extraction) and hard-rock lithium',
    },
    short:
      'Extraction routes for Nevada’s claystone and brine lithium, compared on cost, carbon, water and land.',
    intro: [
      'Nevada holds some of the largest lithium resources in the United States, in sedimentary claystones such as those at Thacker Pass and in the brines and clays of Clayton Valley. How that lithium is produced decides how much energy, water, reagent and land each tonne of battery-grade carbonate or hydroxide costs.',
      'We pair laboratory work on leaching, solvent extraction and adsorption with techno-economic analysis (TEA) and life cycle assessment (LCA). That lets us compare conventional evaporation and acid-leach routes with direct lithium extraction (DLE) and other emerging methods before they reach full scale.',
    ],
    questions: [
      'Which extraction route gives the lowest cost and footprint for claystone, brine and spodumene feedstocks?',
      'How do direct lithium extraction technologies compare on water use, land use and global warming potential?',
      'Can lithium be co-recovered with rubidium, gallium and cesium from Nevada clays?',
    ],
    methods: [
      'Hydrometallurgical leaching of sedimentary claystone',
      'Solvent extraction and adsorption for lithium separation',
      'Statistical design and process optimization',
      'Integrated TEA–LCA of lithium production pathways',
    ],
  },
  {
    slug: 'rare-earth-elements',
    name: 'Rare Earth Elements',
    tags: ['ree'],
    color: 'ree',
    image: {
      src: '/images/Research images/REEs.png',
      alt: 'Process diagram for recovering iron, aluminum, scandium and rare earth hydroxides from coal refuse, with projected cumulative cash flow',
    },
    short:
      'Cleaner production of the rare earths used in magnets and clean-energy technology, from bastnaesite ore, coal byproducts and recycled magnets through to laser-assisted separation.',
    intro: [
      'Rare earth elements are essential to permanent magnets, wind turbines and electric vehicles, yet separating them is chemically intensive. Their life-cycle impacts were poorly documented when Dr. Vahidi began building some of the first open life cycle inventories for rare earth production.',
      'The lab studies domestic and secondary rare earth sources: bastnaesite from Mountain Pass, coal refuse and coal combustion byproducts, red mud, acid mine drainage, and end-of-life NdFeB magnets. We measure what preconcentration, bioleaching and new separation methods would change economically and environmentally. A new DoD-funded effort is developing laser-assisted separation of individual rare earths.',
    ],
    questions: [
      'Where are the environmental hotspots in rare earth oxide production, and which process changes reduce them most?',
      'Can density-based sorting and preconcentration make U.S. bastnaesite more competitive?',
      'Is rare earth recovery from coal refuse, red mud or waste magnets economically viable?',
      'How can laser-based methods separate individual rare earths more selectively?',
    ],
    methods: [
      'Life cycle inventories and network analysis of REE supply chains',
      'Techno-economic evaluation of domestic and secondary feedstocks',
      'Bioleaching and microwave-assisted leaching',
      'Beneficiation and feedstock upgrading for laser-based separation',
    ],
  },
  {
    slug: 'phytomining',
    name: 'Phytomining',
    tags: ['phytomining'],
    color: 'phyto',
    image: {
      src: '/images/Research images/Phytomining 1.jpg',
      alt: 'Three-part diagram of rare earth phytomining: plants take up metals through phytoextraction and are harvested; the biomass is pre-processed for biofuel and power, leaving ash and residue that contain rare earths; rare earths are then leached, purified by ion exchange or solvent extraction, and precipitated as individual elements',
    },
    short:
      'Using metal-accumulating plants to clean contaminated soils and mine tailings while recovering rare earths and other critical minerals from the harvested biomass.',
    intro: [
      'Some plants take up unusually high concentrations of metals from soil. Phytomining puts that ability to work. Plants are grown on contaminated land or mine tailings, then harvested and processed to recover the metals they have taken up, cleaning the site at the same time.',
      'Our work began with a DOE-funded study of phytoremediation for soils next to a coal combustion product impoundment. It has grown into phytomining of rare earth elements and other critical minerals. We assess chelant-assisted uptake, soil washing alternatives, and dual-product systems that turn harvested biomass into both rare earth oxides and bio-oil through fast pyrolysis.',
    ],
    questions: [
      // Each question is drawn from a published paper (see publications.yaml)
      'How can metal-accumulating plants contribute to sustainable rare earth element extraction, and what still limits them?',
      'How do the environmental impacts of rare earth phytomining compare with conventional production?',
      'Can phytomining recover critical minerals from mine tailings and support a circular economy?',
      'Does co-producing bio-oil through fast pyrolysis make rare earth oxide production from phytomining more viable, economically and environmentally?',
    ],
    methods: [
      'Greenhouse and field phytoremediation trials',
      'Chelant-assisted uptake and ex-situ soil washing',
      'Biomass processing, including fast pyrolysis',
      'Comparative LCA and cost analysis',
    ],
  },
  {
    slug: 'battery-recycling',
    name: 'Battery Recycling',
    tags: ['battery-recycling'],
    color: 'batt',
    image: {
      src: '/images/web/battery-recycling.jpg',
      full: '/images/Research images/Battery recycling.jpg',
      alt: 'Process flows and system boundaries for producing battery-grade graphite from natural, synthetic and recycled lithium-ion battery sources',
    },
    short:
      'Recovering lithium, cobalt, nickel and graphite from spent lithium-ion batteries. Our comparison of battery-grade graphite sources found that recycled graphite has about 70% lower global warming potential than natural or synthetic graphite, and every route was cash-positive.',
    intro: [
      'Spent lithium-ion batteries are a fast-growing secondary source of lithium, cobalt, nickel, manganese and graphite. Recycling them can ease pressure on primary mining, but only if the recovery process is itself clean and affordable.',
      'We study hydrometallurgical, pyrometallurgical and hybrid recycling routes, from organic-acid leaching of cathode material and lithium recovery from smelter slag to upcycling spent graphite into graphene. Each route is tested with life cycle assessment (LCA) and techno-economic analysis (TEA).',
      'Graphite, the main anode material, is a recent focus. Comparing battery-grade graphite made from natural, synthetic and recycled sources, we found that the recycled route cut global warming potential by roughly 70%. Energy and consumables were the main environmental hotspots, and all three routes returned a positive cash flow, with recycling showing strong economics.',
    ],
    questions: [
      'Which recycling route (hydrometallurgical, pyrometallurgical or hybrid) recovers critical materials with the smallest footprint?',
      'Can recycled graphite compete with natural and synthetic graphite on both cost and carbon?',
      'How can the lithium lost to slag during smelting be recovered?',
      'Where are the hotspots in battery recycling, and which process changes reduce them most?',
    ],
    methods: [
      'Leaching with organic and inorganic acids, solvent extraction and precipitation',
      'Hybrid pyro/hydrometallurgical processing of black mass and slag',
      'Statistical design of experiments and process optimization',
      'Comparative LCA (TRACI) and techno-economic analysis',
    ],
  },
  {
    slug: 'other-areas',
    name: 'Other research areas',
    tags: ['gold', 'carbon', 'other'],
    color: 'misc',
    short:
      'Life cycle studies of gold and copper production, carbon management in mining, and sustainability assessment of other materials and industrial systems.',
    intro: [
      'The same assessment tools apply well beyond critical minerals. The lab has quantified the footprint of gold production from refractory and sulfide ores in Nevada, electric haul fleets, renewable energy in copper mining, carbon dioxide utilization, pit lake end uses, and the life-cycle emissions of U.S. buildings and pavements.',
    ],
    questions: [
      'Where are the hotspots in heap-leach and refractory gold production, and how can operations become more circular?',
      'How much can renewable power and electric haulage cut mining emissions?',
    ],
    methods: ['Process-based life cycle assessment', 'Techno-economic analysis', 'Scenario and sensitivity analysis'],
  },
];

export const areaForTag = (tag: ThemeTag) => AREAS.find((a) => a.tags.includes(tag));
