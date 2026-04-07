const jwt = require("jsonwebtoken");
const User = require('../models/User');

exports.protect = async (req,res,next) => {
    const authHeader = req.headers.authorization || "";
    const hasBearerPrefix = authHeader.startsWith("Bearer ");
    const token = hasBearerPrefix ? authHeader.split(" ")[1] : null;

    if(!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try{
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        return next();
    }catch(err){
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};
