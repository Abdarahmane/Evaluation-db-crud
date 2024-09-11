const readline = require('readline-sync');
const db = require('./db');
const customers = require('./customersModule');
const products = require('./productsModule');
const purchaseOrders = require('./purchaseOrdersModule');
const payments = require('./paymentsModule');
const { addOrderDetail } = require('./purchaseOrdersModule');

async function principalMenu(connection) {
    console.log("\nPrincipal Menu:");
    console.log("1. Customers");
    console.log("2. Products");
    console.log("3. Purchase Orders");
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
            await purchaseOrderMenu(connection);
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

async function purchaseOrderMenu(connection) {
    console.log("\nPurchase Order Menu:");
    console.log("1. Add a purchase order");
    console.log("2. Update a purchase order");
    console.log("3. Delete a purchase order");
    console.log("4. Display purchase orders");
    console.log("5. Manage order details");
    console.log("6. Back to Principal Menu");

    const choice = readline.questionInt("Choose an option: ");
    try {
        switch (choice) {
            case 1:
                await purchaseOrders.addPurchaseOrder(connection);
                break;
            case 2:
                await purchaseOrders.updatePurchaseOrder(connection);
                break;
            case 3:
                await purchaseOrders.deletePurchaseOrder(connection);
                break;
            case 4:
                await purchaseOrders.displayPurchaseOrders(connection);
                break;
            case 5:
                await orderDetailsMenu(connection);
                break;
            case 6:
                return; 
            default:
                console.log("Invalid option, please try again.");
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    await purchaseOrderMenu(connection); 
}

// Order Details Sub-Menu
async function orderDetailsMenu(connection) {
    console.log("\nOrder Details Menu:");
    console.log("1. Add an order detail");
    console.log("2. Back to Purchase Order Menu");

    const choice = readline.questionInt("Choose an option: ");
    try {
        switch (choice) {
            case 1:
                const purchaseOrderId = readline.questionInt("Enter the Purchase Order ID: ");
                await addOrderDetail(purchaseOrderId);
                break;
            case 2:
                return; 
            default:
                console.log("Invalid option, please try again.");
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    await orderDetailsMenu(connection); 
}

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

async function startApp() {
    try {
        const connection = await db.connectToDB();
        await principalMenu(connection);
    } catch (err) {
        console.error('Error starting application:', err);
    }
}

startApp();
