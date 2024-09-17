# Gestion des Paiements et Produits pour ABC Corporation

## Description

ABC Corporation, spécialisée dans l'importation et l'exportation de produits, a modernisé sa gestion des commandes en abandonnant Excel au profit d'une base de données relationnelle. Cette application Node.js permet de gérer les commandes, les paiements et les produits associés, avec des opérations CRUD (Create, Read, Update, Delete) pour chaque entité.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **MySQL** : Version 8.4.0 ou supérieure pour Win64 sur x86_64.
- **Node.js** : Version 12 ou supérieure.

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. Clonez le repository :

    ```bash
    git clone https://github.com/Abdarahmane/OrderManager.git
    ```

2. Accédez au dossier du projet :

    ```bash
    cd Order-Manager
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
## Configuration de la Base de Données

 `src/config/db.js` pour configurer la connexion à la base de données 

## Fonctionnalités

1. **Gestion des Commandes**
    - Créer une commande : `createOrder(db, order)`
    - Lister les commandes : `listOrders(db)`
    - Mettre à jour une commande : `updateOrder(db, orderId, newDetails)`
    - Supprimer une commande : `deleteOrder(db, orderId)`

2. **Gestion des Paiements**
    - Créer un paiement : `createPayment(db, payment)`
    - Lire un paiement par ID : `readPaymentById(db, paymentId)`
    - Mettre à jour un paiement : `updatePayment(db, paymentId, newDetails)`
    - Supprimer un paiement : `deletePayment(db, paymentId)`

3. **Gestion des Produits**
    - Créer un produit : `createProduct(db, product)`
    - Lister les produits : `listProducts(db)`
    - Lire un produit par ID : `readProductById(db, productId)`
    - Mettre à jour un produit : `updateProduct(db, productId, newDetails)`
    - Supprimer un produit : `deleteProduct(db, productId)`

4. **Gestion des Clients**
    - Créer un client : `createCustomer(db, customer)`
    - Lister les clients : `listCustomers(db)`
    - Mettre à jour un client : `updateCustomer(db, customerId, newDetails)`
    - Supprimer un client : `deleteCustomer(db, customerId)`

## Auteur

[Abdarahmane Ibrahima Demba](https://github.com/Abdarahmane/OrderManager.git)

