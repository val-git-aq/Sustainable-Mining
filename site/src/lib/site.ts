export const SITE = {
  name: 'Sustainable Mining Lab',
  department: 'Department of Mining and Metallurgical Engineering',
  university: 'University of Nevada, Reno',
  email: 'evahidi@unr.edu',
  phone: '775-784-6923',
  address: ['1664 N. Virginia St., Mail Stop 173', 'Reno, Nevada 89557'],
  unrProfile: 'https://www.unr.edu/mining/people/ehsan-vahidi',
  scholar: 'https://scholar.google.com/scholar?q=Ehsan+Vahidi',
};

export const NAV = [
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/team', label: 'Team' },
  { href: '/publications', label: 'Publications' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

/** Prefix an internal path with the deploy base (GitHub Pages serves from /<repo>/). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
