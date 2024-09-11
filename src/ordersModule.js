const readline = require('readline-sync');
const db = require('./db');

// Function to add product to a specific order
async function addOrderDetail(orderId) {
    const productId = readline.questionInt("Enter product ID: ");
    const quantity = readline.questionInt("Enter quantity: ");
    const price = readline.questionFloat("Enter price: ");

    try {
        await db.query(
            'INSERT INTO orderdetails (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', 
            [orderId, productId, quantity, price]
        );
        console.log("Product added to order.");
    } catch (err) {
        console.error("Error adding product:", err.message);
    }
}

function validateOrder(date, delivery_address, track_number, status) {
    let isValid = true;

    if (!date) {
        console.log("Order Date is required.");
        isValid = false;
    }
    if (!delivery_address) {
        console.log("Delivery Address is required.");
        isValid = false;
    }
    if (!track_number) {
        console.log("Track Number is required.");
        isValid = false;
    }
    if (!status) {
        console.log("Order Status is required.");
        isValid = false;
    }

    return isValid;
}

async function addOrder() {
    const date = readline.question("Order Date (YYYY-MM-DD HH:MM:SS): ");
    const delivery_address = readline.question("Delivery Address: ");
    const track_number = readline.question("Track Number: ");
    const status = readline.question("Order Status: ");

    if (!validateOrder(date, delivery_address, track_number, status)) {
        return;
    }

    try {
        const result = await db.query(
            'INSERT INTO orders (date, delivery_address, track_number, status) VALUES (?, ?, ?, ?)', 
            [date, delivery_address, track_number, status]
        );
        const orderId = result.insertId; // Get the ID of the newly created order
        console.log("Order successfully added!");

        // Add order details for this order
        await addOrderDetail(orderId);

    } catch (err) {
        console.error("Error adding order:", err.message);
    }
}

async function updateOrder() {
    const id = readline.questionInt("ID of the order to update: ");

    const date = readline.question("New Date (YYYY-MM-DD HH:MM:SS): ");
    const delivery_address = readline.question("New Delivery Address: ");
    const track_number = readline.question("New Track Number: ");
    const status = readline.question("New Status: ");

    if (!validateOrder(date, delivery_address, track_number, status)) {
        return;
    }

    try {
        await db.query('UPDATE orders SET date = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?', 
                       [date, delivery_address, track_number, status, id]);
        console.log("Order successfully updated!");
    } catch (err) {
        console.error("Error updating order:", err.message);
    }
}

async function deleteOrder() {
    const id = readline.questionInt("ID of the order to delete: ");

    try {
        await db.query('DELETE FROM orders WHERE id = ?', [id]);
        console.log("Order successfully deleted!");
    } catch (err) {
        console.error('Error deleting order:', err.message);
    }
}

async function displayOrders() {
    try {
        const results = await db.query('SELECT * FROM orders');
        if (results.length === 0) {
            console.log("No orders found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        console.error('Error displaying orders:', err.message);
    }
}

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    displayOrders,
    addOrderDetail,
};
