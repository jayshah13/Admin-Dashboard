const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { check, validationResult } = require("express-validator");

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//get products with company name as Jaquar
router.get("/company/:comp", async (req, res) => {
  try {
    const products = await Product.find({ Company_name: req.params.comp });
    res.json(products);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// get products with category at Tiles
  router.get("/category/:cat", async (req, res) => {
    try {
      const products = await Product.find({ Product_cat: req.params.cat });
      res.json(products);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });

  // get product with subcategory as Tape
  router.get("/subcategory/:Subcat", async (req, res) => {
    try {
      const products = await Product.find({ Product_sub_cat: req.params.Subcat });
      res.json(products);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });


  // get products in price_range Between min and max
  router.get("/price/:min/:max", (req, res) => {
    try {
      const products = Product.find({ Price: { $gte: req.params.min, $lte: req.params.max } }).sort({ Price: -1 });
      res.json(products);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });
  
  // get a specifc product with Product_no 125
  router.get("/product_no/:P_no", async (req, res) => {
    try {
      const products = await Product.find({ Product_no: req.params.P_no });
      res.json(products[0]);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });

  // get with id
  router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Product not found" });
      }

      res.status(500).send("Server Error");
    }
  });
  

// delete a specifc product by Id
router.delete("/:id", async (req, res) => {
  try {
    productExist = await Product.findById(req.params.id);
    if (!productExist) {
      return res.status(404).json("Message not found");
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json("Product Deleted");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// add new product
router.post(
  "/",
  [
    check("Manufacturer_id", "Manufacturer ID is required").not().isEmpty(),
    check("Product_name", "Product Name is required").not().isEmpty(),
    check("Company_name", "Company Name is required").not().isEmpty(),
    check("Product_no", "Product Number is required").not().isEmpty(),
    check("Qty", "Quantity is required").not().isEmpty(),
    check("Price", "Price is required").not().isEmpty(),
    check("Product_cat", "Category is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      Manufacturer_id,
      Product_name,
      Company_name,
      Product_no,
      Qty,
      Feature,
      Price,
      Product_img,
      Product_cat,
      Product_sub_cat,
    } = req.body;

    try {
      const newProduct = new Product({
        Manufacturer_id,
        Product_name,
        Company_name,
        Product_no,
        Qty,
        Feature,
        Price,
        Product_img,
        Product_cat,
        Product_sub_cat,
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


module.exports = router;
