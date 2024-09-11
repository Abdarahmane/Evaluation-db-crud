const readline = require('readline-sync');
const db = require('./db');


async function addProductToOrder(orderId, connection) {
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
async function saveOrderDetails(orderId) {
    try {
        console.log("Saving order details...");

        // Example 1: Update the status of the order to 'Completed'
        await db.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            ['Completed', orderId]
        );

        // Example 2: Ensure all order details are consistent (optional)
        // For example, you might want to check if there are any pending items
        const [orderDetails] = await db.query(
            'SELECT * FROM orderdetails WHERE order_id = ?',
            [orderId]
        );

        if (orderDetails.length === 0) {
            console.warn("Warning: No details found for this order.");
            // Optionally, you might want to set the status to 'Pending' or handle it differently
            await db.query(
                'UPDATE orders SET status = ? WHERE id = ?',
                ['Pending', orderId]
            );
            console.log("Order status set to 'Pending' due to missing details.");
        } else {
            console.log("All order details are present.");
        }

        // Example 3: Add a timestamp for when the order details were finalized (optional)
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await db.query(
            'UPDATE orders SET finalized_date = ? WHERE id = ?',
            [currentDate, orderId]
        );

        console.log("Order details saved successfully.");
    } catch (err) {
        console.error("Error saving order details:", err.message);
    }
}
async function cancelOrderDetails(orderId) {
    try {
        console.log("Canceling order details...");

        // Example 1: Check if the order exists
        const [order] = await db.query(
            'SELECT * FROM orders WHERE id = ?',
            [orderId]
        );

        if (order.length === 0) {
            console.log("Order not found.");
            return;
        }

        // Example 2: Delete all details associated with the order
        await db.query(
            'DELETE FROM orderdetails WHERE order_id = ?',
            [orderId]
        );

        // Example 3: Update the status of the order to 'Canceled'
        await db.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            ['Canceled', orderId]
        );

        console.log("Order details canceled successfully.");
    } catch (err) {
        console.error("Error canceling order details:", err.message);
    }
}

// Function to add a new order
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

// Function to update an existing order
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

// Function to delete an existing order and its details
async function deleteOrder() {
    const id = readline.questionInt("ID of the order to delete: ");

    try {
        // Delete order details first
        await db.query('DELETE FROM orderdetails WHERE order_id = ?', [id]);
        
        // Delete the order itself
        await db.query('DELETE FROM orders WHERE id = ?', [id]);

        console.log("Order successfully deleted!");
    } catch (err) {
        console.error('Error deleting order:', err.message);
    }
}

// Function to display all orders
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

// Function to validate order input
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

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    displayOrders,
    addProductToOrder,
    saveOrderDetails,
    cancelOrderDetails
};
