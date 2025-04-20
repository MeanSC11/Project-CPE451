const express = require('express');
const router = express.Router();
const { addStations, getStations } = require('../models/station');

// เพิ่มหลายสถานี
router.post('/stations', addStations); // done
router.get('/stations',  getStations); // done


module.exports = router;
