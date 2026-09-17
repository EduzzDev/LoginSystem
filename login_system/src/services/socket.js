import { io } from "socket.io-client";

const BASE_URL =
    import.meta.env.VITE_API_URL || "https://loginsystem-d86j.onrender.com";

export const socket = io(BASE_URL, {
    withCredentials: true,
    autoConnect: false,
    auth: (callback) => callback({ token: localStorage.getItem("token") }),
    transports: ["websocket", "polling"],
});