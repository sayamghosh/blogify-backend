const express = require('express');

const { toggleLike, getLikesCount ,handleCheckLike} = require('../controller/like.ctlr.js');
const  { verifyToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.post('/toggle', verifyToken, toggleLike);
router.post('/count', getLikesCount);
router.post('/check',verifyToken, handleCheckLike);

module.exports = router;