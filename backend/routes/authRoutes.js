import express from "express";
const router = express.Router();
import verificarAutenticacao from "./verificarAuth.js";
import Database from "better-sqlite3";
const db = new Database("LoginSystem.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    nome TEXT
  )
`);
router.get("/dashboard", verificarAutenticacao, (req, res) => {
  res.json({
    message: "authorized acess",
    userId: req.userId,
  });
});

router.get("/user/me", verificarAutenticacao, (req, res) => {
  const stmt = db.prepare("SELECT email, nome FROM usuarios WHERE id = ?");
  const user = stmt.get(req.userId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  res.json({ email: user.email, nome: user.nome });
});

router.put("/user/update-profile", verificarAutenticacao, (req, res) => {
  console.log("O QUE CHEGOU NO BACKEND:", req.body);
  const { name, email } = req.body;
  const userId = req.userId;
  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const user = stmt.get(req.userId);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }
  if (email.length > 254) {
    return res.status(400).json({ error: "Email too big" });
  }
  if (email.length < 5) {
    return res.status(400).json({ error: "Email too short" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }
  if (name.length < 2) {
    return res
      .status(400)
      .json({ error: "Name must be at least 2 characters" });
  }
  if (name.length > 100) {
    return res.status(400).json({ error: "Name too long" });
  }

  try {
    const emailNormalizado = email.toLowerCase().trim();
    const existente = db
      .prepare("SELECT id FROM usuarios WHERE email = ? AND id != ?")
      .get(emailNormalizado, userId);
    if (existente) {
      return res.status(409).json({
        error: "EMAIL_ALREADY_REGISTERED",
        message: "Email address is already in use.",
      });
    }
    const updateStmt = db.prepare(
      `UPDATE usuarios set nome = ?, email = ? WHERE id = ?`,
    );
    const result = updateStmt.run(name, emailNormalizado, userId);
    if (result.changes === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json({
      message: "Profile successfully updated!",
      name,
      email: emailNormalizado,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error updating the profile in the database." });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

export default router;
