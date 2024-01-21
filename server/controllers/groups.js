// Importing the Admin, Group, and User models from their respective files
const Admin = require("../models/adminModel");
const Group = require("../models/groupModel");
const User = require("../models/userModel");

// Controller function to get groups associated with the authenticated user
exports.getGroups = async (req, res, next) => {
  // Retrieve the authenticated user from the request object
  const user = req.user;

  // Check if the user exists
  if (user) {
    // Retrieve groups associated with the user
    const groups = await user.getGroups();

    // If groups exist, send a JSON response with success and the groups
    if (groups) {
      res.json({ success: true, groups });
    }
  }
};

// Controller function to create a new group for the authenticated user
exports.createGroup = async (req, res, next) => {
  // Retrieve the authenticated user and group name from the request object
  const user = req.user;
  const { name } = req.body;

  // Create a new group for the user with the specified name
  const created = await user.createGroup({ name });

  // Create an admin associated with the user's email and add them to the created group
  const createAdmin = await Admin.create({ email: user.email });
  await created.addAdmin(createAdmin);

  // If group creation is successful, send a JSON response with success and a message
  if (created) {
    res.json({ success: true, message: "group created" });
  }
};

// Controller function to add a user to a group
exports.addUser = async (req, res, next) => {
  // Retrieve group ID and user email from the request body
  const { groupId, email } = req.body;

  // Find the group by its ID
  const group = await Group.findByPk(groupId);

  // Find all users with the specified email
  const user = await User.findAll({ where: { email } });

  // If the user is not found, send a JSON response with failure and a message
  if (user.length === 0) {
    res.json({ success: false, message: "user not found" });
    return;
  } else {
    // Add the user to the group
    await group.addUser(user);
    res.json({ success: true, message: "user added" });
  }
};

// Controller function to get members (admins and users) of a group
exports.getMembers = async (req, res, next) => {
  // Retrieve the group ID from the request parameters
  const groupId = req.params.groupId;

  // Find the group by its ID
  const group = await Group.findByPk(groupId);

  // If the group exists, retrieve admins and users associated with the group
  if (group) {
    const admins = await group.getAdmins();
    const users = await group.getUsers();

    // Send a JSON response with success, admins, and users
    res.json({ success: true, admins, users });
    return;
  }

  // If the group does not exist, send a JSON response with failure and a message
  res.json({ success: false, message: "group does not exist" });
};

// Controller function to make a user an admin of a group
exports.makeAdmin = async (req, res, next) => {
  // Retrieve group ID and user ID from the request parameters and body
  const groupId = req.params.groupId;
  const userId = req.body.userId;

  // Find the group and user by their respective IDs
  const group = await Group.findByPk(groupId);
  const user = await User.findByPk(userId);

  // If both group and user exist, create an admin associated with the user's email and add them to the group
  if (group && user) {
    group.createAdmin({ email: user.email });
    res.json({ success: true, message: "Admin updated" });
    return;
  }

  // If user or group not found, send a JSON response with failure and a message
  res.json({ success: false, message: "user or group not found!" });
};

// Controller function to delete a user from a group
exports.deleteUser = async (req, res, next) => {
  // Retrieve group ID and user details from the request parameters and body
  const groupId = req.params.groupId;
  const { email, isadmin } = req.body;

  // Find the group by its ID
  const group = await Group.findByPk(groupId);

  // If the user is an admin, find and destroy the admin, then remove the user from the group
  if (isadmin) {
    const admin = await group.getAdmins({ where: { email } });
    const user = await group.getUsers({ where: { email } });
    await admin[0].destroy();

    // If the user exists, remove them from the group
    if (user) {
      const removed = await group.removeUser(user);

      // If removal is successful, send a JSON response with success and a message
      if (removed) {
        res.json({ success: true, message: "user removed from group" });
      }
    }
  } else {
    // If the user is not an admin, simply remove them from the group
    const user = await group.getUsers({ where: { email } });

    // If removal is successful, send a JSON response with success and a message
    if (user) {
      const removed = await group.removeUser(user);
      if (removed) {
        res.json({ success: true, message: "user removed from group" });
      }
    }
  }
};
