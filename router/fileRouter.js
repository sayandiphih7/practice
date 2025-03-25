const express = require("express");
const {
  getAllFile,
  addFile,
  deleteImage,
} = require("../controller/fileController");
const { isValidToken } = require("../middleware/tokenValidate");
const { authValidate } = require("../middleware/authorizationValidate");
const storage = require("../middleware/uploadingFileHelper");

const fileRouter = express.Router();

fileRouter
  .route("/:imgId")
  .get(
    isValidToken,
    // authValidate(["normal", "admin"], "only normal is allowed here"),
    getAllFile
  )
  .post(
    isValidToken,
    authValidate(["admin"], "only admin can upload file"),
    storage.single("image"),
    addFile
  )
  .delete(
    isValidToken,
    authValidate(["admin"], "only admin can delete the image"),
    deleteImage
  );

module.exports = { fileRouter };
