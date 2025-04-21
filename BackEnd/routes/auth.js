const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser, findUserById } = require("../models/user");
const { authenticateToken } = require("../middleware/authenticate");
const { uploadSlip } = require('../models/slip'); // Ensure no duplicate imports
const multer = require('multer'); // Import multer for file handling

const router = express.Router();
const upload = multer(); // Initialize multer for handling multipart/form-data

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, phone, hashedPassword);
    res.json({ message: "User created" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email); // Debug log

  if (!email || !password) {
    console.error("Login failed: Missing email or password"); // Debug log
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.warn(`Login failed: User with email ${email} not found`); // Debug log
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      console.warn(`Login failed: Incorrect password for email ${email}`); // Debug log
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.user_id, email: user.user_email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login successful for email:", email); // Debug log
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message); // Debug log
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing in the request.' });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      user_name: user.user_name,
      user_phone: user.user_phone,
      user_email: user.user_email,
    });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Add route for uploading slip
router.post('/slip', authenticateToken, upload.single('files'), async (req, res) => {
  try {
    console.log("Request received at /api/auth/slip");
    console.log("Authorization Header:", req.headers.authorization);

    if (!req.user) {
      console.error("User not authenticated");
      return res.status(401).json({ message: "Access token is missing or invalid" });
    }

    await uploadSlip(req, res);
  } catch (error) {
    console.error("Error in /api/auth/slip:", error.message);
    res.status(500).json({ message: "Failed to upload slip." });
  }
});

module.exports = router;
