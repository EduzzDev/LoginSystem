import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
/* global process */
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);

const db = new Database(process.env.DATABASE_PATH || "LoginSystem.db");
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

// criar tabela
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`,
).run();

// criar índice no email
db.prepare("CREATE INDEX IF NOT EXISTS idx_email ON usuarios(email)").run();

app.post("/register", async (req, res) => {
  try {
    const { email, senha } = req.body;
    //validação email
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }
    if (email.length > 254) {
      return res.status(400).json({ error: "Email too big" });
    }
    if (email.length < 5) {
      return res.status(400).json({ error: "Email too short" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    // verificar se email já existe
    const emailNormalizado = email.toLowerCase().trim();
    const existente = db
      .prepare("SELECT id FROM usuarios WHERE email = ?")
      .get(emailNormalizado);
    if (existente) {
      return res.status(409).json({
        error: "EMAIL_ALREADY_REGISTERED",
        message: "Email address is already in use.",
      });
    }
    // validação da senha
    if (!senha) {
      return res.status(400).json({ error: "Password required" });
    }
    if (senha.length > 72) {
      return res.status(400).json({
        error: "PASSWORD_TOO_LONG",
        message: "Password must be at most 72 characters",
      });
    }
    if (senha.length < 5) {
      return res.status(400).json({
        error: "PASSWORD_TOO_SHORT",
        message: "Password must be at learst 4 characters",
      });
    }
    // criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const stmt = db.prepare(
      "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
    );
    const result = stmt.run(email, hashedPassword);

    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log("Login attempt:", email);

    const emailNormalizado = email.toLowerCase().trim();
    const user = db
      .prepare("SELECT * FROM usuarios WHERE email = ?")
      .get(emailNormalizado);

    if (!user) {
      console.log("User not found:", emailNormalizado);
      return res.status(401).json({ message: "User not found" });
    }

    const senhaValid = await bcrypt.compare(senha, user.senha);
    if (!senhaValid) {
      console.log("Invalid password for user:", emailNormalizado);
      return res.status(401).json({ message: "Incorrect password" });
    }

    console.log("Login successful:", emailNormalizado);
    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// rota teste
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
