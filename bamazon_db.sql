CREATE DATABASE IF NOT EXISTS bamazon_db;

USE bamazon_db;

CREATE TABLE IF NOT EXISTS products(
	item_number INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(7,2),
    stock INTEGER,
    PRIMARY KEY (item_number)
);

INSERT INTO products (item_number, product_name, department_name, price, stock)
VALUES (800, "Bow and Arrow", "Sport and Outdoor", 399.95, 35);

SELECT * FROM products