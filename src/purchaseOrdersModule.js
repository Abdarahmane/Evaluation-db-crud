const readline = require('readline-sync');
const db = require('./db');

// Function to add product to a specific purchase order
async function addOrderDetail(purchaseOrderId) {
    const productName = readline.question("Enter product name: ");
    const quantity = readline.questionInt("Enter quantity: ");
    const price = readline.questionFloat("Enter price: ");

    try {
        await db.query(
            'INSERT INTO OrderDetails (purchase_order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)', 
            [purchaseOrderId, productName, quantity, price]
        );
        console.log("Product added to order.");
    } catch (err) {
        console.error("Error adding product:", err.message);
    }
}

// Existing functions
function validatePurchaseOrder(datetime, delivery_address, track_number, status) {
    let isValid = true;

    if (!datetime) {
        console.log("Order DateTime is required.");
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

async function addPurchaseOrder() {
    const datetime = readline.question("Order DateTime (YYYY-MM-DD HH:MM:SS): ");
    const delivery_address = readline.question("Delivery Address: ");
    const track_number = readline.question("Track Number: ");
    const status = readline.question("Order Status: ");

    if (!validatePurchaseOrder(datetime, delivery_address, track_number, status)) {
        return;
    }

    try {
        const result = await db.query(
            'INSERT INTO PurchaseOrder (datetime, delivery_address, track_number, status) VALUES (?, ?, ?, ?)', 
            [datetime, delivery_address, track_number, status]
        );
        const purchaseOrderId = result.insertId; // Get the ID of the newly created purchase order
        console.log("Purchase order successfully added!");

        // Add order details for this purchase order
        await addOrderDetail(purchaseOrderId);

    } catch (err) {
        console.error("Error adding purchase order:", err.message);
    }
}

async function updatePurchaseOrder() {
    const id = readline.questionInt("ID of the order to update: ");

    const datetime = readline.question("New DateTime (YYYY-MM-DD HH:MM:SS): ");
    const delivery_address = readline.question("New Delivery Address: ");
    const track_number = readline.question("New Track Number: ");
    const status = readline.question("New Status: ");

    if (!validatePurchaseOrder(datetime, delivery_address, track_number, status)) {
        return;
    }

    try {
        await db.query('UPDATE PurchaseOrder SET datetime = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?', [datetime, delivery_address, track_number, status, id]);
        console.log("Purchase order successfully updated!");
    } catch (err) {
        console.error("Error updating purchase order:", err.message);
    }
}

async function deletePurchaseOrder() {
    const id = readline.questionInt("ID of the order to delete: ");

    try {
        await db.query('DELETE FROM PurchaseOrder WHERE id = ?', [id]);
        console.log("Purchase order successfully deleted!");
    } catch (err) {
        console.error('Error deleting purchase order:', err.message);
    }
}

async function displayPurchaseOrders() {
    try {
        const results = await db.query('SELECT * FROM PurchaseOrder');
        if (results.length === 0) {
            console.log("No purchase orders found.");
        } else {
            console.table(results);
        }
    } catch (err) {
        console.error('Error displaying purchase orders:', err.message);
    }
}

module.exports = {
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    displayPurchaseOrders,
    addOrderDetail,  // Export the function
};



// const readline = require('readline-sync');
// const db = require('./db');
// const { addProduct } = require('./productsModule');



// function validatePurchaseOrder(datetime, delivery_address, track_number, status) {
//     let isValid = true;

//     if (!datetime) {
//         console.log("Order DateTime is required.");
//         isValid = false;
//     }
//     if (!delivery_address) {
//         console.log("Delivery Address is required.");
//         isValid = false;
//     }
//     if (!track_number) {
//         console.log("Track Number is required.");
//         isValid = false;
//     }
//     if (!status) {
//         console.log("Order Status is required.");
//         isValid = false;
//     }

//     return isValid;
// }
// async function addPurchaseOrder() {
//     const datetime = readline.question("Order DateTime (YYYY-MM-DD HH:MM:SS): ");
//     const delivery_address = readline.question("Delivery Address: ");
//     const track_number = readline.question("Track Number: ");
//     const status = readline.question("Order Status: ");

//     if (!validatePurchaseOrder(datetime, delivery_address, track_number, status)) {
//         return;
//     }

//     try {
//         const result = await db.query(
//             'INSERT INTO PurchaseOrder (datetime, delivery_address, track_number, status) VALUES (?, ?, ?, ?)', 
//             [datetime, delivery_address, track_number, status]
//         );
//         const purchaseOrderId = result.insertId; // Get the ID of the newly created purchase order
//         console.log("Purchase order successfully added!");

//         // Add order details for this purchase order
//         await addOrderDetail(purchaseOrderId);

//     } catch (err) {
//         console.error("Error adding purchase order:", err.message);
//     }
// }



// async function addPurchaseOrder() {
//     const datetime = readline.question("Order DateTime (YYYY-MM-DD HH:MM:SS): ");
//     const delivery_address = readline.question("Delivery Address: ");
//     const track_number = readline.question("Track Number: ");
//     const status = readline.question("Order Status: ");

//     if (!validatePurchaseOrder(datetime, delivery_address, track_number, status)) {
//         return;
//     }

//     try {
//         await db.query('INSERT INTO PurchaseOrder (datetime, delivery_address, track_number, status) VALUES (?, ?, ?, ?)', [datetime, delivery_address, track_number, status]);
//         console.log("Purchase order successfully added!");
//     } catch (err) {
//         console.error("Error adding purchase order:", err.message);
//     }
// }


// async function updatePurchaseOrder() {
//     const id = readline.questionInt("ID of the order to update: ");

//     const datetime = readline.question("New DateTime (YYYY-MM-DD HH:MM:SS): ");
//     const delivery_address = readline.question("New Delivery Address: ");
//     const track_number = readline.question("New Track Number: ");
//     const status = readline.question("New Status: ");

//     if (!validatePurchaseOrder(datetime, delivery_address, track_number, status)) {
//         return;
//     }

//     try {
//         await db.query('UPDATE PurchaseOrder SET datetime = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?', [datetime, delivery_address, track_number, status, id]);
//         console.log("Purchase order successfully updated!");
//     } catch (err) {
//         console.error("Error updating purchase order:", err.message);
//     }
// }

// async function deletePurchaseOrder() {
//     const id = readline.questionInt("ID of the order to delete: ");

//     try {
//         await db.query('DELETE FROM PurchaseOrder WHERE id = ?', [id]);
//         console.log("Purchase order successfully deleted!");
//     } catch (err) {
//         console.error('Error deleting purchase order:', err.message);
//     }
// }


// // async function addProduct(connection) {
// //     const productName = readline.question("Enter product name: ");
// //     const quantity = readline.questionInt("Enter quantity: ");
// //     const price = readline.questionFloat("Enter price: ");

// //     try {
// //         await connection.query('INSERT INTO OrderDetails (product_name, quantity, price) VALUES (?, ?, ?)', [productName, quantity, price]);
// //         console.log("Product added to order.");
// //     } catch (err) {
// //         console.error("Error adding product:", err.message);
// //     }
// // }

// // async function save(connection) {
// //     // Implémente la logique pour sauvegarder les détails de la commande
// //     console.log("Order details saved successfully.");
// // }


// async function displayPurchaseOrders() {
//     try {
//         const results = await db.query('SELECT * FROM PurchaseOrder');
//         if (results.length === 0) {
//             console.log("No purchase orders found.");
//         } else {
//             console.table(results);
//         }
//     } catch (err) {
//         console.error('Error displaying purchase orders:', err.message);
//     }
// }

// module.exports = {
//     addPurchaseOrder,
//     updatePurchaseOrder,
//     deletePurchaseOrder,
//     displayPurchaseOrders,
//     addOrderDetail,  // Export the function if needed elsewhere
//     saveOrderDetails

// };




