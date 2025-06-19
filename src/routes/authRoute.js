const express = require("express");
const authRouter = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");

//POST /signup
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing email address." });
    }

    // Validate password strength
    if (!password || !validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be strong (min 8 chars, include uppercase, lowercase, number, symbol).",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Create and save user (password will be hashed in pre-save hook)
    const user = new User({ email, password });
    const savedUser = await user.save();

    // Generate JWT
    const token = await savedUser.getJWT();

    // Set cookie
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(201).json({
      message: "User registered successfully.",
      data: {
        _id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//POST /login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate token
    const token = await user.getJWT();

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({
      message: "Login successful.",
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// post/logout
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.json({ message: "Logged out successfully." });
});

module.exports = authRouter;
