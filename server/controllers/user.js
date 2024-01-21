// Importing the User model, bcrypt for password hashing, and jwt for token generation
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller function for user registration (sign up)
exports.signUp = (req, res, next) => {
  // Destructuring user details from the request body
  const { name, email, phone, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !password) {
    res.json({ success: false, message: "please fill all fields" });
    return;
  } else {
    // Hash the password using bcrypt with a salt factor of 10
    bcrypt.hash(password, 10, async (err, hashValue) => {
      if (err) {
        res.json({ success: false, message: "something went wrong" });
        return;
      } else {
        try {
          // Create a new user with the hashed password
          await User.create({ name, email, phone, password: hashValue });
          res
            .status(200)
            .json({ success: true, message: "user created successfully" });
          return;
        } catch (err) {
          // If user creation fails, the user already exists
          res.json({ success: false, message: "user exists" });
          return;
        }
      }
    });
  }
};

// Helper function to generate a JWT token based on user ID
const generateToken = (id) => {
  return jwt.sign(id, process.env.JWTTOKEN);
};

// Controller function for user login
exports.login = async (req, res, next) => {
  // Destructuring email and password from the request body
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    res.json({ success: false, message: "please fill all fields" });
    return;
  } else {
    // Find the user with the provided email
    const user = await User.findAll({ where: { email } });

    // If the user does not exist, send a failure response
    if (user.length === 0) {
      res.json({ success: false, message: "user not found" });
      return;
    } else {
      // Compare the provided password with the hashed password stored in the database
      bcrypt.compare(password, user[0].password, async (err, response) => {
        if (err) {
          res.json({ success: false, message: "something went wrong" });
          return;
        } else if (response) {
          // If password is correct, generate a JWT token and send a success response
          const token = generateToken(user[0].id);
          res.json({ success: true, message: "Login success", token });
          return;
        } else {
          // If password is incorrect, send a failure response
          res.json({ success: false, message: "incorrect password" });
          return;
        }
      });
    }
  }
};
