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
  res.json(user);
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

export default router;
