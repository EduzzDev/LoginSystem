import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

router.get("/dashboard", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      message: "authorized access",
      userId: decoded.userId,
    });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

export default router;
