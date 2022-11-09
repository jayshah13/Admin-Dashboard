const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const { check, validationResult } = require("express-validator");

// add new order
router.post(
    "/neworder",
    [
        check("User_id", "User ID is required").not().isEmpty(),
        check("Products", "Products are required").not().isEmpty(),
        check("total_price", "Total Price is required").not().isEmpty(),
        check("Paymentstatus", "Payment Status is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { User_id, Products, total_price, date, Paymentstatus } = req.body;

        try {
            const newOrder = new Order({
                User_id,
                Products,
                total_price,
                date,
                Paymentstatus,
            });
        
            const order = await newOrder.save();
            res.send(true);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// get order with User_id


// get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// get all pending orders
router.get("/pending", async (req, res) => {
    try {
        const orders = await Order.find({ Paymentstatus: "Pending" }).sort({
            date: -1,
        });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// get all completed orders
router.get("/completed", async (req, res) => {
    try {
        const orders = await Order.find({ Paymentstatus: "Completed" }).sort({
            date: -1,
        });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
