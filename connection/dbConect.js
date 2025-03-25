const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl).then(() => {
      console.log("successfully conected to mongodb");
    });
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

module.exports = dbConnect;
