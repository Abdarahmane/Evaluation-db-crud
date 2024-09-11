const readline = require('readline-sync');
const db = require('./db');

// Validate payment data
function validatePayment(date, amount, payment_method, order_id) {
    let isValid = true;

    if (!date) {
        console.log("Date is required.");
        isValid = false;
    }
    if (amount === undefined || isNaN(amount) || amount <= 0) {
        console.log("Amount must be a positive number.");
        isValid = false;
    }
    if (!payment_method) {
        console.log("Payment Method is required.");
        isValid = false;
    }
    if (order_id === undefined || isNaN(order_id)) {
        console.log("Order ID is required.");
        isValid = false;
    }

    return isValid;
}

// Add a new payment
async function addPayment() {
    const date = readline.question("Date (YYYY-MM-DD): ");
    const amount = parseFloat(readline.question("Amount: "));
    const payment_method = readline.question("Payment Method: ");
    const order_id = readline.questionInt("Order ID: ");

    if (!validatePayment(date, amount, payment_method, order_id)) {
        return;
    }

    try {
        await db.query('INSERT INTO payments (date, amount, payment_method, order_id) VALUES (?, ?, ?, ?)', [date, amount, payment_method, order_id]);
        console.log("Payment successfully added!");
    } catch (err) {
        console.error("Error adding payment:", err.message);
    }
}

// Update an existing payment
async function updatePayment() {
    const id = readline.questionInt("ID of the payment to update: ");

    const date = readline.question("New Date (YYYY-MM-DD): ");
    const amount = parseFloat(readline.question("New Amount: "));
    const payment_method = readline.question("New Payment Method: ");
    const order_id = readline.questionInt("New Order ID: ");

    if (!validatePayment(date, amount, payment_method, order_id)) {
        return;
    }

    try {
        await db.query('UPDATE payments SET date = ?, amount = ?, payment_method = ?, order_id = ? WHERE id = ?', [date, amount, payment_method, order_id, id]);
        console.log("Payment successfully updated!");
    } catch (err) {
        console.error("Error updating payment:", err.message);
    }
}

// Delete a payment
async function deletePayment() {
    const id = readline.questionInt("ID of the payment to delete: ");

    try {
        await db.query('DELETE FROM payments WHERE id = ?', [id]);
        console.log("Payment successfully deleted!");
    } catch (err) {
        console.error('Error deleting payment:', err.message);
    }
}

// Display all payments
async function displayPayments() {
    try {
        const [results] = await db.query('SELECT * FROM payments');
        if (results.length === 0) {
            console.log("No payments found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        console.error('Error displaying payments:', err.message);
    }
}

module.exports = {
    addPayment,
    updatePayment,
    deletePayment,
    displayPayments
};
