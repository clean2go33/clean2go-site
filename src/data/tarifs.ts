/**
 * TARIFS CLEAN2GO — SEULE source des prix du site.
 * RÈGLES : ne jamais inventer un prix, ne jamais modifier un prix sans instruction écrite de Naomie.
 * `null` = prix non communiqué → la page affiche « tarif communiqué sur devis » (voir PUBLIC_TARIFS_FALLBACK).
 *
 * Pour renseigner les prix :
 *   1. définir `categories` (ex. { id: 'citadine', label: 'Citadine', examples: '…' }) ;
 *   2. remplir `price` de chaque formule, par catégorie : { citadine: 80, ... } ;
 *   3. remplir `options` / `supplements` (price: nombre ou texte, ex. « à partir de 20 € »).
 */
export interface VehicleCategory { id: string; label: string; examples?: string }
export interface Formule { id: string; name: string; summary: string; href: string; price: Record<string, number | null> }
export interface Extra { id: string; name: string; summary: string; price: number | string | null }

export const categories: VehicleCategory[] = [];

export const formules: Formule[] = [
  { id: 'interieur', name: 'Nettoyage intérieur', summary: 'Sièges, tapis, moquettes, plastiques, contre-portes et vitres intérieures.', href: '/prestations/nettoyage-interieur-voiture/', price: {} },
  { id: 'exterieur', name: 'Nettoyage extérieur', summary: 'Carrosserie, jantes, joints, vitres et seuils.', href: '/prestations/nettoyage-exterieur-voiture/', price: {} },
  { id: 'complet', name: 'Intérieur + extérieur', summary: 'La prestation complète, de bout en bout.', href: '/prestations/nettoyage-vapeur-complet/', price: {} },
];

export const supplements: Extra[] = [
  { id: 'poils', name: 'Poils d’animaux', summary: 'Traitement approfondi des tissus et moquettes chargés en poils.', price: null },
  { id: 'tres-sale', name: 'Véhicule très sale', summary: 'Temps d’intervention supplémentaire selon l’état constaté.', price: null },
  { id: 'odeurs', name: 'Traitement des odeurs', summary: 'Traitement ciblé à la source (tabac, humidité, nourriture, animal).', price: null },
];

export const hasPrices = () => categories.length > 0 && formules.some((f) => Object.values(f.price).some((p) => p !== null));
