class ErrorHandelerClass extends Error {
  constructor(messege, statusCode) {
    super(messege);
    this.statusCode = statusCode || 404;
  }
}

const errorHandeler = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  return res
    .status(err.statusCode)
    .json({ success: false, message: err?.message || "something wrong " });
};

module.exports = { errorHandeler, ErrorHandelerClass };
