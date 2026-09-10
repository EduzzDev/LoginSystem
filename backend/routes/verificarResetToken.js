import pkg from "jsonwebtoken"
const { verify } = pkg;

function verificarResetToken(req, res, next) {
    console.log("COOKIES:", req.cookies);
    console.log("BODY:", req.body);
    console.log("QUERY:", req.query);
    const token = req.cookies?.token || req?.body.token || req.query?.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const fingerprint = crypto
            .createHash("sha256")
            .update(process.env.JWT_SECRET || "")
            .digest("hex")
            .slice(0, 12);

        console.log("JWT fingerprint:", fingerprint);
        const decoded = verify(token, process.env.JWT_RESET_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Erro detalhado do JWT:", error.message);
        return res.status(401).json({ error: "Invalid token" });
    }
}

export default verificarResetToken;