// user.js

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../Config/db");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if the email already exists
    const [existingUser] = await pool
      .promise()
      .execute("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const [result] = await pool
      .promise()
      .execute(
        "INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)",
        [name, email, mobile, hashedPassword]
      );

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: result.insertId }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;

    // Check if the user with the provided email exists
    const [user] = await pool
      .promise()
      .execute("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user[0].id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
