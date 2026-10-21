# À valider avant publication

## Informations manquantes
- Tarifs (catégories de véhicules, formules, suppléments) — aucun prix inventé.
- Délai de réponse, moyens de paiement, annulation, politique météo.
- Eau/électricité nécessaires, durée, présence du client, clés.
- Types de véhicules acceptés, produits utilisés, frais de déplacement, zone maximale en Gironde.
- Disponibilité du Bassin toute l'année.
- TVA, n° RM / CMA, hébergeur final, médiateur de la consommation, assurance RC pro.
- Histoire du fondateur, photos équipe.
- URLs Instagram, TikTok, fiche Google Business ; outil de mesure d'audience.
- Anciennes URL de clean2go.fr (redirections 301).

## À faire valider
- CGV, confidentialité, cookies, mentions légales (juriste).
- Repères locaux cités dans les pages communes.

## Photos à fournir
Chaque `PhotoSlot` a une légende décrivant la photo attendue (`PUBLIC_DRAFT=1 npm run dev` pour les voir). Photos réelles uniquement ; avant/après si disponibles.

La liste exacte des mentions à confirmer s'obtient avec `npm run validate`.

## Médiateur de la consommation
Retiré du site à la demande de Naomie (pas d'adhésion pour le moment). Obligation légale pour la vente aux consommateurs : à régulariser (ex. CM2C, inscription professionnelle sur cm2c.net) puis à réintégrer dans les CGV (article « Médiation ») et les mentions légales.

## Mesure d'audience et bandeau cookies (à activer)
- Le bandeau de consentement et la mesure d'audience (Google Analytics 4) sont codés et testés : rien n'est chargé avant « Accepter », « Refuser » est aussi visible que « Accepter », le choix est mémorisé.
- Ils s'activent dès que `PUBLIC_GA_ID` (identifiant de mesure GA4, de la forme `G-XXXXXXXXXX`) est renseigné au moment du build. **Sans identifiant, aucun bandeau n'est affiché** (aucun traceur à encadrer).
- À faire par Naomie : créer la propriété GA4 (compte Google), me transmettre l'identifiant. Mettre ensuite à jour `politique-de-cookies.md` (mesure d'audience active) avant publication.

## Pages légales
- CGU ajoutées (`src/content/pages/cgu.md`). Comme les CGV, la politique de confidentialité et les mentions : à faire relire par un juriste avant la mise en ligne définitive.
