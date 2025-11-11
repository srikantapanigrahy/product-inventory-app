import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers["x-api-key"];

    // ✅ API Key Authentication
    if (apiKey && apiKey === process.env.API_KEY) {
      req.user = { apiKey: true };
      return next();
    }

    // ✅ JWT Authentication
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ error: "Not authorized" });
  }
};
