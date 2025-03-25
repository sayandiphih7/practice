const jwt = require("jsonwebtoken");

const isValidToken = async (req, res, next) => {
  try {
    const bearer = req.headers?.["authorization"];
    const token = bearer?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "please provide token" });
    }
    const isValidToken = await jwt.verify(token, process.env.secretKey);
    if (!isValidToken) {
      return res.status(400).json({ message: "invalid user" });
    }

    req.userInfo = isValidToken;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { isValidToken };
