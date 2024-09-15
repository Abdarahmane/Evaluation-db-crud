// Import dependencies
const readline = require('readline-sync');
const db = require('./db');

// Error handling function
function displayError(message) {
    console.log("Error: " + message);
}

// Function to validate order details
function validateOrder(date, delivery_address, track_number, status) {
    let isValid = true;

    if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(date)) {
        displayError("Order Date is required and must be in YYYY-MM-DD format.");
        isValid = false;
    }
    if (!delivery_address) {
        displayError("Delivery Address is required.");
        isValid = false;
    }
    if (!track_number) {
        displayError("Track Number is required.");
        isValid = false;
    }
    if (!status) {
        displayError("Order Status is required.");
        isValid = false;
    }

    return isValid;
}

// Function to check if an order exists by ID
async function checkOrderExists(connection, id) {
    try {
        const [results] = await connection.query('SELECT * FROM orders WHERE id = ?', [id]);
        if (results.length === 0) {
            displayError("Order not found.");
            return false;
        }
        return true;
    } catch (err) {
        displayError('Error checking order: ' + err.message);
        return false;
    }
}

// Function to add a new order
async function addOrder(connection) {
    let orderDate, deliveryAddress, trackNumber, status;

    // Validate Order Date
    while (true) {
        orderDate = readline.question("Order Date (YYYY-MM-DD): ");
        if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(orderDate)) {
            displayError("Order Date is required and must be in YYYY-MM-DD format.");
        } else {
            break;
        }
    }

    // Validate Delivery Address
    while (true) {
        deliveryAddress = readline.question("Delivery Address: ");
        if (!deliveryAddress) {
            displayError("Delivery Address is required.");
        } else {
            break;
        }
    }

    // Validate Track Number
    while (true) {
        trackNumber = readline.question("Track Number: ");
        if (!trackNumber) {
            displayError("Track Number is required.");
        } else {
            break;
        }
    }

    // Validate Status
    while (true) {
        status = readline.question("Order Status: ");
        if (!status) {
            displayError("Order Status is required.");
        } else {
            break;
        }
    }

    // Insert order into the database
    try {
        const query = 'INSERT INTO orders (date, delivery_address, track_number, status) VALUES (?, ?, ?, ?)';
        const values = [orderDate, deliveryAddress, trackNumber, status];

        const [result] = await connection.query(query, values);
        const orderId = result.insertId;

        console.log("Order added successfully. Order ID:", orderId);
        await addOrderDetails(connection, orderId);  // Add details to the order

    } catch (error) {
        displayError('Error adding order: ' + error.message);
    }
}

// Function to update an existing order
async function updateOrder(connection) {
    const id = readline.questionInt("ID of the order to update: ");
    
    if (!(await checkOrderExists(connection, id))) return;

    let date, delivery_address, track_number, status;

    // Validate and update fields
    while (true) {
        date = readline.question("New Date (YYYY-MM-DD): ");
        if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(date)) {
            displayError("New Date is required and must be in YYYY-MM-DD format.");
        } else {
            break;
        }
    }
    
    delivery_address = readline.question("New Delivery Address: ");
    track_number = readline.question("New Track Number: ");
    status = readline.question("New Status: ");

    // Update order in the database
    try {
        const query = 'UPDATE orders SET date = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?';
        const values = [date, delivery_address, track_number, status, id];

        const [result] = await connection.query(query, values);
        if (result.affectedRows === 0) {
            console.log("No order updated.");
        } else {
            console.log("Order successfully updated!");
        }
    } catch (err) {
        displayError("Error updating order: " + err.message);
    }
}

// Function to delete an order and its details
async function deleteOrder(connection) {
    const id = readline.questionInt("ID of the order to delete: ");
    
    if (!(await checkOrderExists(connection, id))) return;

    try {
        await connection.query('DELETE FROM order_details WHERE order_id = ?', [id]);
        await connection.query('DELETE FROM orders WHERE id = ?', [id]);
        console.log("Order successfully deleted!");
    } catch (err) {
        displayError('Error deleting order: ' + err.message);
    }
}

// Function to display all orders
async function displayOrders(connection) {
    try {
        const [results] = await connection.query('SELECT * FROM orders');
        if (results.length === 0) {
            console.log("No orders found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        displayError('Error displaying orders: ' + err.message);
    }
}

// Function to add product details to an order
async function addOrderDetails(connection, orderId) {
    while (true) {
        console.log("\nOrder Details Menu:");
        console.log("1. Add a product to the order");
        console.log("2. Save and finish adding details");
        console.log("3. Return to Order Menu");

        const choice = readline.questionInt("Choose an option: ");
        switch (choice) {
            case 1:
                const productId = readline.questionInt("Enter product ID: ");
                const quantity = readline.questionInt("Enter quantity: ");
                const price = readline.questionFloat("Enter price: ");

                if (isNaN(productId) || isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
                    displayError("Invalid input for product ID, quantity, or price.");
                    break;
                }

                try {
                    const query = 'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
                    await connection.query(query, [orderId, productId, quantity, price]);
                    console.log("Product added to order.");
                } catch (err) {
                    displayError("Error adding product: " + err.message);
                }
                break;

            case 2:
                console.log("Order details saved.");
                return;

            case 3:
                console.log("Returning to Order Menu.");
                return;

            default:
                displayError("Invalid option, please try again.");
        }
    }
}

// Export functions
module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    displayOrders,
    addOrderDetails
};
