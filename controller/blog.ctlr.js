const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handleCreateBlog(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("Received file:", req.file.originalname);

        // Convert file buffer to base64
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        // Upload to Cloudinary
        const cloudinary_res = await cloudinary.uploader.upload(base64Image, { folder: "blogcover" });

        console.log("Cloudinary upload successful:", cloudinary_res.secure_url);
        
        return res.status(200).json({
            message: "File uploaded successfully",
            url: cloudinary_res.secure_url,
        });

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ error: "File upload failed", details: error.message });
    }
}

module.exports = { handleCreateBlog, upload };
