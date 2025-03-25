const { cloudinaryy } = require("../config/cloudinaryConfig");
const { uploadToCloudinary } = require("../helper/cloudinaryHelper");
const Image = require("../model/imageModal");
const fs = require("fs");
const getAllFile = async (req, res, next) => {
  try {
    // const allImages = await Image.find({ uploadedBy: req.userInfo.userId });
    const allImages = await Image.find();
    res.status(200).json({ data: allImages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "file is required plese upload a file " });
    }
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const uploadingtodb = await Image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    return res.status(200).json({
      fileInfo: uploadingtodb,
      message: "successfully upladed the file  to database ",
    });
  } catch (error) {
    res.status(400).json({ messege: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { imgId } = req.params;
    const { userId, username } = req.userInfo;
    if (!imgId) {
      return res.status(400).json({ message: "image id is required" });
    }

    const deleteableImage = await Image.findById(imgId);
    if (!deleteableImage) {
      return res
        .status(400)
        .json({ message: " no Image found with this image id .  " });
    }
    if (deleteableImage.uploadedBy != userId) {
      return res
        .status(400)
        .json({ message: `this image is not created by ${username} ` });
    }
    const deleteFromCloudinary = await cloudinaryy.uploader.destroy(
      deleteableImage.publicId
    );
    const deleteFromDb = await Image.findByIdAndDelete(imgId);
    const allImageOfthisAdmin = await Image.find({ _id: userId });
    return res.status(200).json({ success: true, allImageOfthisAdmin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllFile, addFile, deleteImage };
