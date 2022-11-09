//create manufacturer route from backend\models\Manufacturer.js

const express = require("express");
const router = express.Router();
const Manufacturer = require("../models/Manufacturer");
const Product = require("../models/Product");
const { check, validationResult } = require("express-validator");
// const auth = require("../middleware/auth");


router.post(
    "/addmanufacturer",
    [
        check("Product_id", "Product ID is required").not().isEmpty(),
        check("Qty", "Quantity is required").not().isEmpty(),
        check("Price", "Price is required").not().isEmpty(),
    ],  
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Product_id, Qty, Price } = req.body;
        try {
            const newManufacturer = new Manufacturer({
                Product_id,
                Qty,
                Price,
            });
            const manufacturer = await newManufacturer.save();
            res.json(manufacturer);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

router.get("/getallmanufacturer", async (req, res) => {
    Manufacturer.find()
        .then((manufacturers) => res.json(manufacturers))
        .catch((err) => res.status(404).json({ success: false }));
});

// delete manufacturer
router.delete("/deletemanufacturer/:id", async (req, res) => {
    try {
        let manufacturer = await Manufacturer.findById(req.params.id);
        if (!manufacturer) return res.status(404).json({ msg: "Manufacturer not found" });
        await Manufacturer.findByIdAndRemove(req.params.id);
        res.json({ msg: "Manufacturer removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;