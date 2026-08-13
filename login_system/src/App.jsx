import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import MyProfile from "./pages/MyProfile";
import { AuthProvider } from "./context/auth";
import Security from "./pages/Security";
import Help from "./pages/HelpPage";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/security" element={<Security />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
