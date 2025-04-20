const express = require('express');
const router = express.Router();

// Controllers
const { create, list } = require("../controllers/comment");

// Define routes for comment
router.get("/", list);  // GET /comment
router.post("/", create); // POST /comment

module.exports = router;
