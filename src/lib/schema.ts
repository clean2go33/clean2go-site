import { SITE, LEGAL, ZONES } from '@/config/site';
import { plain } from './mdlite';

const abs = (p: string) => new URL(p, SITE.url).href;
export const ORG_ID = `${SITE.url}/#entreprise`;

/** Entreprise : établissement mobile (zone de service). L'adresse du siège est une domiciliation → volontairement NON publiée en schema. */
export function localBusiness() {
  return {
    '@type': ['AutoWash', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: LEGAL.legalName,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/og-default.png`,
    telephone: SITE.phoneTel,
    email: SITE.email,
    description: SITE.pitch,
    taxID: LEGAL.siren.replace(/\s/g, ''),
    areaServed: [
      ...ZONES.map((z) => ({ '@type': 'AdministrativeArea', name: z.label })),
      { '@type': 'AdministrativeArea', name: 'Gironde' },
    ],
    ...(Object.values(SITE.social).some(Boolean) ? { sameAs: Object.values(SITE.social).filter(Boolean) } : {}),
  };
}

export const website = () => ({ '@type': 'WebSite', '@id': `${SITE.url}/#site`, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'fr-FR', publisher: { '@id': ORG_ID } });

export const breadcrumbs = (items: { label: string; href?: string }[], currentPath: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Accueil', href: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: abs(it.href ?? currentPath) })),
});

export const faqPage = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: plain(i.a) } })),
});

export const service = (o: { name: string; type: string; description: string; path: string; area?: string[] }) => ({
  '@type': 'Service', name: o.name, serviceType: o.type, description: o.description, url: abs(o.path), provider: { '@id': ORG_ID },
  areaServed: (o.area ?? ZONES.map((z) => z.label)).map((n) => ({ '@type': n.match(/Métropole|Bassin/) ? 'AdministrativeArea' : 'City', name: n })),
});

export const article = (o: { title: string; description: string; path: string; published: Date; updated?: Date; author: string; image?: string }) => ({
  '@type': 'BlogPosting', headline: o.title, description: o.description, mainEntityOfPage: abs(o.path), inLanguage: 'fr-FR',
  datePublished: o.published.toISOString(), dateModified: (o.updated ?? o.published).toISOString(),
  author: { '@type': 'Organization', name: o.author === 'L’équipe Clean2Go' ? SITE.name : o.author }, publisher: { '@id': ORG_ID },
  image: abs(o.image ?? '/og-default.png'),
});

export const graph = (...nodes: Record<string, unknown>[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
