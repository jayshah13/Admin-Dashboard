const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Order schema & model
const OrderSchema = new Schema({
  User_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },

  Products: [
    {
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
      Product_cat: {
        type: String,
        required: [true, "Category is required"],
      },
      Product_sub_cat: {
        type: String,
      },
    },
  ],

  total_price: {
    type: Number,
    required: [true, "Total Price is required"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
  Paymentstatus: {
    type: String,
    required: [true, "Payment Status is required"],
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
