const readline = require('readline-sync');
const db = require('./db');

// Validate customer data
function validateCustomer(name, email, address, phone) {
    let isValid = true;

    if (!name) {
        console.log("Customer Name is required.");
        isValid = false;
    }
    if (!email) {
        console.log("Customer Email is required.");
        isValid = false;
    }
    if (!address) {
        console.log("Address is required.");
        isValid = false;
    }
    if (!phone) {
        console.log("Phone Number is required.");
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        console.log("Invalid email address.");
        isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^\d+$/; // Only digits allowed
    if (phone && (!phoneRegex.test(phone) || phone.length < 10)) {
        console.log("Phone number must be numeric and at least 10 digits long.");
        isValid = false;
    }

    return isValid;
}

// Add a new customer
async function addCustomer() {
    const name = readline.question("Customer Name: ");
    const email = readline.question("Customer Email: ");
    const address = readline.question("Address: ");
    const phone = readline.question("Phone Number: ");

    if (!validateCustomer(name, email, address, phone)) {
        return;
    }

    try {
        await db.query('INSERT INTO Customers (name, email, address, phone) VALUES (?, ?, ?, ?)', [name, email, address, phone]);
        console.log("Customer successfully added!");
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error("A customer with this email or phone number already exists.");
        } else {
            console.error("Error adding customer:", err.message);
        }
    }
}

// Check if a customer exists
async function checkCustomerExists(id) {
    try {
        const results = await db.query('SELECT * FROM Customers WHERE id = ?', [id]);
        if (results.length === 0) {
            console.log("Customer not found.");
            return false;
        }
        return true;
    } catch (err) {
        console.error('Error checking customer:', err.message);
        return false;
    }
}

// Update an existing customer
async function updateCustomer() {
    const id = readline.questionInt("ID of the customer to update: ");

    const exists = await checkCustomerExists(id);
    if (!exists) {
        return;
    }

    const name = readline.question("New Name: ");
    const email = readline.question("New Email: ");
    const address = readline.question("New Address: ");
    const phone = readline.question("New Phone Number: ");

    if (!validateCustomer(name, email, address, phone)) {
        return;
    }

    try {
        await db.query('UPDATE Customers SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?', [name, email, address, phone, id]);
        console.log("Customer successfully updated!");
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error("A customer with this email or phone number already exists.");
        } else {
            console.error("Error updating customer:", err.message);
        }
    }
}

// Delete a customer
async function deleteCustomer() {
    const id = readline.questionInt("ID of the customer to delete: ");

    const exists = await checkCustomerExists(id);
    if (!exists) {
        return;
    }

    try {
        await db.query('DELETE FROM Customers WHERE id = ?', [id]);
        console.log("Customer successfully deleted!");
    } catch (err) {
        console.error('Error deleting customer:', err.message);
    }
}

// Display all customers
async function displayCustomers() {
    try {
        const results = await db.query('SELECT * FROM Customers');
        if (results.length === 0) {
            console.log("No customers found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        console.error('Error displaying customers:', err.message);
    }
}

module.exports = {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    displayCustomers
};
