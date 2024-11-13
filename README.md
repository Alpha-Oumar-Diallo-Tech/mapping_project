## Nom du Projet :  Carte des Établissements Publics Guinéens

## INTRODUCTION
De nombreux nouveaux bacheliers, après l'obtention de leur baccalauréat, peine à trouver des informations de manière simple et centraliser sur les universités en Guinée.
De nombreux citoyens, pour des fins de consultations, peine à trouver des informations de manière simple et centraliser sur les hopitaux et clinique en Guinée.
De nombreux parents d'élèves, afin d'inscrire leur enfants à l'école, peine à trouver des informations de manière simple et centraliser sur les écoles en Guinée.
De nombreux amoureux de la lecture, afin de trouver un espace pour voyager dans le monde de la connaissance, peine à trouver des informations de manière simple et centraliser sur les bibliothèques en Guinée.

Ce projets, portant sur les différentes infrastructures publics ou même privés en Guinée, que sa soit les universités, les hopitaux, les écoles ou même les bibliothèque est un projet collaboratif entre un groupe de dévéloppeur et la population. Ils visent à rendre l'information sur ces différents types d'infrastructure facilement accessible, centraliser et toujours disponible, en les indiquants tous sur une carte interatives et facile à utiliser. Contenant déja des infrastructure de base, ils invitent les différents recteurs des différentes universités, les différents directeurs des différentes école, les différents directeurs des différents hopitaux ainsi que les différents responsables des différentes bibliothèques à se réunir, et de faire un mouvement d'ensemble afin de rendre l'information accessible à tous.

Ce projet vise à rendre l'informations sur ces infrastructures accessible à tous et centraliser sur une seule plateforme. Ce qui est d'une importance primordiale, car pour prendre une bonne décision, il faut avoir toutes les informations nécessaires afin de ne pas regretter ses décisions par la suite.

## OBJECTIF
1 - OBJECTIF GENERALE
L'objectif de ce projet est de rendre l'information accessible à tous de manière simple et rapide, et cela de manière colaboratif et continu.

2 - OBJECTIF SPECIFIQUE
- Voir l'emplacement de toutes les infrastructures (universités, écoles, hopitaux et bibliothèques) sur une carte
- Avoir accès au informations de ces établissements de manière simple et éfficace
- Avoir sur une interface la liste de toutes ces infrastructures en fonction de la catégorie
- Ajouter soi même sur la carte de nouvelle infrastructures
- Télécharger la liste de toutes les infrastructures accompagnés de toutes les informations qui les concerne.
- Tout cela sur une interface simple et intuitive

## INSTRUCTIONS D'INSTALATION ET D'EXECUTION
Pour utiliser la plateforme, rien de plus simple, il vous suffit juste d'avoir accès à internet et de vous rendre sur le lien suivant: https://mapping-project-ruddy.vercel.app
Une fois sur la plateforme, laisser la magie oppérer

## GUIDE D'UTILISATION DE L'APPLICATION WEB
- Acceder à la plateforme à travers le lien
- Au chargement de la plateforme, vous avez accès au infrastructures de base
- Selectionner un emplacement sur la carte, entrez les informations demandés pour ajouter une infrastructure à ce niveau
- Cliquer sur le popup du marqueur d'un établissement pour afficher tous les détails sur l'établissement
- Cliquer sur le bouttons "Afficher toutes les infrastructures" pour afficher la liste des infrastructures en fonction de leur catégorie.
- Cliquer le bouton "Voir sur la carte" associé à chaque établissement pour voir l'emplacement de l'infrastructure sur la carte.
- Dans cette même interface, cliquer sur le bouton "Télécharger la liste des infrastructures" pour télécharger la liste de toutes les infrastructures
- Juste en dessous, cliquez sur le champs "choisir un fichier" choisissez un fichier json qui à la même structure que le fichier json exporter (télécharger), et ensuite cliquer sur le bouton "charger le fichier" pour exploiter les données dans ce fichier afin de les afficher sur la carte.
- Cliquer sur le bouton "masquer toutes les infrastructures" pour fermer cette interface


## CHOIX TECHNIQUE EFFECTUES
- LANGAGE DE PROGRAMMATION:
    - HTML: pour la structure
    - CSS: pour le style
    - JAVASCRIPT: pour la logique
- BIBLIOTHEQUE:
    - LEAFLET: pour la carte
- PARADIGME DE PROGRAMMATION:
    - PROGRAMMATION ORIENTE OBJET: pour maintenir une structure organisé, évolutive, maintenable et flexible
- HEBERGEMENT:
    - VERCEL

## DESCRIPTION DES FONCTIONNALITES IMPLEMENETEES
- AFFICHAGE DE LA CARTE: l'utilisation de la bibliothèque leaflet pour afficher la carte
- AFFICHAGE DES MARQUEURS SUR LA CARTE: 
    - POUR LES INFRASTRUCTURES DE BASE: 
        - mise en place d'une méthode qui exploites les coordonnées récupéree dans le fichier JSON pour afficher le marqueur
    - POUR LES INFRASTRUCTURES AJOUTEES PAR L'UTILISATEUR:
        - mise en place d'une méthode qui écoute l'évènement du clic sur la carte afin d'extraire les coordonées ainsi que d'autre informations avant d'appeler la méthode qui exploite ces données là pour afficher le marqueur
- PERSONALISATION DU POPUP: 
    - mise en place d'une méthode qui exploite la catégorie de l'établissemnt pour lui donner une couleur en fonction de cela
- AFFICHAGE DES DETAILS SUPPLEMENTAIRE:
    - mise en place d'une méthode qui écoute l'évènement du clic sur le popup afin d'aficher le modal qui va afficher les détails supplémentaire relatif à l'établissement
- PERSONNALISATION DU MODAL DES DETAILS:
    - mise en place d'une méthode qui exploite la catégorie de l'établissement pour lui donner une couleur en fonction de cela
- AJOUT D'UN NOUVELLE ETABLISSEMENT:
    - mise en place d'une méthode qui écoute l'évènement du clic sur la carte, une autre méthode qui vérifie que le clic n'est pas accidentelle avant d'affficher le formulaire. Mise en place d'une méthode qui vérifie les données qui sont censé être alphabétique (et qui affiche un message d'erreur au cas contraire, puis empèche la validation du formulaire), une autre méthode qui vérifie les données qui sont censé être numérique (et qui affiche un message d'erreur au cas contraire, puis empèche la validation du formulaire), et une autre méthode qui vérifie les données récupérer et transformer en tableau qui est un tableau censé contenir des caractère alphabétique (et qui affiche un message d'erreur au cas contraire, puis empèche la validation du formulaire). Une autre méthode qui valide le formulaire et qui crée une instance de l'établissement en fonction de la catégorie pour afficher l'infrastructure sur la carte
- AFFICHAGE DE LA LISTE DES ETABLISSEMENTS:
    - mise en place d'une méthode qui écoute le clic sur le bouton "Afficher toutes les infrastructures" et qui affiche une interface de la liste des établissemnts en fonction de la catégorie.
- AFFICHAGE DE L'INFRASTRUCTURE SUR LA CARTE AU CLIC SUR LE BOUTON "Voir sur la carte":
    - mise en place d'une méthode qui écoute le clic sur le bouton "Voir sur la carte" et qui recherche cet établissement dans le tableau des établissements, puis récupère ce objet afin d'extraire ces coordonées et l'afficher sur la carte
- EXPORTATION DES DONNEES:
    - mise en place d'une méthode qui écoute le clic sur le boutton "Télécharger la liste des infrastructures" pour télécharger la liste de toutes les infrastructures au format json
- IMPORTATION DES DONNEES:
    - mise en place d'une méthode qui exploite le fichier json charger par l'utilisateur pour créer des instances de chaque objet présent dans le fichier.
    NB: vous pouvez utiliser le fichier intitulé "fichier_test.json" pour tester cette fonctionnalité. 

## VERSION MOBILE:
    - la plateforme est aussi utilisable sur mobile
    
## DOCUMENTS
    - Vous trouverez le flowchart ainsi que l'architecture au sein des fichiers "flowchart.drawio.svg" et "architecture.drawio.svg"

## PROBLEMES RENCONTRES ET SOLUTIONS APPORTEES
- PROBLEMES RENCONTRES: 
    - PERSONNALISATION DU MARQUEUR:
        la bibliothèque leaflet awesome marker n'était pas fonctionnel
    - SOLUTIONS APPORTEES:
        on a utilisé la documentation de leaflet pour personnaliser l'icone











