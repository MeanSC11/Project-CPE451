const express = require('express');
const router = express.Router();
const { getETA } = require('../models/train');

// ตัวอย่าง route: /api/bts/eta?from=คูคต&to=หมอชิต
router.get('/eta', getETA);

module.exports = router;
