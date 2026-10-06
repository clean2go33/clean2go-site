# Clean2Go — site web

Site statique (Astro 7 + TypeScript) de Clean2Go, nettoyage automobile mobile à la vapeur (Bordeaux Métropole, Bassin d'Arcachon, Gironde). Indépendant de tout hébergeur.

## Démarrer
```bash
npm install
cp .env.example .env     # puis ajuster
npm run dev              # http://localhost:4321
```

## Commandes
| Commande | Rôle |
|---|---|
| `npm run dev` | serveur local |
| `npm run check` | typage Astro/TS |
| `npm run build` | génère `dist/` |
| `npm run validate` | liens, SEO, JSON-LD, orphelines, similarité, liste des « À CONFIRMER » |
| `npm test` | check + build + validate |
| `npm run release:zip` | `clean2go-site-dist.zip` à déposer sur l'hébergement |

## Structure
- `src/content/` : textes (services, villes, blog, pages légales) en Markdown.
- `src/data/` : tarifs et FAQ globale.
- `src/config/site.ts` : coordonnées, données légales, navigation.
- `src/components`, `src/layouts`, `src/styles`, `src/lib`, `src/scripts`.
- `public/` : favicon, `.htaccess`, `envoyer.php`.
- `docs/` : déploiement et redirections.

## Variables d'environnement
Voir `.env.example`. Aucune valeur secrète dans le dépôt.

## Avant publication
`STRICT_CONFIRM=1 npm run validate` doit passer : plus aucune mention « INFORMATION À CONFIRMER ». Voir `docs/A_VALIDER.md`.
