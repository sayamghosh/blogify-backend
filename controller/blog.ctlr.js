const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Blog = require("../model/blog.model");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handleCreateBlog(req, res) {
    const {title,content,category}=req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // console.log("Received file:", req.file.originalname);

        // Convert file buffer to base64
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        // Upload to Cloudinary
        const cloudinary_res = await cloudinary.uploader.upload(base64Image, { folder: "blogcover" });

        // console.log("Cloudinary upload successful:", cloudinary_res.secure_url);

        // Create a new blog post with the uploaded image URL  
        const newBlog = await Blog.create({
            title,
            content,
            category,
            coverImageUrl: cloudinary_res.secure_url,
            createdBy: req.id,
            author: req.fullName,
        });
        
        if(!newBlog) {
            return res.status(500).json({ error: "Failed to create blog post" });
        }

        return res.status(200).json({
            message: "Blog post created successfully",
            success: true,
        });

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ error: "File upload failed", details: error.message });
    }
}

async function handleGetAllBlogs(req,res){
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json({
        message: "Blogs fetched successfully",
        success: true,
        blogs,
    });
}

module.exports = { handleCreateBlog, upload , handleGetAllBlogs};
