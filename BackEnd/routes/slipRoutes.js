const express = require('express');
const router = express.Router();
const { uploadSlip } = require('../models/slip');

// เส้นทางสำหรับ POST /slipok
router.post('/', uploadSlip);

module.exports = router;
