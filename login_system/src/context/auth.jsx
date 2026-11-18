import { useState } from "react";
import { getUserProfile, registerUser } from "../services/api";
import { AuthContext } from "./authContext";
import { useEffect } from "react";
import { socket } from "../services/socket";

export const AuthProvider = ({ children }) => {
  const [timeLogged, setTimeLogged] = useState("0 min");
  const [userInfo, setUserInfo] = useState("");
  const [sessionsCreatedAt, setSessionCreatedAt] = useState(null);
  const [currentJti, setCurrentJti] = useState(null);
  const [created_at, setCreated_at] = useState(null);
  const [user, setUser] = useState(() => {
    return localStorage.getItem("userNome") || null;
  });
  const [imgUser, setImgUser] = useState(() => {
    return localStorage.getItem("urlImg") || null;
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {

        if (!sessionsCreatedAt) return

        const loginTime = new Date(sessionsCreatedAt).getTime()
        if (Number.isNaN(loginTime)) return

        const updateTimeLogged = () => {
          const totalMinutes = Math.floor((Date.now() - loginTime) / 60000);

          const hours = Math.floor(totalMinutes / 60);

          const minutes = totalMinutes % 60;
          return setTimeLogged(
            hours >= 1 ? `${hours} h ${minutes} min`
              : `${minutes} min`)
        }

        updateTimeLogged();

      } catch (err) {
        console.log(err);
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, [sessionsCreatedAt]);

  useEffect(() => {
    if (!currentJti) return;
    const handleSessionRevoked = ({ jti }) => {

      if (currentJti === jti) {
        localStorage.removeItem("userNome");
        localStorage.removeItem("urlImg");
        socket.disconnect();
        window.location.assign("/");
      }
    };

    socket.on("session_revoked", handleSessionRevoked);
    const handleSocketError = (error) => {
      if (!error.message?.toLowerCase().includes("session")) return;

      localStorage.removeItem("token");
      localStorage.removeItem("userNome");
      localStorage.removeItem("urlImg");
      socket.disconnect();
      window.location.assign("/");
    };
    socket.on("connect_error", handleSocketError);
    socket.connect();

    return () => {
      socket.off("session_revoked", handleSessionRevoked);
      socket.off("connect_error", handleSocketError);
      socket.disconnect();
    };
  }, [currentJti]);
  const SignIn = async (nome) => {
    const response = await registerUser({ nome });
    setUser(response.data);
  };
  const UserProfile = async () => {
    try {
      const response = await getUserProfile();
      const currentSession =
        response.session.find(sessao =>
          sessao.jti === response.currentJti);

      setSessionCreatedAt(currentSession?.created_at ?? null);
      setCurrentJti(response.currentJti)
      setCreated_at(response?.created_at ?? null);
      setUserInfo(currentSession?.device_info ?? "");
      const imgResponse = response?.urlImg || null;
      setImgUser(imgResponse);

      if (imgResponse) {
        localStorage.setItem("urlImg", imgResponse);
      } else {
        localStorage.removeItem("urlImg");
      }

      return response;
    } catch (error) {
      console.error("Error retrieving profile:", error);
      return null;
    }
  };

  const Login = (nome) => {
    setUser(nome);
    localStorage.setItem("userNome", nome);
  };

  return (
    <AuthContext.Provider
      value={{
        timeLogged, user, SignIn, Login, imgUser,
        created_at, UserProfile, userInfo, currentJti
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
