const express = require('express');
const router = express();
const mic = require('../controllers/mic');


// api routes v1 (/api/v1)
router.use('/mic', mic());

module.exports = router;