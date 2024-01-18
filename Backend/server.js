const express = require("express");
const userRouter = require("./Components/Authentication/user");

const app = express();
app.use(express.json());

// Use the user router
app.use("/user", userRouter);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
