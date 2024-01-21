// Importing the Sequelize library for working with databases
const Sequelize = require("sequelize");

// Importing the sequelize instance representing the connection to the database
const sequelize = require("../util/database");

// Defining a Sequelize model named "User" with specified attributes and their data types
const User = sequelize.define("users", {
  // Setting up an auto-incrementing integer field as the primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // Defining a string field for storing the user's name, which cannot be null
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Defining a string field for storing the user's email, which cannot be null and must be unique
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  // Defining a bigint field for storing the user's phone number, which cannot be null
  phone: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  // Defining a string field for storing the user's password, which cannot be null
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Exporting the User model for use in other parts of the application
module.exports = User;
