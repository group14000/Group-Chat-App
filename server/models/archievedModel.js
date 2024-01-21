// Importing the Sequelize library for working with databases
const Sequelize = require("sequelize");

// Importing the sequelize instance representing the connection to the database
const sequelize = require("../util/database");

// Defining a Sequelize model named "Archieved" with specified attributes and their data types
const Archieved = sequelize.define("archieved", {
  // Setting up an auto-incrementing integer field as the primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // Defining a string field for storing the message, which cannot be null
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Defining a string field for storing the name, which cannot be null
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Exporting the Archieved model for use in other parts of the application
module.exports = Archieved;
