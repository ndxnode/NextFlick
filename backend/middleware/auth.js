const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function auth(req, res, next) {
  try {
    // Get token from Authorization header (preferred) or cookie
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Fetch complete user object from database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user object and token to request
    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid authentication token" });
  }
}

module.exports = auth;
