const readline = require('readline-sync');
const db = require('../config/db');


function validateDate(date) {
    if (!date) {
        return "Date is required.";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return "Invalid date format. Use YYYY-MM-DD.";
    }
    return null;
}


function validateAmount(amount) {
    if (amount === undefined || isNaN(amount) || amount <= 0) {
        return "Amount must be a positive number.";
    }
    return null;
}

function validatePaymentMethod(payment_method) {
    if (!payment_method) {
        return "Payment Method is required.";
    }
    return null;
}


function validateOrderId(order_id) {
    if (order_id === undefined || isNaN(order_id)) {
        return "Order ID must be a number.";
    }
    return null;
}

async function paymentExists(id) {
    try {
        const [rows] = await db.query('SELECT id FROM payments WHERE id = ?', [id]);
        return rows.length > 0;
    } catch (err) {
        console.error("Error checking payment existence:", err.message);
        return false;
    }
}


async function addPayment() {
    let date, amount, payment_method, order_id;

    while (true) {
        date = readline.question("Date (YYYY-MM-DD): ");
        const error = validateDate(date);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    while (true) {
        amount = parseFloat(readline.question("Amount: "));
        const error = validateAmount(amount);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    while (true) {
        payment_method = readline.question("Payment Method: ");
        const error = validatePaymentMethod(payment_method);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    while (true) {
        order_id = readline.questionInt("Order ID: ");
        const error = validateOrderId(order_id);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    try {
        await db.query('INSERT INTO payments (date, amount, payment_method, order_id) VALUES (?, ?, ?, ?)', [date, amount, payment_method, order_id]);
        console.log("Payment successfully added!");
    } catch (err) {
        console.error("Error adding payment:", err.message);
    }
}


async function updatePayment() {
    let id, date, amount, payment_method, order_id;

    id = readline.questionInt("ID of the payment to update: ");
    if (isNaN(id) || id <= 0) {
        console.log("Invalid ID. Must be a positive number.");
        return;
    }

    const exists = await paymentExists(id);
    if (!exists) {
        console.log("Payment ID does not exist.");
        return;
    }

    while (true) {
        date = readline.question("New Date (YYYY-MM-DD): ");
        const error = validateDate(date);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    while (true) {
        amount = parseFloat(readline.question("New Amount: "));
        const error = validateAmount(amount);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    while (true) {
        payment_method = readline.question("New Payment Method: ");
        const error = validatePaymentMethod(payment_method);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    while (true) {
        order_id = readline.questionInt("New Order ID: ");
        const error = validateOrderId(order_id);
        if (error) {
            console.log(error);
        } else {
            break;
        }
    }

    try {
        await db.query('UPDATE payments SET date = ?, amount = ?, payment_method = ?, order_id = ? WHERE id = ?', [date, amount, payment_method, order_id, id]);
        console.log("Payment successfully updated!");
    } catch (err) {
        console.error("Error updating payment:", err.message);
    }
}


async function deletePayment() {
    const id = readline.questionInt("ID of the payment to delete: ");

    if (isNaN(id) || id <= 0) {
        console.log("Invalid ID. Must be a positive number.");
        return;
    }

    const exists = await paymentExists(id);
    if (!exists) {
        console.log("Payment ID does not exist.");
        return;
    }

    try {
        await db.query('DELETE FROM payments WHERE id = ?', [id]);
        console.log("Payment successfully deleted!");
    } catch (err) {
        console.error('Error deleting payment:', err.message);
    }
}


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
