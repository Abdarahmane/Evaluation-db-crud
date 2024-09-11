 
CREATE DATABASE commerce_db;

use commerce_db ;

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

ALTER TABLE customers
MODIFY COLUMN name VARCHAR(255),
MODIFY COLUMN address TEXT,
MODIFY COLUMN email VARCHAR(255),
MODIFY COLUMN phone VARCHAR(20);


ALTER TABLE products
MODIFY COLUMN name VARCHAR(255),
MODIFY COLUMN address TEXT;

ALTER TABLE products
ADD COLUMN category VARCHAR(100) NOT NULL,
ADD COLUMN barcode VARCHAR(50) NOT NULL,
ADD COLUMN status VARCHAR(50) NOT NULL;


ALTER TABLE  orders
MODIFY COLUMN delivery_address TEXT,


ALTER TABLE orders
ADD COLUMN track_number VARCHAR(100) NOT NULL,
ADD COLUMN status VARCHAR(50) NOT NULL;


CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
