import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { UAParser } from 'ua-parser-js';
import crypto from 'crypto';
import { createServer } from 'http';
import { initSocket } from './socket.js';

dotenv.config();

/* global process */

const isProduction = process.env.NODE_ENV === "production";
const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

const httpServer = createServer(app);


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
    cargo TEXT,
    urlImg TEXT 
  )
`,
).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    jti TEXT UNIQUE NOT NULL,
    device_info TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    is_revoked INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
  )
`).run();

app.use("/uploads", express.static("uploads"));

// criar índice no email
db.prepare("CREATE INDEX IF NOT EXISTS idx_email ON usuarios(email)").run();

initSocket(httpServer, {
  cors: {
    origin: (origin, callback) => {
      const isDevelopment = process.env.NODE_ENV !== "production";
      const allowedOrigins = isDevelopment
        ? [undefined, "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"]
        : ["https://login-system-eta-rose.vercel.app"];

      if (!origin || allowedOrigins.includes(origin) || (!isDevelopment && origin?.startsWith("https://login-system-eta-rose.vercel.app"))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }
}, db);

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

    const ipAddress =
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.ip ||
      req.socket.remoteAddress;

    const parser = new UAParser(req.headers['user-agent']);
    const result = parser.getResult();
    const deviceInfo = `${result.browser.name || 'Desconhecido'} - ${result.os.name || 'Desconhecido'}`;

    const jti = crypto.randomUUID();

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const dataGlobal = new Date().toISOString();
    db.prepare(`
      INSERT INTO sessions (user_id, jti, device_info, ip_address, created_at, expires_at)
      VALUES (?, ?, ?, ?,?, ?)
      `).run(user.id, jti, deviceInfo, ipAddress, dataGlobal, expiresAt);


    // gerar o token jwt
    const token = jwt.sign(
      { userId: user.id, jti: jti },
      process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
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

httpServer.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});