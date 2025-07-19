import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Login = React.lazy(() => import("../pages/Login"));

export const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Suspense>
);
