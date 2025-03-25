const { ErrorHandelerClass } = require("../middleware/errorHandeler");
const { Product } = require("../model/productModal");

const addSample = async (req, res) => {
  try {
    const sample = [
      {
        productName: "Wireless Mouse",
        category: "Electronics",
        price: 25.99,
        inStock: true,
        tags: ["wireless", "mouse", "electronics"],
      },
      {
        productName: "Bluetooth Headphones",
        category: "Electronics",
        price: 59.99,
        inStock: true,
        tags: ["bluetooth", "headphones", "electronics"],
      },
      {
        productName: "Running Shoes",
        category: "Footwear",
        price: 89.99,
        inStock: true,
        tags: ["shoes", "sports", "footwear"],
      },
      {
        productName: "Leather Wallet",
        category: "Accessories",
        price: 39.99,
        inStock: false,
        tags: ["wallet", "leather", "accessories"],
      },
      {
        productName: "Electric Kettle",
        category: "Home Appliances",
        price: 45.0,
        inStock: true,
        tags: ["kettle", "electric", "appliances"],
      },
      {
        productName: "Smartphone Case",
        category: "Accessories",
        price: 14.99,
        inStock: true,
        tags: ["phone", "case", "accessories"],
      },
      {
        productName: "Gaming Keyboard",
        category: "Electronics",
        price: 99.99,
        inStock: true,
        tags: ["gaming", "keyboard", "electronics"],
      },
      {
        productName: "Yoga Mat",
        category: "Fitness",
        price: 22.5,
        inStock: true,
        tags: ["yoga", "fitness", "mat"],
      },
      {
        productName: "Portable Speaker",
        category: "Electronics",
        price: 49.99,
        inStock: false,
        tags: ["speaker", "portable", "electronics"],
      },
      {
        productName: "Stainless Steel Water Bottle",
        category: "Accessories",
        price: 19.99,
        inStock: true,
        tags: ["water bottle", "stainless steel", "accessories"],
      },
    ];
    const sampleAdded = await Product.insertMany(sample);
    return res.status(200).json({ message: "successfully added demo sample" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProduct = async (req, res, next) => {
  try {
    return next(new ErrorHandelerClass("testing error", 444));

    const allProduct = await Product.aggregate([
      { $match: { inStock: true, price: { $gt: 10 } } },
      {
        $group: {
          _id: "$category",
          avgPrice: { $avg: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);
    return res
      .status(200)
      .json({ length: allProduct.length, data: allProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProduct, addSample };
