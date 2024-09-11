const readline = require('readline-sync');
const db = require('./db');

// Validate product data
function validateProduct(name, description, price, stock, category, barcode, status) {
    let isValid = true;

    if (!name) {
        console.log("Product Name is required.");
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

// Add a new product
async function addProduct() {
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

    try {
        // Corrected table name to 'products'
        await db.query('INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, description, price, stock, category, barcode, status]);
        console.log("Product successfully added!");
    } catch (err) {
        console.error("Error adding product:", err.message);
    }
}

// Update an existing product
async function updateProduct() {
    const id = readline.questionInt("ID of the product to update: ");

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

    try {
        // Corrected table name to 'products'
        await db.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?', [name, description, price, stock, category, barcode, status, id]);
        console.log("Product successfully updated!");
    } catch (err) {
        console.error("Error updating product:", err.message);
    }
}

// Delete a product
async function deleteProduct() {
    const id = readline.questionInt("ID of the product to delete: ");

    try {
        // Corrected table name to 'products'
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        console.log("Product successfully deleted!");
    } catch (err) {
        console.error('Error deleting product:', err.message);
    }
}

// Display all products
async function displayProducts() {
    try {
        // Corrected table name to 'products'
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
