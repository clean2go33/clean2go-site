/**
 * TARIFS CLEAN2GO — SEULE source des prix du site (page Tarifs, pages prestations, accueil, schema, formulaire).
 * Prix communiqués par Naomie le 21/10/2026. Tous les montants sont en euros TTC (NEW WAVE est assujettie à la TVA).
 * RÈGLES : ne jamais inventer un prix, ne jamais modifier un prix sans instruction écrite de Naomie.
 * `null` = prix non communiqué → affiché « Sur devis ».
 */
export interface VehicleCategory { id: 'A' | 'B' | 'C'; label: string; short: string; examples: string }
export interface Formule {
  id: 'interieur' | 'exterieur' | 'complet';
  name: string; summary: string; href: string; serviceId: string;
  price: Record<string, number | null>;
}
export interface Extra {
  id: string; name: string; summary: string; price: number; note?: string; duration?: string; badge: string;
}

export const categories: VehicleCategory[] = [
  { id: 'A', label: 'Catégorie A', short: 'Petites citadines', examples: 'Petites citadines' },
  { id: 'B', label: 'Catégorie B', short: 'Compactes, petits SUV, breaks', examples: 'Petits SUV, compactes, breaks et petites berlines' },
  { id: 'C', label: 'Catégorie C', short: 'Grands SUV, monospaces', examples: 'Grands SUV, monospaces familiaux' },
];

export const formules: Formule[] = [
  { id: 'interieur', name: 'Nettoyage intérieur', summary: 'Sièges, tapis, moquettes, plastiques, contre-portes et vitres intérieures.', href: '/prestations/nettoyage-interieur-voiture/', serviceId: 'nettoyage-interieur-voiture', price: { A: 100, B: 115, C: 130 } },
  { id: 'complet', name: 'Intérieur + extérieur', summary: 'La prestation complète, de bout en bout, en une seule intervention.', href: '/prestations/nettoyage-vapeur-complet/', serviceId: 'nettoyage-vapeur-complet', price: { A: 140, B: 160, C: 180 } },
  { id: 'exterieur', name: 'Nettoyage extérieur', summary: 'Carrosserie, jantes, joints, vitres et seuils.', href: '/prestations/nettoyage-exterieur-voiture/', serviceId: 'nettoyage-exterieur-voiture', price: { A: null, B: null, C: null } },
];

/** Supplément appliqué quand l'état du véhicule le justifie (un seul supplément, que ce soit le sable, les poils ou les deux). */
export const supplement: Extra = {
  id: 'sable-poils', name: 'Sable ou poils d’animaux en quantité excessive',
  summary: 'Traitement plus long des tissus et moquettes très chargés en sable ou en poils d’animaux.',
  price: 30, badge: '+ 30 € TTC', note: 'Un seul supplément, que le véhicule présente du sable, des poils ou les deux.',
};

/** Prestation complémentaire, distincte des formules de nettoyage. */
export const ozone: Extra = {
  id: 'ozone', name: 'Désodorisation par traitement à l’ozone',
  summary: 'Traitement des mauvaises odeurs de l’habitacle par l’ozone.',
  price: 60, badge: '60 € TTC', duration: '1 h à 1 h 30',
  note: 'Il est préférable que le filtre d’habitacle ait été changé avant le traitement.',
};

export const eur = (n: number) => `${n.toLocaleString('fr-FR')} €`;
export const priceOf = (formule: Formule['id'], cat: VehicleCategory['id']) => formules.find((f) => f.id === formule)?.price[cat] ?? null;
export const rangeOf = (formule: Formule['id']) => {
  const v = Object.values(formules.find((f) => f.id === formule)?.price ?? {}).filter((p): p is number => typeof p === 'number');
  return v.length ? { low: Math.min(...v), high: Math.max(...v) } : null;
};
export const hasPrices = () => formules.some((f) => rangeOf(f.id) !== null);
export const minPrice = () => Math.min(...formules.map((f) => rangeOf(f.id)?.low ?? Infinity));
export const formuleByService = (serviceId: string) => formules.find((f) => f.serviceId === serviceId);
