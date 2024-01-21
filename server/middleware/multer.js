// Importing the multer library for handling file uploads
const multer = require("multer");

// Creating a multer middleware instance with storage set to multer's memoryStorage
const upload = multer({ storage: multer.memoryStorage() });

// Exporting the multer middleware instance for use in other files
module.exports = { multer: upload };
