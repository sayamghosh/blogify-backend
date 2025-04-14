const Like = require("../model/like.model")

async function toggleLike(req,res){
    const { blogId } = req.body;
    const userId = req.id; // Assuming you have the user ID from the request

    try {
        // Check if the like already exists
        const existingLike = await Like.findOne({ blogId, userId });

        if (existingLike) {
            // If it exists, remove it (unlike)
            await Like.deleteOne({ _id: existingLike._id });
            return res.status(200).json({
                message: "Blog unliked successfully",
                success: true,
            });
        } else {
            // If it doesn't exist, create a new like
            const newLike = await Like.create({ blogId, userId });
            return res.status(200).json({
                message: "Blog liked successfully",
                success: true,
                like: newLike,
            });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        return res.status(500).json({
            message: "Error toggling like",
            success: false,
            error: error.message,
        });
    }
}


const getLikesCount = async (req, res) => {
    const { blogId } = req.params;
  
    const count = await Like.countDocuments({ blogId });
    return res.status(200).json({ count });
  };

module.exports={
    toggleLike,
    getLikesCount
}