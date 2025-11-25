import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(401).json({ error: "Missing ID token" });
    }

    // 1️⃣ Verify Firebase ID Token
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { email, name, picture } = decoded;

    // 2️⃣ Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new Google user
      user = await User.create({
        name: name || "Google User",
        email,
        password: null,
        avatar: picture,
        authType: "google",
      });
    }

    // 3️⃣ Return backend JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};
