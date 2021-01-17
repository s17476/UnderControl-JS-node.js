const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'node',
    database: 'undercontrol',
    password: 'node'
})

module.exports = pool.promise();