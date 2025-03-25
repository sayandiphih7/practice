const cloudinaryy = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinaryy.config({
  cloud_name: process.env.cloudinaryName,
  api_key: process.env.cloudinaryApiKey,
  api_secret: process.env.cloudinaryApiSecret,
});

module.exports = { cloudinaryy };
