const express = require('express');
const router = express.Router();
const travelController = require('../models/record');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, travelController.createTravelHistory);
router.get('/', authenticateToken, travelController.getAllTravelHistory); // Fetch all travel history for the logged-in user
router.get('/:id', authenticateToken, travelController.getTravelHistoryById);
router.put('/:id', authenticateToken, travelController.updateTravelHistory);
router.delete('/:id', authenticateToken, travelController.deleteTravelHistory);

module.exports = router;
