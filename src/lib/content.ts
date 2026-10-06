import { getCollection, type CollectionEntry } from 'astro:content';
import { ZONES, type ZoneKey } from '@/config/site';

export type City = CollectionEntry<'cities'>;
export type Service = CollectionEntry<'services'>;
export type Post = CollectionEntry<'blog'>;

export const BLOG_CATEGORIES: Record<string, { label: string; blurb: string }> = {
  interieur: { label: 'Nettoyage intérieur', blurb: 'Sièges, plastiques, moquettes, vitres : nettoyer l’habitacle sans l’abîmer.' },
  exterieur: { label: 'Carrosserie et extérieur', blurb: 'Carrosserie, jantes, joints : les bons réflexes pour l’extérieur.' },
  vapeur: { label: 'Nettoyage vapeur', blurb: 'Comprendre la vapeur, ses usages et ses limites.' },
  entretien: { label: 'Entretien', blurb: 'Les habitudes qui gardent un véhicule sain au quotidien.' },
  professionnels: { label: 'Professionnels', blurb: 'Flottes, concessions, loueurs : organiser la propreté d’un parc.' },
  'restitution-vente': { label: 'Restitution et vente', blurb: 'Préparer un véhicule avant une restitution ou une revente.' },
  local: { label: 'Conseils locaux', blurb: 'Bordeaux et Bassin d’Arcachon : sable, sel, pollen, résine, chaleur.' },
};

export const cityPath = (slug: string) => `/nettoyage-auto-${slug}/`;
export const servicePath = (slug: string) => `/prestations/${slug}/`;
export const postPath = (slug: string) => `/blog/${slug}/`;

export async function getServices() {
  return (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
}
/** id = nom de fichier sans extension. Pour les villes : le slug est l'id (ex. "merignac"), les piliers : "bordeaux-metropole", "bassin-arcachon". */
export async function getCities(zone?: ZoneKey) {
  const all = (await getCollection('cities')).filter((c) => c.data.kind === 'city');
  return all.filter((c) => !zone || c.data.zone === zone).sort((a, b) => a.data.order - b.data.order);
}
export async function getPillars() {
  return (await getCollection('cities')).filter((c) => c.data.kind === 'pillar');
}
export async function getPosts() {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export const zoneOf = (key: ZoneKey) => ZONES.find((z) => z.key === key)!;
