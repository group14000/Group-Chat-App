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

// Create messages table
const createMessagesTable = () => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );`,
    (err, results) => {
      if (err) {
        console.error("Error creating messages table:", err);
      } else {
        console.log("Messages table created successfully");
      }
    }
  );
};

// Initialize database tables
const initializeDatabase = () => {
  createMessagesTable();
  // Add more table creation or initialization logic here if needed
};

initializeDatabase();

module.exports = { pool };
