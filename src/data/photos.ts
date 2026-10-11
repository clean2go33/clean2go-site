/**
 * Photos du site. Toutes les images ci-dessous sont des visuels générés (outillage vapeur à poignée rouge,
 * cohérent d'une image à l'autre). Ce ne sont PAS des photos de clients ni de réalisations : ne jamais les
 * légender comme telles. À remplacer par de vraies photos Clean2Go dès qu'elles sont disponibles.
 * Règle de cohérence : un seul outillage visible = vapeur à poignée ROUGE (ne pas mélanger avec du jaune).
 */
import type { ImageMetadata } from 'astro';
import jante from '@/assets/photos/jante-vapeur.jpg';
import rails from '@/assets/photos/rails-sieges-vapeur.jpg';
import volant from '@/assets/photos/volant-habitacle-vapeur.jpg';
import tapis from '@/assets/photos/tapis-sol-vapeur.jpg';
import cuir from '@/assets/photos/siege-cuir-vapeur.jpg';
import aeration from '@/assets/photos/grille-aeration-vapeur.jpg';
import tissu from '@/assets/photos/siege-tissu-vapeur.jpg';
import parking from '@/assets/photos/parking-bordeaux.jpg';
import domicile from '@/assets/photos/operateur-domicile.jpg';
import retro from '@/assets/photos/retroviseur-vapeur.jpg';
import berline from '@/assets/photos/operateur-berline-bordeaux.jpg';

export interface Photo { src: ImageMetadata; alt: string }
const p = (src: ImageMetadata, alt: string): Photo => ({ src, alt });

export const PHOTOS = {
  jante: p(jante, 'Jante de voiture nettoyée à la vapeur, buse vapeur et vapeur visible'),
  rails: p(rails, 'Vapeur appliquée aux rails de sièges et à la moquette d’un habitacle'),
  volant: p(volant, 'Volant et console d’une voiture nettoyés à la vapeur, intérieur noir'),
  tapis: p(tapis, 'Tapis de sol de voiture nettoyé à la vapeur avec une brosse large'),
  cuir: p(cuir, 'Siège en cuir perforé nettoyé à la vapeur, lumière douce'),
  aeration: p(aeration, 'Buse vapeur sur une grille d’aération de tableau de bord'),
  tissu: p(tissu, 'Siège en tissu clair traité à la vapeur, ville de Bordeaux en arrière-plan'),
  parking: p(parking, 'Rangée de véhicules sur un parking face à la Garonne, au coucher du soleil'),
  domicile: p(domicile, 'Opérateur nettoyant une carrosserie à la vapeur devant une maison en pierre'),
  retro: p(retro, 'Jet de vapeur sur la portière et le rétroviseur d’une voiture noire'),
  berline: p(berline, 'Opérateur nettoyant une berline grise à la vapeur dans une allée gravillonnée'),
} satisfies Record<string, Photo>;

export const SERVICE_PHOTOS: Record<string, Photo> = {
  'nettoyage-interieur-voiture': PHOTOS.volant,
  'nettoyage-exterieur-voiture': PHOTOS.retro,
  'nettoyage-vapeur-complet': PHOTOS.berline,
  'options-et-cas-particuliers': PHOTOS.rails,
};

export const BLOG_PHOTOS: Record<string, Photo> = {
  'nettoyage-vapeur-automobile-comment-ca-marche': PHOTOS.jante,
  'retirer-poils-animaux-voiture': PHOTOS.tapis,
  'eliminer-mauvaises-odeurs-voiture': PHOTOS.rails,
  'nettoyer-voiture-avant-restitution-loa-lld': PHOTOS.berline,
  'preparer-voiture-avant-vente': PHOTOS.retro,
  'entretenir-voiture-bassin-arcachon-sel-sable-resine': PHOTOS.jante,
  'nettoyer-sieges-tissu-voiture': PHOTOS.tissu,
  'zones-oubliees-nettoyage-interieur-voiture': PHOTOS.aeration,
  'nettoyer-vehicules-flotte-entreprise': PHOTOS.parking,
  'pollen-pins-voiture-printemps-gironde': PHOTOS.domicile,
  'humidite-voiture-hiver-moisissures-buee': PHOTOS.volant,
};

/** Villes de la Métropole : visuels avec Bordeaux. Villes du Bassin : gros plans neutres (pas de vue de Bordeaux). */
export const CITY_PHOTOS: Record<string, Photo> = {
  'bordeaux-metropole': PHOTOS.parking,
  'bordeaux': PHOTOS.berline,
  'merignac': PHOTOS.volant,
  'pessac': PHOTOS.domicile,
  'talence': PHOTOS.tapis,
  'begles': PHOTOS.retro,
  'villenave-d-ornon': PHOTOS.rails,
  'le-bouscat': PHOTOS.aeration,
  'cenon': PHOTOS.jante,
  'gradignan': PHOTOS.domicile,
  'saint-medard-en-jalles': PHOTOS.parking,
  'bassin-arcachon': PHOTOS.jante,
  'arcachon': PHOTOS.retro,
  'la-teste-de-buch': PHOTOS.rails,
  'gujan-mestras': PHOTOS.volant,
  'andernos-les-bains': PHOTOS.aeration,
  'lanton': PHOTOS.tapis,
  'lege-cap-ferret': PHOTOS.tapis,
  'ares': PHOTOS.retro,
  'audenge': PHOTOS.rails,
  'biganos': PHOTOS.volant,
  'le-teich': PHOTOS.aeration,
};

export const CATEGORY_PHOTOS: Record<string, Photo> = {
  entretien: PHOTOS.jante,
  interieur: PHOTOS.volant,
  local: PHOTOS.domicile,
  professionnels: PHOTOS.parking,
  'restitution-vente': PHOTOS.retro,
  vapeur: PHOTOS.aeration,
  exterieur: PHOTOS.retro,
};

export const PAGE_PHOTOS = {
  'a-propos': PHOTOS.aeration,
  zones: PHOTOS.parking,
  contact: PHOTOS.berline,
  faq: PHOTOS.volant,
  plan: PHOTOS.retro,
  legal: PHOTOS.retro,
  blog: PHOTOS.domicile,
} satisfies Record<string, Photo>;
