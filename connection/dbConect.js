const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl).then((config) => {
      console.log(`successfully conected on ${config.connection.host} `);
    });
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

module.exports = dbConnect;
