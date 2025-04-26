const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "250904",
  database: "QLbh",
});

module.exports = db;
