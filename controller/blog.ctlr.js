const cloudinary = require('../config/cloudinary');

async function handleCreateBlog(req, res) {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: "No image provided" });
        }

        console.log("Received image data:", image.slice(0, 30) + "..."); // Logging first few characters for debugging

        // Upload to Cloudinary
        const cloudinary_res = await cloudinary.uploader.upload(image, {
            folder: "blogcover",
        });

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

module.exports = { handleCreateBlog };
