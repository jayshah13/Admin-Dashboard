const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Login api
router.post(
  "/login",
  [
    check("Email", "Please include a valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Email, password } = req.body;

    try {
      let user = await User.findOne({ Email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const token = jwt.sign(
        {
          user: {
            id: user._id,
          },
        },
        "randomString",
        { expiresIn: "30d" }
      );

      res.json({ 
      "user": {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
          password: user.password,
          Address: user.Address,
          Email: user.Email,
          token: token,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// register a user as per the schema only if cpassword and password match
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("mobile", "Mobile number is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("Address", "Address is required").not().isEmpty(),
    check("Email", "Email is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, mobile, password, Address, Email } = req.body;
    try {
      let user = await User.findOne({ Email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      console.log(req.body);
      user = new User({
        name,
        mobile,
        password,
        Address,
        Email,
      });
      const token = jwt.sign(
        {
          user: {
            id: user._id,
          },
        },
        "randomString",
        { expiresIn: "30d" }
      );
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.json({
        "user": {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
          password: user.password,
          Address: user.Address,
          Email: user.Email,
          token: token
      }});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// update a user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
