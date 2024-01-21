// Importing the jsonwebtoken library for JWT operations and the User model
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware function for authentication using JWT
const Authentication = async (req, res, next) => {
  try {
    // Retrieve the token from the "Authorization" header in the request
    const token = req.header("Authorization");

    // Verify the token using the secret key (process.env.JWTTOKEN)
    const userId = jwt.verify(token, process.env.JWTTOKEN);

    // Find the user by their ID in the database
    const user = await User.findByPk(userId);

    // Attach the user object to the request object for use in subsequent middleware or routes
    req.user = user;

    // Continue with the next middleware or route
    next();
  } catch (err) {
    // If an error occurs during the authentication process, log the error
    console.log(err);
  }
};

// Export the Authentication middleware for use in other files
module.exports = Authentication;
