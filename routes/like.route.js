const express = require('express');

const { toggleLike, getLikesCount } = require('../controller/like.ctlr.js');
const  { verifyToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.post('/toggle', verifyToken, toggleLike);
router.post('/count', getLikesCount);

module.exports = router;