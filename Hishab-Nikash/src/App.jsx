import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Startup from "./Pages/Startup";

const App = () => { 
  const [currentPage, setCurrentPage] = useState("dashboard");
  return(
    <Router>
<Routes>
  
  <Route path="/" element={<Startup />} />

  
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/budget" element={<Budget />} />
  <Route path="/transactionPage" element={<TransactionPage />} />
  <Route path="/report" element={<Report />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />

  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
</Routes>

      </Router>
  );
};
export default App;