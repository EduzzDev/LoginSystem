import { useState } from "react";
import { registerUser } from "../services/api";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("userNome");
  });

  const SignIn = async (nome) => {
    const response = await registerUser({ nome });
    setUser(response.data);
  };

  const Login = (nome) => {
    setUser(nome);
    localStorage.setItem("userNome", nome);
  };

  return (
    <AuthContext.Provider value={{ user, SignIn, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
