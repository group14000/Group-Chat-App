// Importing the Group, Message, and Sequelize models
const Group = require("../models/groupModel");
const Message = require("../models/messageModel");
const Sequelize = require("sequelize");

// Controller function to store a text message in a group
exports.storeMessage = async (req, res, next) => {
  // Retrieve the authenticated user from the request object
  const user = req.user;

  // If the user does not exist, send a JSON response with failure and a message
  if (!user) {
    res.json({ success: false, message: "user not found" });
    return;
  }

  // Retrieve the group ID from the request body
  const groupId = req.body.groupId;

  // If the group ID exists, find the group by its ID
  if (groupId) {
    const group = await Group.findAll({ where: { id: groupId } });

    // If the group exists, create a message with the provided details
    if (group) {
      const createMessage = await Message.create({
        message: req.body.message,
        groupId,
        name: user.name,
      });

      // If message creation is successful, send a JSON response with success and a message
      if (createMessage) {
        res.json({ success: true, message: "message sent" });
        return;
      }
    }
  }
};

// Controller function to retrieve messages from a group
exports.getMessage = async (req, res, next) => {
  // Retrieve the authenticated user and group ID from the request object and parameters
  const user = req.user;
  const groupId = req.params.id;

  // Retrieve messages from the group based on the provided parameters
  const messages = await Message.findAll({
    where: {
      groupId,
      id: { [Sequelize.Op.gt]: req.body.msgId },
    },
  });

  // Find the group by its ID
  const group = await Group.findByPk(groupId);

  // Check if the authenticated user is an admin of the group
  const admin = await group.getAdmins({ where: { email: user.email } });

  // If the user is not an admin, send a JSON response with success, messages, and admin status
  if (admin.length === 0) {
    res.json({ success: true, messages, admin: false });
    return;
  }

  // If the user is an admin, send a JSON response with success, messages, and admin status
  res.json({ success: true, messages, admin: true });
};

// Controller function to store an image message in a group
exports.storeImage = async (req, res, next) => {
  try {
    // Retrieve the authenticated user, image file, and group ID from the request object and body
    const user = req.user;
    const image = req.file;
    const { groupId } = req.body;

    // If the user does not exist, send a JSON response with failure and a message
    if (!user) {
      res.json({ success: false, message: "user not found" });
      return;
    }

    // If the group ID exists, find the group by its ID
    if (groupId) {
      const group = await Group.findAll({ where: { id: groupId } });

      // If the group exists, create a message with the image URL
      if (group) {
        const fileName = `Image${user.id}/${new Date()}.jpeg`;
        // Assuming you have another service for image upload instead of S3Service
        // const imgUrl = await YourImageUploadService.upload(image.buffer, fileName);
        const imgUrl = "replace_with_actual_image_url"; // Replace with actual image URL
        const createMessage = await Message.create({
          message: imgUrl,
          groupId,
          name: user.name,
        });

        // If message creation is successful, send a JSON response with success and a message
        if (createMessage) {
          res.json({ success: true, message: "image sent" });
          return;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
