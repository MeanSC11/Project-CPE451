const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser, findUserById } = require("../models/user");
const { authenticateToken } = require("../middleware/authenticate");
const router = express.Router();

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
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.warn(`Login failed: User with email ${email} not found`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.user_password) {
      console.error(`Login failed: Password is missing for user with email ${email}`);
      return res.status(500).json({ message: "User data is incomplete. Please contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      console.warn(`Login failed: Incorrect password for email ${email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a proper JWT token
    const token = jwt.sign({ userId: user.user_id, email: user.user_email }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
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

module.exports = router;
