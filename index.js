const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./connection/dbConect");
const { userRouter } = require("./router/userRouter");
const { fileRouter } = require("./router/fileRouter");
const { productRoute } = require("./router/ProductRoute");
const { isValidToken } = require("./middleware/tokenValidate");
const { errorHandeler } = require("./middleware/errorHandeler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
dbConnect();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.frontendUrl],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const portNumber = process.env.PORT || 8000;

app.use("/admin", userRouter);

app.use("/file", fileRouter);

app.use("/product", isValidToken, productRoute);

app.use("/", (req, res) => {
  return res.status(404).json({ message: "page not found" });
});

app.use(errorHandeler);

app.listen(portNumber, () => {
  console.log(`Server is running on port ${portNumber}`);
});
