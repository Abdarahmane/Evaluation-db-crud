
const readline = require('readline-sync');
const db = require('./config/db');
const customers = require('./models/customerModul');
const products = require('./models/productModul');
const orders = require('./models/orderModul');
const payments = require('./models/paymentModul');
 

// Menu Principal
async function principalMenu(connection) {
    console.log("\nPrincipal Menu:");
    console.log("1. Customers");
    console.log("2. Products");
    console.log("3. Orders");
    console.log("4. Payments");
    console.log("5. Exit");

    const choice = readline.questionInt("Choose a section: ");
    switch (choice) {
        case 1:
            await customerMenu(connection);
            break;
        case 2:
            await productMenu(connection);
            break;
        case 3:
            await orderMenu(connection);
            break;
        case 4:
            await paymentMenu(connection);
            break;
        case 5:
            console.log("Goodbye!");
            connection.end();
            return;
        default:
            console.log("Invalid option, please try again.");
    }
    await principalMenu(connection);
}

// Menu des Commandes
async function orderMenu(connection) {
    console.log("\nOrder Menu:");
    console.log("1. Add an order");
    console.log("2. Update an order");
    console.log("3. Delete an order");
    console.log("4. Display orders");
    console.log("5. Back to Principal Menu");

    const choice = readline.questionInt("Choose an option: ");
    try {
        switch (choice) {
            case 1:
                await orders.addOrder(connection);
                break;
            case 2:
                await orders.updateOrder(connection);
                break;
            case 3:
                await orders.deleteOrder(connection);
                break;
            case 4:
                await orders.displayOrders(connection);
                break;
            
            case 5:
                return;
            default:
                console.log("Invalid option, please try again.");
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    await orderMenu(connection);
}

// Menu des Détails de Commande
async function orderDetailMenu(connection, orderId) {
    try {
        while (true) {
            console.log("\nOrder Details Menu:");
            console.log("11. Add a product to the order");
            console.log("12. Save and finish adding details");
            console.log("13. Return to Order Menu");

            const choice = readline.questionInt("Choose an option: ");
            switch (choice) {
                case 1:
                    // Ajouter un produit à la commande
                    const productId = readline.questionInt("Enter product ID: ");
                    const quantity = readline.questionInt("Enter quantity: ");

                    // Validation des données
                    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
                        console.log("Invalid product ID or quantity. Please try again.");
                        break;
                    }

                    // Préparer la requête d'insertion pour les détails de la commande
                    const detailsQuery = 'INSERT INTO order_Details (order_Id, product_Id, quantity) VALUES (?, ?, ?)';
                    const detailsValues = [orderId, productId, quantity];

                    try {
                        await db.query(detailsQuery, detailsValues);
                        console.log("Product added to order.");
                    } catch (err) {
                        console.error('Error executing query:', err.message);
                    }
                    break;

                case 2:
                    // Enregistrer et finir l'ajout des détails de la commande
                    console.log("Order details saved.");
                    return;

                case 3:
                    // Retourner au menu des commandes
                    console.log("Returning to Order Menu.");
                    return;

                default:
                    console.log("Invalid option, please try again.");
            }
        }
    } catch (error) {
        console.error('Error adding order details:', error.message);
    }
}

// Menu des Clients
async function customerMenu(connection) {
    console.log("\nCustomer Menu:");
    console.log("1. Add a customer");
    console.log("2. Update a customer");
    console.log("3. Delete a customer");
    console.log("4. Display customers");
    console.log("5. Back to Principal Menu");

    const choice = readline.questionInt("Choose an option: ");
    try {
        switch (choice) {
            case 1:
                await customers.addCustomer(connection);
                break;
            case 2:
                await customers.updateCustomer(connection);
                break;
            case 3:
                await customers.deleteCustomer(connection);
                break;
            case 4:
                await customers.displayCustomers(connection);
                break;
            case 5:
                return; 
            default:
                console.log("Invalid option, please try again.");
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    await customerMenu(connection); 
}

// Menu des Produits
async function productMenu(connection) {
    console.log("\nProduct Menu:");
    console.log("1. Add a product");
    console.log("2. Update a product");
    console.log("3. Delete a product");
    console.log("4. Display products");
    console.log("5. Back to Principal Menu");

    const choice = readline.questionInt("Choose an option: ");
    try {
        switch (choice) {
            case 1:
                await products.addProduct(connection);
                break;
            case 2:
                await products.updateProduct(connection);
                break;
            case 3:
                await products.deleteProduct(connection);
                break;
            case 4:
                await products.displayProducts(connection);
                break;
            case 5:
                return; 
            default:
                console.log("Invalid option, please try again.");
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    await productMenu(connection); 
}



// Menu des Paiements
async function paymentMenu(connection) {
    console.log("\nPayment Menu:");
    console.log("1. Add a payment");
    console.log("2. Update a payment");
    console.log("3. Delete a payment");
    console.log("4. Display payments");
    console.log("5. Back to Principal Menu");

    const choice = readline.questionInt("Choose an option: ");
    try {
        switch (choice) {
            case 1:
                await payments.addPayment(connection);
                break;
            case 2:
                await payments.updatePayment(connection);
                break;
            case 3:
                await payments.deletePayment(connection);
                break;
            case 4:
                await payments.displayPayments(connection);
                break;
            case 5:
                return; 
            default:
                console.log("Invalid option, please try again.");
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    await paymentMenu(connection); 
}

// Fonction pour démarrer l'application
async function startApp() {
    try {
        const connection = await db.connectToDB();
        await principalMenu(connection);
    } catch (err) {
        console.error('Error starting application:', err);
    }
}

startApp();
