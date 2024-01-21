// Loading environment variables from a .env file
require("dotenv").config();

// Importing necessary modules and libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const { CronJob } = require("cron");

// Importing the Sequelize instance representing the connection to the database
const sequelize = require("./util/database");

// Extracting the port from the environment variables
const port = process.env.PORT;

// Creating an Express application
const app = express();

// Adding middleware for enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Adding middleware for parsing JSON requests
app.use(bodyParser.json());

// Importing and using route handlers for user, message, and group operations
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const groupRoutes = require("./routes/groupRoutes");
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/group", groupRoutes);

// Defining associations between User, Group, Message, Admin, and Archieved models
const User = require("./models/userModel");
const Message = require("./models/messageModel");
const Group = require("./models/groupModel");
const Admin = require("./models/adminModel");
const Archieved = require("./models/archievedModel");

User.belongsToMany(Group, { through: "usergroups" });
Group.belongsToMany(User, { through: "usergroups" });

Group.hasMany(Message);
Message.belongsTo(Group);

Group.hasMany(Admin);
Admin.belongsTo(Group);

// Creating and scheduling a cron job to move messages to the Archieved table daily
console.log("Before job instantiation");
const job = new CronJob(
  "0 05 00 * * *", // cron expression for 00:05 AM every day
  async function () {
    const today = new Date().getDate();
    const messages = await Message.findAll();

    // Iterating through messages to check if they were created yesterday
    messages.map(async (data) => {
      const createdat = new Date(data.createdAt).getDate();
      if (createdat === today - 1) {
        // Creating a new Archieved record and removing the message from the Message table
        await Archieved.create({ message: data.message, name: data.name });
        await Message.destroy({ where: { id: data.id } });
      }
    });
  },
  null,
  true,
  "Asia/Kolkata" // Setting the timezone for the cron job
);
console.log("After job instantiation");

// Synchronizing the Sequelize models with the database and starting the server
sequelize.sync().then(() => {
  const server = http.createServer(app);

  // Setting up a Socket.IO server with CORS configuration
  const io = socketIO(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  // Handling socket connections and disconnections
  io.on("connection", (socket) => {
    console.log(socket.id);

    // Handling the "send-message" event and emitting "recieve-message" to the specified room
    socket.on("send-message", (message, room) => {
      if (room) {
        socket.to(room).emit("recieve-message", message);
      }
    });

    // Handling the "join-room" event and making the socket join the specified room
    socket.on("join-room", (room) => {
      socket.join(room);
    });

    // Handling socket disconnection and logging the event
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Starting the HTTP server and logging the port on which the server is running
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
