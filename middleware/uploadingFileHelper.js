const multer = require("multer");
const path = require("path");

const storagee = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("only image are allowed"));
  }
};

const storage = multer({
  storage: storagee,
  // fileFilter: checkFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 mb
  },
});

module.exports = storage;
