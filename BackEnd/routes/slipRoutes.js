const express = require('express');
const router = express.Router();
const { uploadSlip } = require('../models/slip');

// เส้นทางสำหรับ POST /api/slip
router.post('/', uploadSlip);

module.exports = router;
