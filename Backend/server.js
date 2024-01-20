const express = require("express");
const cors = require("cors");
const userRouter = require("./Components/Authentication/user");
const userMessageRouter = require("./Components/Message/userMessage");

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Use the user router
app.use("/user", userRouter);
app.use("/message", userMessageRouter); // Use the userMessage router for messages

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
