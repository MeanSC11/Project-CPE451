const express = require('express');
const router = express.Router();
const travelController = require('../controllers/record');

router.post('/', travelController.createTravelHistory);
router.get('/', travelController.getAllTravelHistory);
router.get('/:id', travelController.getTravelHistoryById);
router.put('/:id', travelController.updateTravelHistory);
router.delete('/:id', travelController.deleteTravelHistory);

module.exports = router;
