# Gestion des Paiements et Produits pour ABC Corporation

## Description

ABC Corporation, spécialisée dans l'importation et l'exportation de produits, a modernisé sa gestion des commandes en abandonnant Excel au profit d'une base de données relationnelle. Cette application Node.js permet de gérer les commandes, les paiements, et les produits associés, avec des opérations CRUD (Create, Read, Update, Delete) pour chaque entité.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **MySQL** : Version 8.4.0 ou supérieure pour Win64 sur x86_64.
- **Node.js** : Version 12 ou supérieure.

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. Clonez le repository :

    ```bash
    git clone https://github.com/Abdarahmane/Evaluation-db-crud.git
    ```

2. Accédez au dossier du projet :

    ```bash
    cd Evaluation-db-crud
    ```

3. Installez les dépendances :

    ```bash
    npm install
    ```

    *(Cette commande installera toutes les dépendances nécessaires listées dans le fichier `package.json`.)*

## Utilisation

Pour démarrer l'application en mode console, exécutez la commande suivante :

```bash
node ./src/app.js
```
# Fonctionnalités

## 1. Gestion des Commandes

- **Fonction : `createOrder(db, order)`**
  - Crée une nouvelle commande dans la base de données.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `order` (Object) : Détails de la commande.
      - `orderId` (Int) : ID unique de la commande.
      - `customerId` (Int) : ID du client.
      - `orderDate` (Date) : Date de la commande.
      - `status` (String) : Statut de la commande.

- **Fonction : `listOrders(db)`**
  - Liste toutes les commandes existantes dans la base de données.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
  - **Retour :** Tableau des commandes.

- **Fonction : `updateOrder(db, orderId, newDetails)`**
  - Met à jour les détails d'une commande existante.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `orderId` (Int) : ID de la commande à mettre à jour.
    - `newDetails` (Object) : Détails à mettre à jour.
  - **Retour :** Commande mise à jour ou null si la commande n'existe pas.

- **Fonction : `deleteOrder(db, orderId)`**
  - Supprime une commande par son ID.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `orderId` (Int) : ID de la commande à supprimer.
  - **Retour :** Aucun.

## 2. Gestion des Paiements

- **Fonction : `createPayment(db, payment)`**
  - Crée un nouveau paiement pour une commande.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `payment` (Object) : Détails du paiement.
      - `paymentId` (Int) : ID unique du paiement.
      - `orderId` (Int) : ID de la commande associée.
      - `paymentDate` (Date) : Date du paiement.
      - `amount` (Number) : Montant payé.
      - `paymentMethod` (String) : Méthode de paiement.
      - `paymentStatus` (String) : État du paiement.
  - **Retour :** ID du paiement créé.

- **Fonction : `readPaymentById(db, paymentId)`**
  - Lit un paiement par son ID.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `paymentId` (Int) : ID du paiement.
  - **Retour :** Détails du paiement ou null si le paiement n'existe pas.

- **Fonction : `updatePayment(db, paymentId, newDetails)`**
  - Met à jour les détails d'un paiement existant.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `paymentId` (Int) : ID du paiement à mettre à jour.
    - `newDetails` (Object) : Détails à mettre à jour.
  - **Retour :** Paiement mis à jour ou null si le paiement n'existe pas.

- **Fonction : `deletePayment(db, paymentId)`**
  - Supprime un paiement par son ID.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `paymentId` (Int) : ID du paiement à supprimer.
  - **Retour :** Aucun.

## 3. Gestion des Produits

- **Fonction : `createProduct(db, product)`**
  - Crée un nouveau produit dans la base de données.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `product` (Object) : Détails du produit.
      - `productId` (Int) : ID unique du produit.
      - `name` (String) : Nom du produit.
      - `description` (String) : Description du produit.
      - `price` (Number) : Prix du produit.
      - `stock` (Int) : Quantité en stock.
  - **Retour :** ID du produit créé.

- **Fonction : `listProducts(db)`**
  - Liste tous les produits existants dans la base de données.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
  - **Retour :** Tableau des produits.

- **Fonction : `readProductById(db, productId)`**
  - Lit un produit par son ID.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `productId` (Int) : ID du produit.
  - **Retour :** Détails du produit ou null si le produit n'existe pas.

- **Fonction : `updateProduct(db, productId, newDetails)`**
  - Met à jour les détails d'un produit existant.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `productId` (Int) : ID du produit à mettre à jour.
    - `newDetails` (Object) : Détails à mettre à jour.
  - **Retour :** Produit mis à jour ou null si le produit n'existe pas.

- **Fonction : `deleteProduct(db, productId)`**
  - Supprime un produit par son ID.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `productId` (Int) : ID du produit à supprimer.
  - **Retour :** Aucun.

## 4. Gestion des Clients

- **Fonction : `createCustomer(db, customer)`**
  - Crée un nouveau client dans la base de données.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `customer` (Object) : Détails du client.
      - `customerId` (Int) : ID unique du client.
      - `name` (String) : Nom du client.
      - `contactInfo` (String) : Informations de contact du client.
  - **Retour :** ID du client créé.

- **Fonction : `listCustomers(db)`**
  - Liste tous les clients existants dans la base de données.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
  - **Retour :** Tableau des clients.

- **Fonction : `updateCustomer(db, customerId, newDetails)`**
  - Met à jour les détails d'un client existant.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `customerId` (Int) : ID du client à mettre à jour.
    - `newDetails` (Object) : Détails à mettre à jour.
  - **Retour :** Client mis à jour ou null si le client n'existe pas.

- **Fonction : `deleteCustomer(db, customerId)`**
  - Supprime un client par son ID.
  - **Paramètres :**
    - `db` (Object) : Instance de la base de données.
    - `customerId` (Int) : ID du client à supprimer.
  - **Retour :** Aucun.

## Gestion des Exceptions

Pour garantir la fiabilité de l'application, une gestion rigoureuse des exceptions est intégrée. Les erreurs courantes telles que les erreurs de saisie, les erreurs de connexion à la base de données, et les erreurs liées aux opérations CRUD sont traitées pour fournir des messages d'erreur appropriés et éviter les pannes inattendues.
 
 ## Auteur
 [Abdarahmane Ibrahima Demba](https://github.com/Abdarahmane/Evaluation-db-crud.git)