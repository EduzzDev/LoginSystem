import { io } from "socket.io-client";

const BASE_URL =
    import.meta.env.VITE_BACKEND_URL;

export const socket = io(BASE_URL, {
    withCredentials: true,
    autoConnect: false,
    auth: (callback) => callback({ token: localStorage.getItem("token") }),
    transports: ["websocket", "polling"],
});