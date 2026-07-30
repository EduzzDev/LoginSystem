import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

/* global process */

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      const isDevelopment = process.env.NODE_ENV !== "production";
      const allowedOrigins = isDevelopment
        ? [
            undefined,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
          ]
        : ["https://login-system-eta-rose.vercel.app"];

      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        (!isDevelopment &&
          origin?.startsWith("https://login-system-eta-rose.vercel.app"))
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    cargo TEXT
  )
`,
).run();

// criar índice no email
db.prepare("CREATE INDEX IF NOT EXISTS idx_email ON usuarios(email)").run();

app.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    if (!emailRegex.test(email)) {
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
    if (!nome) {
      return res.status(400).json({ error: "Name required" });
    }
    if (nome.length < 2) {
      return res
        .status(400)
        .json({ error: "Name must be at least 2 characters" });
    }
    if (nome.length > 100) {
      return res.status(400).json({ error: "Name too long" });
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
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    );
    const result = stmt.run(nome, email, hashedPassword);

    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const emailNormalizado = email.toLowerCase().trim();
    const user = db
      .prepare("SELECT * FROM usuarios WHERE email = ?")
      .get(emailNormalizado);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const senhaValid = await bcrypt.compare(senha, user.senha);
    if (!senhaValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // gerar o token jwt
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({
      success: true,
      message: "Login successful",
      nome: user.nome,
      userId: user.id,
      token: token,
    });
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
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

app.use("/", authRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
