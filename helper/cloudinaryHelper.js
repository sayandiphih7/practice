const { cloudinaryy } = require("../config/cloudinaryConfig");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinaryy.uploader.upload(filePath);
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.log(error);
    console.warn("error while uploading to cloudinary");
    throw new Error("error while uploading to cloudinary");
  }
};

module.exports = { uploadToCloudinary };
