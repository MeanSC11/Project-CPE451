const express = require('express');
const multer = require('multer');
const { authenticateToken } = require('../middleware/authMiddleware');
const { uploadSlip } = require('../models/slip');

const router = express.Router();
const upload = multer(); // Initialize multer for handling multipart/form-data

router.post('/', authenticateToken, upload.single('files'), async (req, res) => {
  try {
    console.log("Request received at /api/slip");
    console.log("Authorization Header:", req.headers.authorization);

    if (!req.file) {
      console.error("No file uploaded in the request.");
      return res.status(400).json({ error: 'No file uploaded. Please attach a file and try again.' });
    }

    await uploadSlip(req, res);
  } catch (error) {
    console.error("Error in /api/slip:", error.message);
    res.status(500).json({ message: "Failed to upload slip." });
  }
});

module.exports = router;
