const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id; // Store decoded user data in req.user
        next(); // Continue to the next middleware
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports={verifyToken}