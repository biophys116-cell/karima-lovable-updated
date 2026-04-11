const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE USER
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USERS
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
