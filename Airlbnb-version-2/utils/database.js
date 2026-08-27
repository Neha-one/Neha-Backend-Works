const mysql = require('mysql');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ceoneha01",
  database: "staynest",
});

module.exports = pool.promise();