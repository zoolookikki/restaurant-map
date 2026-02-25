# Application de recherche de restaurants McDonald's

## Description

Ce projet consiste à développer une application web en React permettant de rechercher des restaurants McDonald’s à partir d’une ville et de les visualiser sur une carte.
L’application propose une interface centrée sur une carte interactive, s’appuyant sur une API pour la recherche de villes, afin d’afficher les restaurants correspondants et de permettre leur sélection à l’aide de marqueurs.

## Analyse de l’interface

Selon le prototype Figma fourni, l’application présente les caractéristiques suivantes :

- L'application repose sur un écran unique (Single Page Application)
- La carte est toujours visible à l’écran
- Un champ de saisie accompagné d’un bouton de recherche permet de saisir une ville et de lancer une recherche affichant une liste de résultats
- Un overlay affichant des informations selon l’état de l’application
- Les contrôles de zoom, le popup, et les marqueurs font partie intégrante de la carte (Leaflet)

## Parcours utilisateur 

1. Accéder à l’interface de l'application
2. Saisir le nom d'une ville
3. Valider la recherche
4. Choisir une ville parmi les suggestions
5. Visualiser les restaurants correspondants sur la carte
6. Cliquer sur un restaurant affiché sur la carte
7. Confirmer le choix d'un restaurant
8. Voir l’overlay mis à jour avec les informations du restaurant sélectionné

## Structure 

Les composants sont les suivants : 

### App

Le composant `App` est le conteneur racine de l’application.  

Il initialise l’application et affiche l’écran principal.

### MainPage

Le composant `MainPage` correspond à l’écran principal de l’application.

Il permet de faire le lien entre les éléments principaux de l’interface : la carte, la recherche et l’affichage des informations (Map, Search, Overlay).

### Map

Le composant `Map` est responsable de l’affichage de la carte.

Grâce à Leaflet et React-Leaflet, il permet :
- de centrer la carte sur une ville
- de zoomer et dézoomer
- d’afficher les restaurants sous forme de marqueurs
- de consulter les informations d’un restaurant via une popup

### Search

Le composant `Search` gère la recherche de ville.

Il permet :
- de saisir le nom d'une ville
- de déclencher une recherche
- d’afficher une liste de suggestions
- de sélectionner une ville parmi les résultats

### Overlay

Le composant `Overlay` affiche des informations liées à la sélection d’un restaurant.

Il possède deux états :
- aucun restaurant sélectionné : affichage d’un message indiquant qu’aucun restaurant n’est sélectionné
- restaurant sélectionné : affichage des informations du restaurant et d’un bouton « Continuer »

## Liste des dépendances

### Prérequis techniques

- **Node.js** : environnement d’exécution JavaScript utilisé pour le développement et l’exécution des tests.
- **npm** : gestionnaire de paquets permettant d’installer et gérer les dépendances du projet.

### Applicatives

- **React** : framework permettant le développement de l’interface utilisateur.
- **Leaflet** : moteur de cartographie permettant l’affichage de la carte, la gestion du zoom, des marqueurs et des popups.  
  L’affichage nécessite l’inclusion du fichier `leaflet.css`.
- **React Leaflet** : composants React permettant d’intégrer Leaflet.
- **API Nominatim** : service permettant de retrouver une ville à partir de son nom et d’obtenir sa position sur la carte ainsi que des informations associées.
- **Axios** : bibliothèque permettant de simplifier la gestion des requêtes HTTP vers des APIs externes, utilisée dans ce projet pour accéder à Nominatim.

### Tests

- **Vitest** : framework de test JavaScript utilisé pour l’exécution des tests unitaires.
- **@testing-library/react** : bibliothèque permettant de tester les composants React en simulant le comportement d’un utilisateur.
- **@testing-library/jest-dom** : permet d’écrire des tests plus lisibles pour vérifier l’interface utilisateur.
- **jsdom** : environnement simulant un navigateur dans Node.js (car Node.js n'a pas de DOM).

### Outils de développement

- **Vite** : outil de développement et de build utilisé pour exécuter et construire l’application React (rechargement à chaud + build optimisé).

## Démo en ligne

L’application est déployée sur Vercel : https://restaurant-map-six.vercel.app

Un correctif Leaflet a été nécessaire pour afficher les icônes en production (leafletFix.js).

## Installation

```bash
git clone https://github.com/zoolookikki/restaurant-map.git
cd restaurant-map
npm install
npm run dev
```

## Tests

npm test

Tests unitaires avec :
- Vitest
- React Testing Library
- user-event

Composants testés :
- Button
- Search
- Overlay

Les appels API sont mockés.

## Déploiement

npm run build

