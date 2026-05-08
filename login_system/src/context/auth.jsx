import React from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ nome: "Eduardo Felipe" }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
