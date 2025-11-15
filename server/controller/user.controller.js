import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password, role } = req.body;

  if (!username || !email || !fullname || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists"
    });
  }

  const newUser = await User.create({
    username,
    email,
    fullname,
    password,
    role: role === "admin" ? "admin" : "user" 
  });

  const token = newUser.generateAccessToken();

  return res.status(201).json({
    success: true,
    message: "User registered successfully"
  });
});

export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = user.generateAccessToken();

  // Set token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,  // ❗ localhost uses HTTP, not HTTPS
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });


  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});