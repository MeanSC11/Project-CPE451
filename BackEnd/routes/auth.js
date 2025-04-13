const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../../models/user");
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

    const token = Buffer.from(`${user.id}:${user.email}`).toString('base64'); // Simple token
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
