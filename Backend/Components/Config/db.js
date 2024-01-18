const mysql = require("mysql2");

// Import the 'dotenv' module to load environment variables from a file
require("dotenv").config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, // MySQL server host
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_DATABASE, // MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };
