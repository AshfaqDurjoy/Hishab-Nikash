import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AppSidebar from "./Components/AppSidebar";
import Topbar from "./Components/Topbar";
import ProtectedRoute from "./Components/ProtectedRoute";

// Lazy loading pages
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const Budget = React.lazy(() => import("./Pages/Budget"));
const TransactionPage = React.lazy(() => import("./Pages/TransactionPage"));
const Report = React.lazy(() => import("./Pages/Report"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Settings = React.lazy(() => import("./Pages/Settings"));
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const Startup = React.lazy(() => import("./Pages/Startup"));
const AddTransaction = React.lazy(() => import("./Pages/AddTransaction"));
const Chat = React.lazy(() => import("./Pages/Chat"));

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [token, setToken] = useState(localStorage.getItem("token")); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router basename="/Hishab-Nikash/Startup">
      <div className="flex h-screen bg-gray-100">
        {token && (
           <AppSidebar 
             setCurrentPage={setCurrentPage} 
             disabled={!token} 
             setToken={setToken} 
             sidebarOpen={sidebarOpen}
             setSidebarOpen={setSidebarOpen}
           />
        )}

        <div className={`flex-1 flex flex-col ${token ? "md:ml-64" : ""}`}>
          {token && <Topbar currentPage={currentPage} disabled={!token} setSidebarOpen={setSidebarOpen} />}
         
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Startup />} />
              <Route path="/signup" element={<Signup setToken={setToken} />} />
              <Route path="/login" element={<Login setToken={setToken} />} />

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
              <Route
                path="/chat"
                element={
                  <ProtectedRoute token={token}>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-transaction"
                element={
                  <ProtectedRoute token={token}>
                    <AddTransaction />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
