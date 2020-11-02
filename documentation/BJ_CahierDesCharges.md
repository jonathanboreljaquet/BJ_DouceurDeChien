# Cahier des charges

## Douceur de chien features app

## Description

L'application mobile permet à un éducateur canin ou à un client de se connecter à l'application pour avoir accès à différentes fonctionnalités.
L'éducateur canin a accès à une liste contenant tout ses actuels clients ainsi que leurs différentes informations, telle que :

* Les informations personnelles du client
* Les informations personnelles du chien
* Les contrat signé du client 

Le client quant à lui peut s'enregistrer au préalable sur l'application ou directement avec l'éducateur canin lors de leurs première rencontre.
De ce fait, l'éducateur canin pourra faire signer directement les différents contrats au client avec un smartphone ou une tablette.

Le client aura également la possibilité de se connecter afin de consulter ses informations personnelles et ses différents contrat signés

## Modèle de données
![image database](../database/DB_DouceurDeChien.png)

## Liste des fonctionnalités

#### Éducateur canin

* Connexion
  * Ajout d'un client
  * Recherche d'un client
    * Affichage des informations d'un client 
    * Signature de contrat client en direct
    * Ajout de fichier sur le dossier partagé

#### Client

* Inscription
  * Identifiant
  * Mot de passe
  * Adresse email
* Connexion
  * Affichage des informations 
  * Accès aux fichiers sur le dossier partagé

## Liste des fonctionnalités en mode offline

#### Éducateur canin et client

* Information du client

* Fichier(s) dans le dossier partagé

## Mode offline fonctionnement
##### Méthode de stockage

Local Storage

##### Diagramme de séquence
![image diagram sequence](./diagram/BJ_SequenceDiagram.png)

## Maquettes de l'application
#### Éducateur canin

Insert maquette login

Insert maquette recherche de client par (nom client, nom chien, puce id du chien)

Insert maquette affichage information client

Insert maquette création information client

Insert maquette édition information client

Insert upload fichier dans dossier partagé

#### Client

Insert maquette inscription

Insert maquette login

Insert maquette affichage information client

Insert maquette accès dossier partagé

## Listes des tâches par priorité

## Planning



## Matériel et logiciel

- Ordinateur Windows 10
- IDE (Visual Studio Code)
- Outil de versioning de code (GIT avec repository en ligne sur GitHub)
- Outil bureautique (Typora)
- Éditeur de diagramme ([Visual Paradigm Online](https://online.visual-paradigm.com/fr/))
- Éditeur de base de données ([dbdiagram.io](https://dbdiagram.io/home))










