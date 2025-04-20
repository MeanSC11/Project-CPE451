const express = require('express');
const router = express.Router();
const { uploadSlip } = require('../controllers/slip');

// เส้นทางสำหรับ POST /slipok
router.post('/', uploadSlip);

module.exports = router;
