const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ceoneha01",
  database: "staynest",
});

module.exports = pool.promise();