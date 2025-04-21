const express = require('express');
const router = express.Router();
const { list, create } = require('../models/comment');
const { authenticateToken } = require('../middleware/authMiddleware');

// Define routes for comment
router.get("/", authenticateToken, async (req, res) => {
  console.log("GET /api/comment request received"); // Add log to confirm request
  await list(req, res);
});

router.post("/", authenticateToken, async (req, res) => {
  console.log("POST /api/comment request received"); // Add log to confirm request
  await create(req, res);
});

module.exports = router;
