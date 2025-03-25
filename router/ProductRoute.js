const express = require("express");
const { getProduct, addSample } = require("../controller/productController");

const productRoute = express.Router();

productRoute.route("/").get(getProduct);
productRoute.post("/addSample", addSample);

module.exports = { productRoute };
