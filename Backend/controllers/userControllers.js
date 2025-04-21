require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  //destructure the requested message from the user
  const { fullName, email, password } = req.body;

  // Input validation
  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "Full name, email, and password are required.",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new users({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create access token
    const accessToken = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Return response
    return res.status(201).json({
      error: false,
      message: "Registration successful!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(401).json({
      error: true,
      message: "Email and password are required",
    });
  }

  try {
    // Find user by email
    const userInfo = await users.findOne({ email: email });

    if (!userInfo) {
      return res.status(401).json({
        error: true,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, userInfo.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid password",
      });
    }

    // Check password match (plain text comparison here, can be improved with bcrypt)

    const payload = { id: userInfo._id, email: userInfo.email };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      error: false,
      message: "User logged in successfully",
      accessToken,
      user: {
        fullName: userInfo.fullName,
        email: userInfo.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
