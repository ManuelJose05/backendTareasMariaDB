const mariadb = require('mariadb');

async function connect() {
    try {
        const connection = await mariadb.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'backendTareas'
        });
        return connection;
    } catch (error) {
        console.error('Error al conectar a MariaDb:', error);
        throw error;
    }
}

module.exports = {
    connect
}