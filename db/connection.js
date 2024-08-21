const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_management',
    password: 'Negihamachi9!',
    port: 5432,
});

client.connect();

module.exports = client;