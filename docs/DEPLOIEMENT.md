# Déploiement

Le site est 100 % statique : le dossier `dist/` suffit.

## 1. Construire
```bash
PUBLIC_SITE_URL=https://clean2go.fr npm run build
npm run validate
npm run release:zip
```

## 2. Hostinger (hébergement web existant, PHP)
1. hPanel → Gestionnaire de fichiers → `public_html` du domaine.
2. Déposer le contenu de `dist/` (zip puis « Extraire »), y compris `.htaccess` et `envoyer.php`.
3. Activer le SSL gratuit (hPanel → SSL).
4. Tester le formulaire (réception dans contact@clean2go.fr, vérifier les spams) et `/sitemap-index.xml`.
Sans PHP : définir `PUBLIC_FORM_ENDPOINT` (Formspree / Web3Forms) avant le build.

## 3. Autres hébergeurs
- **Cloudflare Pages / Netlify / Vercel** : connecter le dépôt Git, commande `npm run build`, dossier `dist`. Le formulaire nécessite `PUBLIC_FORM_ENDPOINT`. `.htaccess` y est ignoré (en-têtes à configurer côté plateforme).
- **VPS** : servir `dist/` avec Nginx/Caddy, HTTPS et `try_files $uri $uri/ =404`.

## 4. Brancher clean2go.fr
Ne modifier le DNS qu'au moment de la mise en ligne : enregistrement A/CNAME vers l'hébergeur choisi, puis HTTPS. Garder l'ancien site accessible jusqu'à validation.

## 5. Après mise en ligne
Search Console (`PUBLIC_GSC_VERIFICATION`), envoi du sitemap, fiche Google Business (`PUBLIC_GOOGLE_BUSINESS_URL`), contrôle des redirections.

## Redirections 301
Les anciennes URL de clean2go.fr ne sont pas connues. Lister l'ancien sitemap, puis ajouter dans `public/.htaccess` des règles `Redirect 301 /ancienne-url/ /nouvelle-url/` (exemples : accueil → `/`, prestations → `/prestations/`, contact → `/contact/`). Éviter les chaînes de redirections.
