const express = require("express");
const { handleCreateBlog,handleGetAllBlogs,handleGetOneBlog, upload } = require("../controller/blog.ctlr");
const {verifyToken}=require('../middleware/verifyToken')

const router = express.Router();

router.post("/create",verifyToken, upload.single("image"), handleCreateBlog);

router.get("/getall",handleGetAllBlogs)

router.get("/getone",handleGetOneBlog)

module.exports = router;
