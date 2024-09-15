const mysql = require('mysql2/promise');

// Créer une connexion à la base de données
async function connectToDB() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'C17065',
            database: 'commerce_db'
        });
        console.log('Connected to the database.');
        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
}

async function query(sql, params) {
    const connection = await connectToDB();
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    } finally {
        await connection.end(); // Ferme la connexion après chaque requête pour éviter les fuites
    }
}

module.exports = {
    connectToDB,
    query
};
