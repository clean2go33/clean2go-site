/**
 * Source unique de vérité : identité, coordonnées (NAP), navigation, réglages.
 * Toute modification de téléphone / e-mail / identité légale se fait ICI.
 */
const env = import.meta.env;

export const SITE = {
  name: 'Clean2Go',
  tagline: 'Solutions vapeur',
  url: (env.PUBLIC_SITE_URL as string | undefined) || 'https://clean2go.fr',
  locale: 'fr-FR',
  phone: '06 03 94 87 78',
  phoneTel: '+33603948778',
  email: 'contact@clean2go.fr',
  pitch: 'Nettoyage automobile à la vapeur, à domicile et sur site, à Bordeaux Métropole et sur le Bassin d’Arcachon.',
  formEndpoint: (env.PUBLIC_FORM_ENDPOINT as string | undefined) || '/envoyer.php',
  gaId: (env.PUBLIC_GA_ID as string | undefined) || '',
  gscVerification: (env.PUBLIC_GSC_VERIFICATION as string | undefined) || '',
  tarifsFallback: (env.PUBLIC_TARIFS_FALLBACK as string | undefined) || 'devis',
  social: {
    instagram: (env.PUBLIC_INSTAGRAM_URL as string | undefined) || '',
    tiktok: (env.PUBLIC_TIKTOK_URL as string | undefined) || '',
    googleBusiness: (env.PUBLIC_GOOGLE_BUSINESS_URL as string | undefined) || '',
  },
} as const;

/** Identité légale — source : extrait Kbis du 6 juillet 2026. */
export const LEGAL = {
  legalName: 'NEW WAVE',
  tradeName: 'Clean2Go',
  form: 'Société par actions simplifiée (société à associé unique)',
  capital: '4 000 €',
  rcs: 'RCS Bordeaux 894 894 963',
  siren: '894 894 963',
  euid: 'FR3302.894894963',
  registeredOn: '9 mars 2021',
  headOffice: '26 avenue Gustave Eiffel, 33700 Mérignac',
  domiciliation: 'Bordeaux Bureaux Services (RCS Bordeaux 411 850 076)',
  president: 'Michael Boktor',
  activity: 'Lavage manuel de véhicules, vente de produits de nettoyage, lavage manuel de bateaux',
} as const;

export const ZONES = [
  {
    key: 'metropole',
    label: 'Bordeaux Métropole',
    short: 'Métropole',
    sub: 'Bordeaux, Mérignac, Pessac, Talence…',
    href: '/nettoyage-auto-bordeaux-metropole/',
    blurb: 'La métropole bordelaise, rive gauche et rive droite : dix communes en accès direct, d’autres sur demande.',
  },
  {
    key: 'bassin',
    label: 'Bassin d’Arcachon',
    short: 'Bassin',
    sub: 'Arcachon, La Teste, Gujan, Andernos…',
    href: '/nettoyage-auto-bassin-arcachon/',
    blurb: 'Le tour du Bassin, du sud (Arcachon, La Teste-de-Buch, Gujan-Mestras) au nord (Andernos, Arès, Lège-Cap-Ferret).',
  },
] as const;

export type ZoneKey = (typeof ZONES)[number]['key'];

export const NAV = {
  main: [
    { label: 'Prestations', menu: 'services' },
    { label: 'Tarifs', href: '/tarifs/' },
    { label: 'Zones d’intervention', menu: 'zones' },
    { label: 'Professionnels', href: '/professionnels/' },
    { label: 'Conseils', href: '/blog/' },
    { label: 'À propos', href: '/a-propos/' },
  ],
  cta: { label: 'Réserver', href: '/contact/#reservation' },
} as const;

export const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales/' },
  { label: 'Conditions générales de vente', href: '/cgv/' },
  { label: 'Politique de confidentialité', href: '/politique-de-confidentialite/' },
  { label: 'Conditions d’utilisation', href: '/cgu/' },
  { label: 'Cookies', href: '/politique-de-cookies/' },
] as const;
