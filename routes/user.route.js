const express = require('express');
const router = express.Router();
const {handleUserSignup,handleUserLogin,handleUserDashboard} = require('../controller/user.ctlr');
const {verifyToken} = require('../middleware/verifyToken')

router.post('/register',handleUserSignup);
router.post('/login',handleUserLogin);
router.post('/dashboard',verifyToken,handleUserDashboard)

module.exports = router;