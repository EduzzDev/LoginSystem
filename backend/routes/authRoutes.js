import express from "express";
import bcrypt from "bcrypt";
import fs from "node:fs";
import multer from "multer";
const router = express.Router();
import verificarAutenticacao from "./verificarAuth.js";
import Database from "better-sqlite3";
const db = new Database("LoginSystem.db");

fs.mkdirSync("uploads", { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({ storage });

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    nome TEXT,
    cargo TEXT,
    urlImg TEXT 
  )
`);
router.get("/dashboard", verificarAutenticacao, (req, res) => {
  res.json({
    message: "authorized acess",
    userId: req.userId,
  });
});

router.get("/user/me", verificarAutenticacao, (req, res) => {
  const stmt = db.prepare(
    "SELECT email, nome, cargo, senha, urlImg FROM usuarios WHERE id = ?",
  );
  const user = stmt.get(req.userId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  const urlImg = user.urlImg
    ? `${req.protocol}://${req.get("host")}${user.urlImg}`
    : "";

  res.json({
    email: user.email,
    nome: user.nome,
    cargo: user.cargo,
    senha: user.senha,
    urlImg,
  });
});

router.put(
  "/user/update-profile",
  verificarAutenticacao,
  upload.single("foto"),
  async (req, res) => {
    console.log(
      "O QUE CHEGOU NO BACKEND:",
      req.headers["content-type"],
      req.body,
      req.file,
    );
    const { name, email, cargo, newPassword } = req.body || {};
    const userId = req.userId;
    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }
    const stmt = db.prepare("SELECT * FROM usuarios WHERE id = ?");
    const user = stmt.get(req.userId);

    // validação email
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
    //validação nome de usuário
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
    // validação da senha
    if (!newPassword) {
      return res.status(400).json({ error: "Password required" });
    }
    if (newPassword.length > 72) {
      return res.status(400).json({
        error: "PASSWORD_TOO_LONG",
        message: "Password must be at most 72 characters",
      });
    }
    if (newPassword.length < 5) {
      return res.status(400).json({
        error: "PASSWORD_TOO_SHORT",
        message: "Password must be at learst 4 characters",
      });
    }
    // criptografar a senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
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
      const urlImg = req.file ? `/uploads/${req.file.filename}` : user.urlImg;
      const updateStmt = db.prepare(
        `UPDATE usuarios set nome = ?, email = ?, cargo = ?, senha = ?, urlImg = ? WHERE id = ?`,
      );
      const result = updateStmt.run(
        name,
        emailNormalizado,
        cargo,
        hashedPassword,
        urlImg,
        userId,
      );
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
  },
);

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

export default router;
