const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../Config/db");

const userMessageRouter = express.Router();

const secretKey = "Diganta7908";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

userMessageRouter.post("/send-message", verifyToken, (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  console.log("Received message:", message);

  const sql = "INSERT INTO user_messages (user_id, message) VALUES (?, ?)";
  db.query(sql, [userId, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log("Message stored successfully");
    res.json({ message: "Message sent successfully" });
  });
});

module.exports = userMessageRouter;
