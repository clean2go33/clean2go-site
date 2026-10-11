# CLAUDE.md — Site Clean2Go

Quand Naomie dit « Travaille sur le site Clean2Go », c'est ce projet. Lire ce fichier en entier avant toute modification.

## 1. Identité
- **Clean2Go** : nettoyage automobile mobile à la vapeur (intérieur, extérieur, intérieur + extérieur), chez le client ou sur site.
- Nom commercial de **NEW WAVE** (données légales dans `src/config/site.ts` → `LEGAL`, issues du Kbis). Président : Michael Boktor. **Ne jamais publier de données personnelles (date de naissance, adresse perso).**
- Zones : Bordeaux Métropole, Bassin d'Arcachon, Gironde (sur demande). Entreprise **sans local** : le siège est une domiciliation → pas d'adresse dans le schema LocalBusiness (service-area business).
- Contact : 06 03 94 87 78 · contact@clean2go.fr · domaine clean2go.fr.
- Ton : clair, précis, rassurant, premium sobre. Vouvoiement. Jamais de superlatifs vides.

## 2. Règles d'or (non négociables)
1. **Ne jamais inventer** : tarifs, délais, garanties, certifications, avis, clients, statistiques, coordonnées, zones, produits, assurances.
2. Toute information non fournie → jeton `[[À CONFIRMER : texte]]` (rendu « [INFORMATION À CONFIRMER] »). `STRICT_CONFIRM=1 npm run validate` bloque la publication s'il en reste.
3. **Aucun tarif modifié sans accord explicite de Naomie.** Les tarifs vivent dans `src/data/tarifs.ts` (vides tant qu'ils ne sont pas fournis ; repli « sur devis »).
4. Ne rien publier, ne pas toucher au DNS / domaine / clean2go.fr sans demande explicite. Aucun identifiant ou mot de passe dans le code.
5. Pas de suppression de fichiers sans demande.

## 3. Design system
- Couleurs (`src/styles/tokens.css`) : noir `#0F1317`, crème `#F7F5F2`, mist `#DDE2E6`, rouge `#E8453F`.
- Typo : Sora (titres) + Inter (texte), auto-hébergées (`@fontsource-variable`). Échelle fluide.
- Motif : lignes de vapeur (SVG généré, `src/lib/art.ts`). Ambiance : automobile, propreté, précision. **Pas** de look tuning, noir/or, SaaS.
- Breakpoints : 1180 / 1020 / 720 / 420. Mobile-first. Cible tactile ≥ 44 px. Focus visible. Contrastes AA.
- Composants dans `src/components/` : réutiliser avant d'en créer.
- Photos : composant `PhotoSlot`. Sans photo réelle → illustration de marque ; le message « PHOTO CLEAN2GO À FOURNIR » n'apparaît qu'en dev ou avec `PUBLIC_DRAFT=1`. Jamais de photo de stock présentée comme réelle. Les visuels actuels (`src/assets/photos/`, branchés via `src/data/photos.ts`) sont **générés par IA**, outillage vapeur à poignée **rouge** uniquement (ne jamais mélanger avec du jaune) : ne pas les légender comme des réalisations ou clients réels ; les remplacer par de vraies photos dès qu’elles existent.

## 4. Architecture et contenu
- Contenu séparé du code, `src/content/` : `services/`, `cities/` (pillar + city, nom de fichier = slug, URL `/nettoyage-auto-<slug>/`), `blog/`, `pages/` (légales).
- Schémas dans `src/content.config.ts` : title ≤ 70 car., description 80–175 car.
- Après chaque ajout de contenu : `node scripts/fix-frontmatter.mjs` puis `npm run check && npm run build && npm run validate`.
- FAQ en frontmatter `{q, a}`; schema FAQPage uniquement si la FAQ est visible.
- Markdown : liens internes avec slash final, jamais de lien vers une page inexistante.

## 5. SEO
- Un H1 par page, canonical depuis `SITE.url`, OG/Twitter, sitemap (`@astrojs/sitemap`), robots (`PUBLIC_NOINDEX=1` bloque tout), noindex sur 404 et /merci/.
- Schemas : LocalBusiness/AutoWash (sans adresse), Service, BreadcrumbList, BlogPosting, FAQPage.
- Silo local : piliers `bordeaux-metropole` et `bassin-arcachon` ↔ pages communes ↔ prestations ↔ articles. Aucune page orpheline (`validate` le vérifie).
- **Chaque page commune est unique** (angle local propre). Interdit : copier-coller en changeant le nom de la ville. `validate` alerte au-delà de 35 % de similarité.
- Repères locaux : rester sur des éléments publics, bien connus, non chiffrés sans source. Les faire valider par Naomie.

## 6. Règles commerciales
- CTA principal : « Réserver » → `/contact/#reservation`. Appel : tel: depuis `SITE`.
- Particuliers et professionnels ont deux formulaires (variants de `QuoteForm`).
- Avis, logos clients, « +X voitures nettoyées », notes : **seulement réels et fournis**.

## 7. Règles techniques
- Astro 7, TypeScript, sortie statique. Pas de framework JS client inutile.
- Formulaires : `/envoyer.php` (hébergement PHP) ou `PUBLIC_FORM_ENDPOINT` (Formspree, Web3Forms…). Honeypot `site_web`, consentement obligatoire. Aucun secret côté client.
- Analytics : aucun par défaut (donc pas de bannière). `PUBLIC_GA_ID` active GA **après consentement** (bannière `ConsentBanner`).
- Variables : voir `.env.example`.
- Perf : images via `astro:assets`/sharp, pas de script tiers bloquant, polices locales.
- Accessibilité : landmarks, `alt`, labels, `aria-current`, navigation clavier.

## 8. Commandes
`npm run dev` · `npm run check` · `npm run build` · `npm run validate` · `npm run test` · `npm run release:zip`

## 9. Pages légales
Mentions, CGV, confidentialité, cookies : textes préparés à partir du Kbis, **à faire valider par un juriste** ; ne jamais combler un trou par une invention.

## 10. Commits
Messages clairs, en français. Terminer par les lignes d'attribution demandées par l'environnement.
