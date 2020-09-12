const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "partyup",
  dateStrings: 'true',
  multipleStatements: 'true'
});

module.exports = connection;