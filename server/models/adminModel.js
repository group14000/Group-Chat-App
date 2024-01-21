// Importing the Sequelize library for working with databases
const Sequelize = require("sequelize");

// Importing the sequelize instance representing the connection to the database
const sequelize = require("../util/database");

// Defining a Sequelize model named "Admin" with specified attributes and their data types
const Admin = sequelize.define("admins", {
  // Setting up an auto-incrementing integer field as the primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // Defining a string field for storing the email of the admin, which cannot be null
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Exporting the Admin model for use in other parts of the application
module.exports = Admin;
