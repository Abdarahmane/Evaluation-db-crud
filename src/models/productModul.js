const readline = require('readline-sync');
const db = require('../config/db');

function validateProduct(name, description, price, stock, category, barcode, status) {
    let isValid = true;

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name) {
        console.log("Product Name is required.");
        isValid = false;
    } else if (!nameRegex.test(name)) {
        console.log("Product Name must contain only letters and spaces.");
        isValid = false;
    }

    if (!description) {
        console.log("Product Description is required.");
        isValid = false;
    }

    if (price === undefined || isNaN(price) || price <= 0) {
        console.log("Product Price must be a positive number.");
        isValid = false;
    }

    if (stock === undefined || isNaN(stock) || stock < 0) {
        console.log("Product Stock must be a non-negative integer.");
        isValid = false;
    }

    if (!category) {
        console.log("Product Category is required.");
        isValid = false;
    }

    if (!barcode) {
        console.log("Product Barcode is required.");
        isValid = false;
    }

    if (!status) {
        console.log("Product Status is required.");
        isValid = false;
    }

    return isValid;
}

async function addProduct() {
    let name;
    while (true) {
        name = readline.question("Product Name: ");
        if (/^[A-Za-z\s]+$/.test(name)) {
            break;
        } else {
            console.log("Product Name must contain only letters and spaces. Please try again.");
        }
    }

    const description = readline.question("Product Description: ");
    
    let price;
    while (true) {
        price = parseFloat(readline.question("Product Price: "));
        if (!isNaN(price) && price > 0) {
            break;
        } else {
            console.log("Product Price must be a positive number. Please try again.");
        }
    }

    let stock;
    while (true) {
        stock = parseInt(readline.question("Product Stock: "));
        if (!isNaN(stock) && stock >= 0) {
            break;
        } else {
            console.log("Product Stock must be a non-negative integer. Please try again.");
        }
    }

    const category = readline.question("Product Category: ");
    const barcode = readline.question("Product Barcode: ");
    const status = readline.question("Product Status: ");

    if (!validateProduct(name, description, price, stock, category, barcode, status)) {
        return;
    }

    try {
        await db.query(
            'INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, stock, category, barcode, status]
        );
        console.log("Product successfully added!");
    } catch (err) {
        console.error("Error adding product:", err.message);
    }
}

async function updateProduct() {
    const id = readline.questionInt("ID of the product to update: ");

    let name;
    while (true) {
        name = readline.question("New Name: ");
        if (/^[A-Za-z\s]+$/.test(name)) {
            break;
        } else {
            console.log("Product Name must contain only letters and spaces. Please try again.");
        }
    }

    const description = readline.question("New Description: ");
    
    let price;
    while (true) {
        price = parseFloat(readline.question("New Price: "));
        if (!isNaN(price) && price > 0) {
            break;
        } else {
            console.log("Product Price must be a positive number. Please try again.");
        }
    }

    let stock;
    while (true) {
        stock = parseInt(readline.question("New Stock: "));
        if (!isNaN(stock) && stock >= 0) {
            break;
        } else {
            console.log("Product Stock must be a non-negative integer. Please try again.");
        }
    }

    const category = readline.question("New Category: ");
    const barcode = readline.question("New Barcode: ");
    const status = readline.question("New Status: ");

    if (!validateProduct(name, description, price, stock, category, barcode, status)) {
        return;
    }

    try {
        await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?',
            [name, description, price, stock, category, barcode, status, id]
        );
        console.log("Product successfully updated!");
    } catch (err) {
        console.error("Error updating product:", err.message);
    }
}

async function deleteProduct() {
    const id = readline.questionInt("ID of the product to delete: ");

    try {
        const [orderDetails] = await db.query('SELECT id FROM order_details WHERE product_id = ?', [id]);

        if (Array.isArray(orderDetails) && orderDetails.length > 0) {
            console.log("There are order details associated with this product.");
            console.table(orderDetails);
            
            const confirm = readline.keyInYNStrict('Do you want to delete these order details as well?');
            if (confirm) {
                await db.query('DELETE FROM order_details WHERE product_id = ?', [id]);
                console.log("Order details deleted.");
            } else {
                console.log("Product deletion aborted.");
                return;
            }
        }

        await db.query('DELETE FROM products WHERE id = ?', [id]);
        console.log("Product successfully deleted!");
    } catch (err) {
        console.error('Error deleting product:', err.message);
    }
}

async function displayProducts() {
    try {
        const [results] = await db.query('SELECT * FROM products');
        if (results.length === 0) {
            console.log("No products found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        console.error('Error displaying products:', err.message);
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    displayProducts
};
