import pkg from "jsonwebtoken";
const { verify } = pkg;

function verificarAutenticacao(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.jti = decoded.jti

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default verificarAutenticacao;
