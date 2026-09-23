import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { AuthProvider } from "./context/auth";
import Help from "./pages/HelpPage";
import ForgotPassword from "./pages/ForgotPassword";
import React, { lazy, Suspense } from 'react';

const DashboardPage = lazy(() => import('./pages/Dashboard'));
const SecurityPage = lazy(() => import('./pages/Security'));
const MyProfilePage = lazy(() => import('./pages/MyProfile'));
const RegisterPage = lazy(() => import("./pages/Register"));
const TasksPage = lazy(() => import("./pages/Tasks"));
const HelpPage = lazy(() => import("./pages/HelpPage"));

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="spinner">Carregando página...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot" element={<ForgotPassword />}></Route>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/myProfile" element={<MyProfilePage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
