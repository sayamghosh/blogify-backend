const express = require('express')
const {handleCreateBlog}=require('../controller/blog.ctlr')
const {verifyToken}=require('../middleware/verifyToken')



const router = express.Router();

router.post('/create',verifyToken,handleCreateBlog);

module.exports=router