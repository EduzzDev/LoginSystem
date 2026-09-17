import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export function initSocket(httpServer, corsOptions, db) {
    io = new Server(httpServer, { cors: corsOptions });

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token || getCookieToken(socket.handshake.headers.cookie);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const session = db
                .prepare(
                    "SELECT 1 FROM sessions WHERE jti = ? AND user_id = ? AND is_revoked = 0 AND julianday(expires_at) > julianday('now')",
                )
                .get(decoded.jti, decoded.userId);

            if (!session) {
                return next(new Error('Session revoked or expired'));
            }

            socket.userId = decoded.userId;
            socket.jti = decoded.jti;
            next();
        } catch {
            next(new Error('Unauthorized'));
        }
    });

    io.on('connection', (socket) => {
        socket.join(`user_${socket.userId}`);
    });
    return io;
}

export function getIO() {
    if (!io) {
        throw new Error('Socket.io has not been initialised!');
    }
    return io;
}

function getCookieToken(cookieHeader = '') {
    const tokenCookie = cookieHeader
        .split(';')
        .map((part) => part.trim())
        .find((part) => part.startsWith('token='));

    return tokenCookie ? decodeURIComponent(tokenCookie.slice('token='.length)) : null;
}