const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { pool } = require("../Config/db");

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, "Diganta7908");
    const userId = decoded.userId;

    // Check if the user exists in the database
    const [user] = await pool
      .promise()
      .execute("SELECT * FROM users WHERE id = ?", [userId]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid token. User not found." });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid token." });
  }
};

// API endpoint to save the message
router.post("/save-message", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const message = req.body.message;

  pool.query(
    "INSERT INTO messages (user_id, message) VALUES (?, ?)",
    [userId, message],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving message" });
      }

      return res.status(200).json({ message: "Message saved successfully" });
    }
  );
});

module.exports = router;
