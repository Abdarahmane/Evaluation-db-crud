
## Analyse et concepton d'une base de données relationnelle


ABC Corporation, une entreprise spécialisée dans l’importation et l’exportation de produits, a historiquement géré ses activités à travers des fichiers Excel. Afin d'améliorer l'efficacité et la gestion des données, l'entreprise a décidé de mettre en place une base de données relationnelle. Ce document détaille les étapes de ce projet, les modèles de données conceptuel et logique, ainsi que les relations définies

## L'organiser du projet est la suivante :

 # Analyse le fichiers excel:
    Identifier les données principales et leur structure.
 # Identification les entités, les attributs et les relations :
    Identifier les entités principales
    Déterminer les attributs pour chaque entité .
    Identifier les relations entre les entités
 # concevoir le dictionnaire de donné (DD)
 # Faire le modele conceptuelle de données (MCD) :
    Utiliser un outil de modélisation de donnée (looping) pour créer le MCD
    Représenter les entités, leurs attributs et les relations entre elles.
    Vérifier la cardinalité des relations (un à un, un à plusieurs, plusieurs à plusieurs).
 # le modele logique de donnée (MLD) :
    Convertir le MCD en MLD.

 # le modele physique de données (MPD) : 
   Ecrire les scripts SQL pour créer de base de donnée, les tables et les relations.
# Prise en main du projet
   pour prendre en main ce projet, suivez les étapes suivantes :

- installé  mysql  Ver 8.4.0 for Win64 on x86_64 sur votre ordinateur
assurez-vous que vous avez installé sur le port par defaut 3306
- ouvrez le terminal ou invite de commande
   faites windows+R et ecrivez cmd pour accedez au terminal
- Connetez-vous à MYSQL 
   ecrivez mysql -u root -p
- Créez une nouvelle base de données
   CREATE DATABASE commerce_db;
   use commerce_db ;
- Créer des Tables (customers ,purchase_orders ,products et order_details) ;

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    address VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE purchase_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    delivery_address VARCHAR(40) NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_id INT,
    product_id INT,
    FOREIGN KEY (order_id) REFERENCES purchase_orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

- faites des test pour verifié que tous marches

# Points d'amélioration :

- Optimisation des index : Ajouter des index pour améliorer les performances des vos requete