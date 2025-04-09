const express = require("express");
const { handleCreateBlog, upload } = require("../controller/blog.ctlr");
const {verifyToken}=require('../middleware/verifyToken')

const router = express.Router();
router.post("/create",verifyToken, upload.single("image"), handleCreateBlog);

module.exports = router;
