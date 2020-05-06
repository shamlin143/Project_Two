// connection for "Heroku"
var mysql = require("mysql");

require("dotenv").config();
const Heroku_api_Key = process.env.MYSQL_API_KEY;

var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else {
    connection = mysql.createConnection({
    host: "lmag6s0zwmcswp5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.JAWSDB_DB
    });
};


module.exports = connection;