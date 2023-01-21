const express = require("express");
const generateToken = require("../utils/generateToken");
const app = express.Router();
const User = require("./userModel");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      if (password === user.password) {
        res.send({
          token: generateToken(user._id),
          user,
        });
      } else {
        res.send("Authentication failure");
      }
    } else {
      res.send(`user with email:${email} not found`);
    }
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/register", async (req, res) => {
  const { email, password, name, age } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send("Can't Create an User with Existing email");
    }
    const user = await User.create({
      email,
      password,
      name,
      age,
    });
    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = app;
