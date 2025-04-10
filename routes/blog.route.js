const express = require("express");
const { handleCreateBlog,handleGetAllBlogs, upload } = require("../controller/blog.ctlr");
const {verifyToken}=require('../middleware/verifyToken')

const router = express.Router();
router.post("/create",verifyToken, upload.single("image"), handleCreateBlog);

router.get("/getall",handleGetAllBlogs)

module.exports = router;
