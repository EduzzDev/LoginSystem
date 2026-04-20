import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

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

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }
    if (email.length > 254) {
      return res.status(400).json({ error: "Email too big" });
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

// rota teste
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
