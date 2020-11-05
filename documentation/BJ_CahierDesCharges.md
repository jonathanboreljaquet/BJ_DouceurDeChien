# Cahier des charges

## Douceur de chien Features app

## Description

L'application mobile permet à un éducateur canin ou à un client de se connecter à l'application pour avoir accès à différentes fonctionnalités.
L'éducateur canin a accès à une liste contenant tous ses actuels clients ainsi que leurs différentes informations, telle que :

* Les informations personnelles du client
* Les informations personnelles du chien
* Les contrats signés du client 

Le client quant à lui peut s'enregistrer au préalable sur l'application ou directement avec l'éducateur canin lors de leur première rencontre.
De ce fait, l'éducateur canin pourra faire signer directement les différents contrats au client avec un smartphone ou une tablette.

Le client aura également la possibilité de se connecter afin de consulter ses informations personnelles et ses différents contrats signés.

## Modèle de données

![image database](../database/DB_DouceurDeChien.png)

<table>
    <tr>
    	<th style="text-align:center" COLSPAN="4">user</th>
    </tr>
    <tr>
        <th>Nom</th>
        <th>Type</th>
        <th>Null</th>
        <th>Définition</th>
    </tr>
    <tr>
        <td>email</td>
        <td>varchar</td>
        <td>not null</td>
        <td>Addresse email du client.</td>
    </tr>
    <tr>
        <td>firstname</td>
        <td>varchar</td>
        <td>not null</td>
        <td>Prénom du client.</td>
    </tr>
    <tr>
        <td>secondname</td>
        <td>varchar</td>
        <td>not null</td>
        <td>Nom du client.</td>
    </tr>
    <tr>
        <td>password_iteration_count</td>
        <td>int</td>
        <td>not null</td>
        <td>Nombre d'itération pour l'encryptage du mot de passe avec PBKDF2.</td>
    </tr>
    <tr>
        <td>password_salt</td>
        <td>varchar</td>
        <td>not null</td>
        <td>Donnée de salage du mot de passe.</td>
    </tr>
    <tr>
        <td>password_hash</td>
        <td>varchar</td>
        <td>not null</td>
        <td>Mot de passe hashé.</td>
    </tr>
    <tr>
        <td>isAdministrator</td>
        <td>boolean</td>
        <td>not null</td>
        <td>Booléan définisant le rôle de l'utilisateur.</td>
    </tr>

   <table>
    <tr>
    	<th style="text-align:center" COLSPAN="4">document</th>
    </tr>
    <tr>
        <th>Nom</th>
        <th>Type</th>
        <th>Null</th>
        <th>Définition</th>
    </tr>
    <tr>
        <td>type</td>
        <td>type_document</td>
        <td>not null</td>
        <td>Type de document (conditions d'inscription, poster, résumé du cours canin,ect...) .</td>
    </tr>
    <tr>
        <td>path</td>
        <td>varchar</td>
        <td>not null</td>
        <td>Chemin d'accès du document.</td>
    </tr>

   <table>
    <tr>
    	<th style="text-align:center" COLSPAN="4">dog</th>
    </tr>
    <tr>
        <th>Nom</th>
        <th>Type</th>
        <th>Null</th>
        <th>Définition</th>
    </tr>
    <tr>
        <td>chip_id</td>
        <td>varchar</td>
        <td>null</td>
        <td>Code composé de 15 chiffres (3 pour le pays, 2 pour le type d'animal, 2 pour le fabricant, 8 pour le n° de l'animal).</td>
    </tr>
    <tr>
        <td>name</td>
        <td>varchar</td>
        <td>not null</td>
        <td>Nom du chien.</td>
    </tr>

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

##### Scénarios

1. Rendez-vous au préalable indépendamment de l'application
2. Rencontre physique entre l'éducateur canin et le client
   1. Si première rencontre, alors création du compte client
3. Complétion des informations du contrat ainsi que de la signature depuis l'application
4. Ajout dans le dossier partagé de l'éducateur et du client
5. Téléchargement du contrat PDF depuis le dossier partagé

## Maquettes de l'application
#### Utilisateur

![image login](./model/login.png)

#### Éducateur canin

![image admin research](./model/adminresearch.png)
![image admin show client](./model/adminshowspecificclient.png)
![image admin edit client](./model/admineditclient.png)
![image admin add contract](./model/adminaddcontract.png)

#### Client

![image inscription](./model/inscription.png)
![image inscription](./model/clientshowinformation.png)

## Listes des tâches par priorité

| **Tâches**                                                   | **Priorité** | **Estimation de temps en période** | MVP  |
| ------------------------------------------------------------ | ------------ | ---------------------------------- | ---- |
| Publication                                                  | 6            | 8                                  | Oui  |
| Créer la base de données                                     | 3            | 2                                  | Oui  |
| Créer la page d'inscription                                  | 5            | 4                                  | Oui  |
| Créer la page de connexion                                   | 4            | 2                                  | Oui  |
| Créer la page de recherche d'utilisateur pour les administrateurs | 7            | 2                                  | Non  |
| Créer la page de consultation des informations de l'utilisateur pour client et administrateur \(info \+ fichier partagé\) | 2            | 12                                 | Oui  |
| Créer la page d'édition du client                            | 8            | 2                                  | Non  |
| Créer la page de création de contrat                         | 1            | 8                                  | Oui  |
| Tests et résolution de bugs                                  | 9            | 8                                  | Non  |


## Planning

![image planning](./planning/BJ_Planning.PNG)

## Matériel et logiciel

- Ordinateur Windows 10
- IDE (Visual Studio Code)
- Outil de versioning de code (GIT avec repository en ligne sur GitHub)
- Outil bureautique ([Typora](https://typora.io/))
- Éditeur de diagramme ([Visual Paradigm Online](https://online.visual-paradigm.com/fr/))
- Éditeur de base de données ([dbdiagram.io](https://dbdiagram.io/home))
- Éditeur de maquette ([Pencil](https://pencil.evolus.vn/))

## Librairies utilisées

* Création de pdf en PHP ([TCPDF](https://tcpdf.org/examples/))
* Dessiner dans un canevas ([responsive-sketchpad](https://github.com/tsand/responsive-sketchpad))
* Encryption de mot de passe ([PBKDF2](https://github.com/padloc/cordova-plugin-pbkdf2))









