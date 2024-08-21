const { Client } = require('pg');

const client = new Client({
    user: 'yourUsername',
    host: 'localhost',
    database: 'employee_management',
    password: 'yourPassword',
    port: 5432,
});

client.connect();

module.exports = client;