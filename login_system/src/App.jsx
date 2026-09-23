import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Login from "./pages/Login";
import { AuthProvider } from "./context/auth";
import LoadingScreen from "./components/LoadingScreen";
import React, { lazy, Suspense } from 'react';

const DashboardPage = lazy(() => import('./pages/Dashboard'));
const SecurityPage = lazy(() => import('./pages/Security'));
const MyProfilePage = lazy(() => import('./pages/MyProfile'));
const RegisterPage = lazy(() => import("./pages/Register"));
const TasksPage = lazy(() => import("./pages/Tasks"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot" element={<ForgotPasswordPage />}></Route>
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
