
const mysql = require('mysql2');


// Conectamos a la base de datos
var connection = mysql.createPool({
    host: process.env.DBHOST || "us-cdbr-east-06.cleardb.net",
    user: process.env.DBUSER || "b9775a2b0b345d",
    password: process.env.DBPASSWORD || "126d9488",
    database: process.env.DBDATABASE || "heroku_7632f15f2b95b48"
  });

module.exports = connection;
