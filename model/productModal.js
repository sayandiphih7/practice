const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: String,
  category: String,
  price: Number,
  inStock: Boolean,
  tags: [String],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
