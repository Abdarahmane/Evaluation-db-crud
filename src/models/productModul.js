

const readline = require('readline-sync');
const db = require('../config/db');

// Centralize error handling
function displayError(message) {
    console.error("Error: " + message);
}

// Validate product data
function validateProduct(name, description, price, stock, category, barcode, status) {
    let isValid = true;

    // Validate name (only letters and spaces)
    if (!name) {
        displayError("Product Name is required.");
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        displayError("Product Name must contain only letters and spaces.");
        isValid = false;
    }

    // Validate description
    if (!description) {
        displayError("Product Description is required.");
        isValid = false;
    }

    // Validate price (positive number)
    if (price === undefined || isNaN(price) || price <= 0) {
        displayError("Product Price must be a positive number.");
        isValid = false;
    }

    // Validate stock (non-negative integer)
    if (stock === undefined || isNaN(stock) || stock < 0) {
        displayError("Product Stock must be a non-negative integer.");
        isValid = false;
    }

    // Validate category
    if (!category) {
        displayError("Product Category is required.");
        isValid = false;
    }

    // Validate barcode
    if (!barcode) {
        displayError("Product Barcode is required.");
        isValid = false;
    }

    // Validate status
    if (!status) {
        displayError("Product Status is required.");
        isValid = false;
    }

    return isValid;
}

// Check if product exists by ID
async function checkProductExists(id) {
    try {
        const results = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return results.length > 0;
    } catch (err) {
        displayError('Error checking product existence: ' + err.message);
        return false;
    }
}

// Add a new product
async function addProduct() {
    try {
        const name = readline.question("Product Name: ");
        const description = readline.question("Product Description: ");
        const price = parseFloat(readline.question("Product Price: "));
        const stock = parseInt(readline.question("Product Stock: "));
        const category = readline.question("Product Category: ");
        const barcode = readline.question("Product Barcode: ");
        const status = readline.question("Product Status: ");

        if (!validateProduct(name, description, price, stock, category, barcode, status)) {
            return;
        }

        await db.query(
            'INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, stock, category, barcode, status]
        );
        console.log("Product successfully added!");
    } catch (err) {
        displayError("Error adding product: " + err.message);
    }
}

// Update an existing product
async function updateProduct() {
    try {
        const id = readline.questionInt("ID of the product to update: ");
        if (!await checkProductExists(id)) {
            displayError("Product with this ID does not exist.");
            return;
        }

        const name = readline.question("New Name: ");
        const description = readline.question("New Description: ");
        const price = parseFloat(readline.question("New Price: "));
        const stock = parseInt(readline.question("New Stock: "));
        const category = readline.question("New Category: ");
        const barcode = readline.question("New Barcode: ");
        const status = readline.question("New Status: ");

        if (!validateProduct(name, description, price, stock, category, barcode, status)) {
            return;
        }

        await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?',
            [name, description, price, stock, category, barcode, status, id]
        );
        console.log("Product successfully updated!");
    } catch (err) {
        displayError("Error updating product: " + err.message);
    }
}

async function deleteProduct() {
    try {
        const id = readline.questionInt("ID of the product to delete: ");
        if (!await checkProductExists(id)) {
            displayError(`Product with ID ID does not exist.`);
            return;
        }

        await db.query('DELETE FROM products WHERE id = ?', [id]);
        console.log("Product successfully deleted!");
    } catch (err) {
        displayError('Error deleting product: ' + err.message);
    }
}


async function displayProducts() {
    try {
        const results = await db.query('SELECT * FROM products');
        
        if (results.length === 0) {
            displayError("No products found.");
        } else {
            console.table(results);  // Utilise console.table pour un affichage propre et automatique
        }
    } catch (err) {
        displayError('Error displaying products: ' + err.message);
    }
}


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    displayProducts
};
