const mysql = require('mysql');

let mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'igreja_mysql'
});

module.exports = mysql_connection;