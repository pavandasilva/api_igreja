const mysql = require('mysql');

let mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'd$fdikUUidoOPJ0onHjl',
    database: 'igreja_demo'
});

module.exports = mysql_connection;