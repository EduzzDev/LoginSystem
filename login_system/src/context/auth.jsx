import { useState } from "react";
import { registerUser } from "../services/api";
import { AuthContext } from "./authContext";
import { useEffect } from "react";

export const AuthProvider = ({ children }) => {
  const [timeLogged, setTimeLogged] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const parts = token.split(".");
        if (parts.length !== 3) return;

        // Converte de base64url para base64 e adicionando um preenchimento caso precise
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(
          base64.length + ((4 - (base64.length % 4)) % 4),
          "=",
        );

        const payload = JSON.parse(atob(padded));

        const loginTime = payload.iat * 1000;

        const diffMs = Date.now() - loginTime;

        const totalSeconds = Math.floor(diffMs / 1000);

        const hours = Math.floor(totalSeconds / 3600);

        const minutes = Math.floor((totalSeconds % 3600) / 60);

        // Atualizar state quando hours for maior que 0
        if (hours >= 1) {
          return setTimeLogged(`${hours} h ${minutes} min`);
        }

        setTimeLogged(`${minutes} min`);
      } catch (err) {
        console.log(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const [user, setUser] = useState(() => {
    return localStorage.getItem("userNome") || null;
  });

  const SignIn = async (nome) => {
    const response = await registerUser({ nome });
    setUser(response.data);
  };

  const Login = (nome, token) => {
    setUser(nome);
    localStorage.setItem("userNome", nome);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      console.warn("Login chamado sem a chave token; token não salvo!");
    }
  };

  return (
    <AuthContext.Provider value={{ timeLogged, user, SignIn, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
