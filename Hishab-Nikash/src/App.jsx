import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AppSidebar from "./Components/AppSidebar";
import Topbar from "./Components/Topbar";
import Dashboard from "./Pages/Dashboard";
import Budget from "./Pages/Budget";
import TransactionPage from "./Pages/TransactionPage";
import Report from "./Pages/Report";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import Startup from "./Pages/Startup";
import AddTransaction from "./Pages/AddTransaction";


const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [token, setToken] = useState(localStorage.getItem("token")); 

  
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="flex">
        {}
        <AppSidebar setCurrentPage={setCurrentPage} disabled={!token} setToken={setToken} />

        <div className="ml-64 bg-gray-100 w-full">

          {}
          <Topbar currentPage={currentPage} disabled={!token} />

          <Routes>
            {}
            <Route
              path="/"
              element={token ? <Navigate to="/startup" /> : <Startup />}
            />

            {}
            <Route path="/signup" element={<Signup setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />

            {}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute token={token}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget"
              element={
                <ProtectedRoute token={token}>
                  <Budget />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactionPage"
              element={
                <ProtectedRoute token={token}>
                  <TransactionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute token={token}>
                  <Report />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute token={token}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute token={token}>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>

  );
};
export default App;