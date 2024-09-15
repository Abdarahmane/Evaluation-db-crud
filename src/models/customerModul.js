const readline = require('readline-sync');
const db = require('../config/db');

// Centralize error handling
function displayError(message) {
    console.error("Error: " + message);
}

// Validate customer data
function validateCustomer(name, email, address, phone) {
    let isValid = true;

    // Validate name (only letters and spaces)
    if (!name) {
        displayError("Customer Name is required.");
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        displayError("Name must contain only letters and spaces.");
        isValid = false;
    }

    // Validate email
    if (!email) {
        displayError("Customer Email is required.");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        displayError("Invalid email address.");
        isValid = false;
    }

    // Validate address
    if (!address) {
        displayError("Address is required.");
        isValid = false;
    }

    // Validate phone number
    if (!phone) {
        displayError("Phone Number is required.");
        isValid = false;
    } else if (!/^\d+$/.test(phone) || phone.length > 20) {
        displayError("Phone number must be numeric and cannot exceed 20 digits.");
        isValid = false;
    }

    return isValid;
}

// Check if email or phone exists
async function checkUnique(email, phone, excludeId = null) {
    try {
        const results = await db.query(
            'SELECT * FROM Customers WHERE (email = ? OR phone = ?)' + (excludeId ? ' AND id != ?' : ''),
            excludeId ? [email, phone, excludeId] : [email, phone]
        );
        return results.length > 0;
    } catch (err) {
        displayError('Error checking uniqueness: ' + err.message);
        return false;
    }
}

// Check if customer exists by ID
async function checkCustomerExists(id) {
    try {
        const results = await db.query('SELECT * FROM Customers WHERE id = ?', [id]);
        return results.length > 0;
    } catch (err) {
        displayError('Error checking customer existence: ' + err.message);
        return false;
    }
}

// Add a new customer
async function addCustomer() {
    try {
        const name = readline.question("Customer Name: ");
        const email = readline.question("Customer Email: ");
        const address = readline.question("Address: ");
        const phone = readline.question("Phone Number: ");

        if (!validateCustomer(name, email, address, phone)) {
            return;
        }

        if (await checkUnique(email, phone)) {
            displayError("A customer with this email or phone number already exists.");
            return;
        }

        await db.query('INSERT INTO Customers (name, email, address, phone) VALUES (?, ?, ?, ?)', [name, email, address, phone]);
        console.log("Customer successfully added!");
    } catch (err) {
        displayError("Error adding customer: " + err.message);
    }
}

// Update an existing customer
async function updateCustomer() {
    try {
        const id = readline.questionInt("ID of the customer to update: ");
        if (!await checkCustomerExists(id)) {
            displayError("Customer with this ID does not exist.");
            return;
        }

        const name = readline.question("New Name: ");
        const email = readline.question("New Email: ");
        const address = readline.question("New Address: ");
        const phone = readline.question("New Phone Number: ");

        if (!validateCustomer(name, email, address, phone)) {
            return;
        }

        if (await checkUnique(email, phone, id)) {
            displayError("A customer with this email or phone number already exists.");
            return;
        }

        await db.query('UPDATE Customers SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?', [name, email, address, phone, id]);
        console.log("Customer successfully updated!");
    } catch (err) {
        displayError("Error updating customer: " + err.message);
    }
}

// Delete a customer
async function deleteCustomer() {
    try {
        const id = readline.questionInt("ID of the customer to delete: ");
        if (!await checkCustomerExists(id)) {
            displayError("Customer with this ID does not exist.");
            return;
        }

        await db.query('DELETE FROM Customers WHERE id = ?', [id]);
        console.log("Customer successfully deleted!");
    } catch (err) {
        displayError("Error deleting customer: " + err.message);
    }
}

// Display all customers
async function displayCustomers() {
    try {
        const results = await db.query('SELECT * FROM Customers');
        if (results.length === 0) {
            displayError("No customers found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        displayError('Error displaying customers: ' + err.message);
    }
}

module.exports = {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    displayCustomers
};
