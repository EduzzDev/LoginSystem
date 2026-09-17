import pkg from "jsonwebtoken";
import Database from "better-sqlite3";
const { verify } = pkg;

const db = new Database("LoginSystem.db");

function verificarAutenticacao(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const session = db
      .prepare(
        "SELECT 1 FROM sessions WHERE jti = ? AND user_id = ? AND is_revoked = 0 AND julianday(expires_at) > julianday('now')",
      )
      .get(decoded.jti, decoded.userId);

    if (!session) {
      return res.status(401).json({ error: "Session revoked or expired" });
    }

    req.userId = decoded.userId;
    req.jti = decoded.jti

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default verificarAutenticacao;
