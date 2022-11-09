const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Product schema & model
const ProductSchema = new Schema({
  Manufacturer_id: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: [true, "Manufacturer ID is required"],
  },

  Product_name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  Company_name: {
    type: String,
    required: [true, "Company Name is required"],
  },
  Product_no: {
    type: Number,
    unique: true,
    required: [true, "Product Number is required"],
  },
  Qty: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  Feature: {
    type: String,
    required: [false, "Feature is required"],
  },
  Price: {
    type: Number,
    required: [true, "Price is required"],
  },
  Product_img: {
    type: String,
  },
  Product_cat: {
    type: String,
    required: [true, "Category is required"],
  },
  Product_sub_cat: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
