const express = require('express');
const router = express.Router();
const {handleUserSignup} = require('../controller/user.ctlr');

router.post('/register',handleUserSignup);

module.exports = router;