const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { username, fullname, email, number, password } = req.body;

  try {
    const newUser = new User({ username, fullname, email, number, password });
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.put("/profile/:userId", async (req, res) => {
  const { username, fullname, email, number, password } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.username = username || user.username;
      user.fullname = fullname || user.fullname;
      user.email = email || user.email;
      user.number = number || user.number;
      user.password = password || user.password;

      await user.save();
      res.send("Profile updated successfully");
    } else {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});


module.exports = router;