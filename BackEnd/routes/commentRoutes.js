const express = require('express');
const router = express.Router();

// Controllers
const { create, list } = require('../models/comment');
const { authenticateToken } = require('../middleware/authMiddleware');

// Define routes for comment
router.get("/", authenticateToken, list);  // GET /comment
router.post("/", authenticateToken, create); // POST /comment

module.exports = router;
