const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); // Ensure correct import
const { getTravelHistoryByUserId } = require('../models/record'); // Ensure correct import

// GET /api/record - Fetch travel history for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Request received for /api/record'); // Log request received
    const userId = req.user?.userId; // Ensure userId is extracted correctly
    if (!userId) {
      console.error('Error: userId is undefined');
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    console.log('Fetching travel history for userId:', userId); // Debug log
    const travelHistory = await getTravelHistoryByUserId(userId);
    console.log('Travel history fetched:', travelHistory); // Debug log

    res.status(200).json(travelHistory);
  } catch (error) {
    console.error('Error fetching travel history:', error.message);
    res.status(500).json({ error: 'Failed to fetch travel history.' });
  }
});

module.exports = router;
