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

// criar tabela
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
  )
`,
).run();

app.post("/register", async (req, res) => {
  try {
    const { email, senha } = req.body;

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
