const { User } = require("../model/adminModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ErrorHandelerClass } = require("../middleware/errorHandeler");
const getAllUser = async (req, res) => {
  try {
    const { userInfo } = req;
    console.log(process.env.mode);
    // const pageNumber = parseInt(req.quary.pageNumber) || 1;
    // const dataLimit = parseInt(req.quary.dataLimit) || 2;
    // const skip = pageNumber - 1 * skip;
    // const sortBy = req.quary.sortBy || "name";
    // const sortOrder = req.quary.sortOrder == "asc" ? 1 : -1;
    // const totalUser = await User.countDocuments();
    // const totalPages = Math.ceil(totalUser / dataLimit);

    // const allUser = await User.find().sort({ name: 11 }).skip(1).limit(2);
    const allUser = await User.aggregate([
      {
        $match: {
          $expr: { $gt: [{ $strLenCP: "$name" }, 2] },
        },
      },
    ]);

    res
      .status(200)
      .cookie("cookieKey", "testingCookievalue", {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: process.env.mode == "development" ? "lax" : "none",
        secure: process.env.mode == "development" ? false : true,
      })
      .json({
        data: allUser,
        currentUserInfo: userInfo,
        length: allUser.length,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name.a, email, password, role);
    if (!name || !email || !password) {
      // res.status(400).json({ messege: "please provide all the credential" });
      return next(
        new ErrorHandelerClass("please provide all the credential", 454)
      );
    }

    const alreadyHas = await User.findOne({ $or: [{ name }, { email }] });
    if (alreadyHas) {
      return res
        .status(400)
        .json({ messege: "already has member with this name or email" });
    }
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      role,
      password: hassPassword,
    });

    return res.status(200).json({ newUser });
  } catch (error) {
    return next(error);
    // return next(new ErrorHandelerClass(error));
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "please provided the name and email" });
    }

    const theUser = await User.findOne({ name });
    if (!theUser) {
      return res.status(400).json({ message: "no user found with this name" });
    }

    const { password: hasedPasseord } = theUser;
    const pareseHasedPassword = await bcrypt.compare(password, hasedPasseord);
    if (!pareseHasedPassword) {
      return res.status(400).json({ message: "invalid passeord" });
    }

    // res.json({ theUser });
    const authToken = await jwt.sign(
      {
        userId: theUser._id,
        username: theUser.name,
        role: theUser.role,
      },
      process.env.secretKey,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ authToken });
  } catch (error) {
    res.status(400).json({ messege: error.messege });
  }
};

const changePassword = async (req, res) => {
  try {
    const { np, op } = req.body;
    if (!np || !op) {
      return res
        .status(400)
        .json({ message: "new password and old password both are required" });
    }
    if (np == op) {
      return res
        .status(400)
        .json({ message: "new password and old password should not be same " });
    }

    const theUser = await User.findById(req?.userInfo?.userId);
    const theOldPassword = await bcrypt.compare(op, theUser?.password);

    if (!theOldPassword) {
      return res.status(400).json({
        messege: "your typed old password is not matched with user password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptnewPassword = await bcrypt.hash(np, salt);
    const isPasswordChanged = await User.updateOne(
      { _id: theUser?._id },
      { $set: { password: bcryptnewPassword } }
    );
    if (!isPasswordChanged) {
      return res
        .status(400)
        .json({ message: "password is not updated please try again" });
    }
    res.status(200).json({ success: true, isPasswordChanged });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllUser, createUser, loginUser, changePassword };
