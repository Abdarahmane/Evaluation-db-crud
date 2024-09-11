
const readline = require('readline-sync');
const db = require('./db');
const customers = require('./customersModule');
const products = require('./productsModule');
const orders = require('./ordersModule');
const payments = require('./paymentsModule');
const {addProductToOrder , saveOrderDetails, cancelOrderDetails } = require('./ordersModule'); // Import the missing functions


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
            await orderMenu(connection); // Corrected function name
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

async function orderMenu(connection) {
    console.log("\n Order Menu:");
    console.log("1. Add an order");
    console.log("2. Update an order");
    console.log("3. Delete an order");
    console.log("4. Display orders");
    console.log("5. Manage order details");
    console.log("6. Back to Principal Menu");

    const choice = readline.questionInt("Choose an option: ");
    try {
        switch (choice) {
            case 1:
                await addOrder(connection);
                break;
            case 2:
                await updateOrder(connection);
                break;
            case 3:
                await deleteOrder(connection);
                break;
            case 4:
                await displayOrders(connection);
                break;
            case 5:
                const orderId = readline.questionInt("Enter the order ID to manage details: ");
                await orderDetailsMenu(orderId, connection); // Correct function call
                break;
            case 6:
                return; 
            default:
                console.log("Invalid option, please try again.");
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    await orderMenu(connection); 
}


async function orderDetailsMenu(orderId, connection) {
    while (true) {
        console.log("\nOrder Details Menu:");
        console.log("11. Add a product to the order");
        console.log("12. Save order details");
        console.log("13. Cancel order details");
        console.log("14. Exit to previous menu");

        const choice = readline.questionInt("Choose an option: ");
        try {
            switch (choice) {
                case 11:
                    await addProductToOrder(orderId, connection);
                    break;
                case 12:
                    await saveOrderDetails(orderId); // Removed unnecessary connection parameter
                    break;
                case 13:
                    await cancelOrderDetails(orderId); // Ensure orderId is passed correctly
                    break;
                case 14:
                    return; // Exit to previous menu
                default:
                    console.log("Invalid option, please try again.");
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
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
