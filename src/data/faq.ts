/**
 * FAQ générale (page /faq/). Réponses en Markdown léger (voir lib/mdlite.ts).
 * [[À CONFIRMER : …]] = information Clean2Go à fournir ; ne jamais remplacer par une supposition.
 */
export interface FaqGroup { id: string; title: string; items: { q: string; a: string }[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'service',
    title: 'Le service et la vapeur',
    items: [
      {
        q: 'Comment se déroule une intervention ?',
        a: `Tout commence par votre demande : vous nous indiquez votre commune, votre véhicule et ce que vous attendez. Nous revenons vers vous avec un devis, puis nous convenons du lieu et du créneau.\n\nLe jour de l’intervention, nous venons à l’endroit où se trouve votre véhicule, nous installons le matériel et nous procédons au nettoyage à la vapeur, de l’intérieur et/ou de l’extérieur selon la prestation retenue. À la fin, nous contrôlons le résultat avec vous si vous êtes présent.\n\nLes détails de chaque formule sont sur la page [Prestations](/prestations/).`,
      },
      {
        q: 'Comment fonctionne le nettoyage vapeur ?',
        a: `Un générateur chauffe de l’eau à haute température et la projette sous forme de vapeur à travers une buse adaptée à chaque surface. La chaleur ramollit les salissures, les graisses et les résidus, qui se décollent sans frottement excessif. Un chiffon ou un aspirateur récupère ensuite ce qui a été détaché.\n\nCe procédé a deux intérêts concrets : il atteint les recoins où un chiffon ne passe pas (rails de sièges, grilles d’aération, joints, interstices), et il utilise très peu d’eau, ce qui évite de détremper les tissus et les moquettes.\n\nPour aller plus loin : [le nettoyage vapeur intérieur et extérieur](/prestations/nettoyage-vapeur-complet/) et notre guide [comment fonctionne le nettoyage vapeur automobile](/blog/nettoyage-vapeur-automobile-comment-ca-marche/).`,
      },
      {
        q: 'La vapeur est-elle adaptée à tous les matériaux ?',
        a: `La vapeur convient aux matières que l’on trouve dans un habitacle : tissus, cuirs, plastiques, vitres. Nous adaptons le geste et la buse à chaque surface pour préserver les matières.\n\nCertaines zones demandent de la prudence quel que soit le procédé : composants électroniques, écrans, cuirs très fragilisés, peintures déjà abîmées. Si votre véhicule présente une particularité, signalez-la dans votre demande : nous en tenons compte dans la préparation de l’intervention.`,
      },
      {
        q: 'Que comprend le nettoyage intérieur ?',
        a: `Le [nettoyage intérieur](/prestations/nettoyage-interieur-voiture/) traite les sièges, les tapis, les moquettes, les plastiques et les zones difficiles d’accès de l’habitacle. La vapeur décolle les saletés incrustées et traite les bactéries et les mauvaises odeurs à la source.`,
      },
      {
        q: 'Que comprend le nettoyage extérieur ?',
        a: `Le [nettoyage extérieur](/prestations/nettoyage-exterieur-voiture/) concerne la carrosserie, les jantes et les finitions. La vapeur décolle les saletés avec précision et limite la consommation d’eau.`,
      },
      {
        q: 'Utilisez-vous des produits chimiques ?',
        a: `Notre nettoyage repose sur la vapeur. Si un cas particulier demande autre chose, nous vous l’indiquons dans le devis.`,
      },
    ],
  },
  {
    id: 'pratique',
    title: 'Organisation pratique',
    items: [
      {
        q: 'Faut-il fournir de l’eau ?',
        a: `Nous préférons disposer d’un point d’eau, mais nous pouvons nous débrouiller sans. La technique vapeur utilise très peu d’eau, ce qui limite de toute façon les contraintes sur place.`,
      },
      {
        q: 'Faut-il fournir de l’électricité ?',
        a: `Oui, une prise électrique à proximité du véhicule est nécessaire.`,
      },
      {
        q: 'Combien de temps dure un nettoyage ?',
        a: `La durée dépend de la prestation, de la taille du véhicule et de son état. Le devis vous indique le temps prévu, et nous le fixons avec vous pour que le créneau convienne à votre journée.`,
      },
      {
        q: 'Puis-je laisser mon véhicule et partir ?',
        a: `Vous êtes présent à l’arrivée pour l’état des lieux et la remise des clés, puis à la fin pour constater la prestation et régler ; entre les deux, vous n’avez pas besoin de rester. Dans tous les cas, nous convenons à l’avance de l’endroit où se trouve le véhicule et de la manière d’y accéder.`,
      },
      {
        q: 'Où se fait l’intervention ? Faut-il un garage ?',
        a: `L’intervention a lieu là où se trouve votre véhicule : devant chez vous, dans un parking de résidence, sur le parking de votre entreprise. Il faut pouvoir ouvrir les portières en grand et travailler autour du véhicule.`,
      },
      {
        q: 'Que se passe-t-il s’il pleut ?',
        a: `Oui, nous intervenons toute l’année.`,
      },
      {
        q: 'Quels véhicules prenez-vous en charge ?',
        a: `Nous nettoyons les voitures de particuliers et de professionnels. Nous acceptons tout type de véhicule : citadines, SUV, utilitaires, camping-cars, motos, bateaux. D’autres supports (nautisme, aviation légère, environnements industriels) sont étudiés [sur demande](/prestations/autres-vehicules/).`,
      },
    ],
  },
  {
    id: 'reservation',
    title: 'Réservation, devis et paiement',
    items: [
      {
        q: 'Comment se passe la réservation ?',
        a: `Vous remplissez le formulaire de la page [Contact et réservation](/contact/#reservation) ou vous nous appelez au [06 03 94 87 78](tel:+33603948778). Nous revenons vers vous avec un devis, puis nous fixons le lieu et le créneau.`,
      },
      {
        q: 'Comment payer ?',
        a: `Nous acceptons le paiement par chèque, espèces ou virement. Il intervient à la fin de la prestation, une fois le résultat constaté ensemble. Le montant est celui du devis accepté, majoré uniquement des éventuels suppléments annoncés. Les règles complètes figurent dans nos [conditions générales de vente](/cgv/).`,
      },
      {
        q: 'Puis-je annuler ou reporter ?',
        a: ` Si un imprévu survient, prévenez-nous le plus tôt possible par téléphone : nous cherchons un autre créneau. Les conditions détaillées sont dans les [CGV](/cgv/).`,
      },
      {
        q: 'Le devis est-il gratuit ?',
        a: `Le devis vous est transmis avant toute intervention : vous savez ce que vous payez avant de vous engager. Tous nos tarifs sont communiqués sur devis. Pour comprendre comment le prix est établi, voir la page [Tarifs](/tarifs/).`,
      },
    ],
  },
  {
    id: 'cas',
    title: 'Cas particuliers',
    items: [
      {
        q: 'Que se passe-t-il pour un véhicule très sale ?',
        a: `Un véhicule très sale demande plus de temps, parfois plusieurs passages de vapeur sur une même zone. C’est pourquoi l’état du véhicule fait partie du devis : décrivez-le franchement (voire envoyez-nous une photo si vous le souhaitez) et nous vous annonçons le prix et la durée avant l’intervention. Le supplément éventuel est précisé dans le devis, jamais ajouté après coup. Voir [options et cas particuliers](/prestations/options-et-cas-particuliers/#tres-sale).`,
      },
      {
        q: 'Prenez-vous en charge les poils d’animaux ?',
        a: `Oui. Les poils s’incrustent dans les tissus et les moquettes, où ils s’accrochent aux fibres. Un travail méthodique, associé à la vapeur qui détend les fibres, permet de les décoller. Selon la quantité, un supplément peut s’appliquer : il est annoncé dans le devis. Détails sur la page [poils d’animaux](/prestations/options-et-cas-particuliers/#poils) et dans notre guide [retirer les poils d’animaux d’une voiture](/blog/retirer-poils-animaux-voiture/).`,
      },
      {
        q: 'Peut-on éliminer les mauvaises odeurs ?',
        a: `Les odeurs viennent presque toujours d’une source précise : fumée absorbée par les tissus, humidité, aliment renversé, animal. La vapeur agit à la source en traitant les matières imprégnées, plutôt que de masquer l’odeur avec un parfum. Les odeurs très installées peuvent demander un traitement plus poussé. Voir [mauvaises odeurs](/prestations/options-et-cas-particuliers/#odeurs) et notre guide [éliminer les mauvaises odeurs d’une voiture](/blog/eliminer-mauvaises-odeurs-voiture/).`,
      },
      {
        q: 'Les taches anciennes partent-elles toujours ?',
        a: `Pas toujours, et nous préférons le dire clairement. La vapeur vient à bout de la grande majorité des salissures ordinaires, mais certaines taches anciennes (encre, teinture, brûlure, décoloration) peuvent rester partiellement visibles car elles ont modifié la matière elle-même. Nous vous disons ce que nous pouvons raisonnablement obtenir avant d’intervenir.`,
      },
    ],
  },
  {
    id: 'zones',
    title: 'Zones d’intervention',
    items: [
      {
        q: 'Où intervenez-vous ?',
        a: `À [Bordeaux Métropole](/nettoyage-auto-bordeaux-metropole/) et sur le [Bassin d’Arcachon](/nettoyage-auto-bassin-arcachon/), à domicile comme sur site professionnel. Retrouvez toutes les communes sur la page [zones d’intervention](/zones-d-intervention/).`,
      },
      {
        q: 'Quels secteurs de Bordeaux Métropole couvrez-vous ?',
        a: `Nous avons une page dédiée pour Bordeaux, Mérignac, Pessac, Talence, Villenave-d’Ornon, Saint-Médard-en-Jalles, Bègles, Le Bouscat, Gradignan et Cenon. D’autres communes de la métropole sont possibles : indiquez la vôtre dans le [formulaire](/contact/?commune=Autre#devis).`,
      },
      {
        q: 'Intervenez-vous sur le Bassin d’Arcachon ?',
        a: `Oui : Arcachon, La Teste-de-Buch, Gujan-Mestras, Andernos-les-Bains, Biganos, Le Teich, Audenge, Lanton, Arès et Lège-Cap-Ferret ont chacune leur page. Pour les communes éloignées ou la presqu’île, le créneau se fixe un peu en amont. Les frais de déplacement sont inclus dans le devis.`,
      },
      {
        q: 'Ma ville n’est pas listée : puis-je quand même faire une demande ?',
        a: `Oui. Nous étudions chaque demande. Indiquez votre commune dans le [formulaire](/contact/?commune=Autre#devis) : nous vous répondons pour savoir si nous pouvons intervenir et à quelles conditions.`,
      },
    ],
  },
  {
    id: 'pro',
    title: 'Professionnels',
    items: [
      {
        q: 'Nettoyez-vous les véhicules professionnels ?',
        a: `Oui. Nous intervenons sur les véhicules de concessions, de garages, de loueurs et d’entreprises, directement sur votre site. Voir la page [Professionnels](/professionnels/).`,
      },
      {
        q: 'Intervenez-vous sur des flottes de véhicules ?',
        a: `Oui, ponctuellement ou de façon régulière. Nous organisons les passages avec vous selon la taille de votre parc, vos contraintes d’accès et le rythme souhaité, puis nous établissons une proposition adaptée. Précisez le nombre de véhicules dans votre demande.`,
      },
      {
        q: 'Pouvez-vous intervenir dans nos locaux ou sur notre parking ?',
        a: `Oui, c’est même le mode de fonctionnement habituel pour les professionnels : vos véhicules ne se déplacent pas, vos équipes non plus. Nous convenons à l’avance des conditions d’accès et de l’emplacement de travail.`,
      },
      {
        q: 'Proposez-vous une facturation adaptée aux entreprises ?',
        a: `Pour un besoin régulier, nous établissons un devis adapté ; les modalités de facturation se précisent avec vous.`,
      },
    ],
  },
];

export const allFaq = () => FAQ_GROUPS.flatMap((g) => g.items);
