const express = require("express");
const {
  getAllUser,
  createUser,
  loginUser,
  changePassword,
} = require("../controller/userController");
const { isValidToken } = require("../middleware/tokenValidate");
const { authValidate } = require("../middleware/authorizationValidate");

const userRouter = express.Router();

userRouter.route("/").get(isValidToken, getAllUser).post(createUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/changePass").post(isValidToken, changePassword);

module.exports = { userRouter };
