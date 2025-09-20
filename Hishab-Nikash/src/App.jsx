import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AppSidebar from "./Components/AppSidebar";
import Topbar from "./Components/Topbar";
import Dashboard from "./Pages/Dashboard";
import Budget from "./Pages/Budget";
import TransactionPage from "./Pages/TransactionPage";
import AnalyticsScreen from "./Pages/AnalyticsScreen";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import About from "./Pages/About"; 
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";


//import { AnalyticsScreen } from "./Pages/AnalyticsScreen";

import ProtectedRoute from "./Components/ProtectedRoute";
import Startup from "./Pages/Startup";

import AddTransaction from "./Pages/AddTransaction";
import Chat from './Pages/Chat';


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
    <Router basename="/Hishab-Nikash">

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
       

        <div className={`flex-1 flex flex-col ${token ? "md:ml-64" : ""} `}>


          {token && 
           <Topbar currentPage={currentPage} 
           disabled={!token} 
           setSidebarOpen={setSidebarOpen}
           />

          }
         
          <Routes>

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
              path="/AnalyticsScreen"
              element={
                <ProtectedRoute token={token}>
                  <AnalyticsScreen />
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
              path="/settings/about"
              element={
                <ProtectedRoute token={token}>
                  <About />
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
        </div>
      </div>
    </Router>

  );
};
export default App;