const readline = require('readline-sync');
const db = require('./db');

// Valider les données de la commande
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

// Vérifier si une commande existe
async function checkOrderExists(connection, id) {
    try {
        const [results] = await connection.query('SELECT * FROM orders WHERE id = ?', [id]);
        if (results.length === 0) {
            console.log("Order not found.");
            return false;
        }
        return true;
    } catch (err) {
        console.error('Error checking order:', err.message);
        return false;
    }
}

// Ajouter une nouvelle commande
async function addOrder(connection) {
    try {
        const orderDate = readline.question("Order Date (YYYY-MM-DD ): ");
        const delivery_Address = readline.question("Delivery Address: ");
        const track_number = readline.question("Track Number: ");
        const status = readline.question("Order Status : ");

        if (!validateOrder(orderDate, delivery_Address, track_number, status)) {
            return;
        }

        const orderQuery = 'INSERT INTO orders (date, delivery_address, track_number, status) VALUES (?, ?, ?, ?)';
        const orderValues = [orderDate, delivery_Address, track_number, status];

        const [result] = await connection.query(orderQuery, orderValues);
        const orderId = result.insertId;

        console.log("Order added successfully. Order ID:", orderId);

        // Ajouter les détails de la commande
        await addOrderDetails(connection, orderId);

    } catch (error) {
        console.error('Error adding order:', error.message);
    }
}

// Mettre à jour une commande existante
async function updateOrder(connection) {
    const id = readline.questionInt("ID of the order to update: ");

    const exists = await checkOrderExists(connection, id);
    if (!exists) {
        return;
    }

    const date = readline.question("New Date (YYYY-MM-DD ): ");
    const delivery_address = readline.question("New Delivery Address: ");
    const track_number = readline.question("New Track Number: ");
    const status = readline.question("New Status : ");

    if (!validateOrder(date, delivery_address, track_number, status)) {
        return;
    }

    try {
        const [result] = await connection.query(
            'UPDATE orders SET date = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?', 
            [date, delivery_address, track_number, status, id]
        );
        if (result.affectedRows === 0) {
            console.log("No order updated.");
        } else {
            console.log("Order successfully updated!");
        }
    } catch (err) {
        console.error("Error updating order:", err.message);
    }
}

// Supprimer une commande existante et ses détails
async function deleteOrder(connection) {
    const id = readline.questionInt("ID of the order to delete: ");

    const exists = await checkOrderExists(connection, id);
    if (!exists) {
        return;
    }

    try {
        await connection.query('DELETE FROM order_details WHERE order_id = ?', [id]);
        await connection.query('DELETE FROM orders WHERE id = ?', [id]);
        console.log("Order successfully deleted!");
    } catch (err) {
        console.error('Error deleting order:', err.message);
    }
}

// Afficher toutes les commandes
async function displayOrders(connection) {
    try {
        const [results] = await connection.query('SELECT * FROM orders');
        if (results.length === 0) {
            console.log("No orders found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        console.error('Error displaying orders:', err.message);
    }
}

// Ajouter un produit à une commande
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
                    console.log("Invalid input for product ID, quantity, or price. Please try again.");
                    break;
                }

                try {
                    await connection.query(
                        'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                        [orderId, productId, quantity, price]
                    );
                    console.log("Product added to order.");
                } catch (err) {
                    console.error("Error adding product:", err.message);
                }
                break;

            case 2:
                console.log("Order details saved.");
                return;

            case 3:
                console.log("Returning to Order Menu.");
                return;

            default:
                console.log("Invalid option, please try again.");
        }
    }
}

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    displayOrders,
    addOrderDetails
};
