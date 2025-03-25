const authValidate = (role, mess) => {
  return async (req, res, next) => {
    try {
      if (!role.includes(req.userInfo.role)) {
        return res.status(401).json({
          message: ` Unauthorized ${mess || "custom message"} `,
        });
      }
      return next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
};

module.exports = { authValidate };
