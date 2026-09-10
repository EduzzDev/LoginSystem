import pkg from "jsonwebtoken"
const { verify } = pkg;

function verificarResetToken(req, res, next) {
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const decoded = verify(token, process.env.JWT_RESET_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Erro detalhado do JWT:", error.message);
        return res.status(401).json({ error: "Invalid token" });
    }
}

export default verificarResetToken;