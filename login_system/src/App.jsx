import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Cada rota precisa de um 'path' único e o componente entre < /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
