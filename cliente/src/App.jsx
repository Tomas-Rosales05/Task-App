import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TasksPage } from "./pages/tasksPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginUser } from "./pages/LoginUser";
import { RegisterUser } from "./pages/RegisterUser";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./pages/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  const hideNavPaths = ["/", "/register"];
  const isNotFound = location.pathname === "*";

  const shouldHideNav = hideNavPaths.includes(location.pathname) || isNotFound;

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(130%_150%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="relative z-10">
        {!shouldHideNav && <Navigation />}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />

            {/* Rutas protegidas */}
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TasksPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks-create"
              element={
                <PrivateRoute>
                  <TaskFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <PrivateRoute>
                  <TaskFormPage />
                </PrivateRoute>
              }
            />

            {/* NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default App;
