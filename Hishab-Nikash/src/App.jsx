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
import Startup from "./Components/Startup";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard"); 

  return (
    <Router>
      

    <Routes>
  
  <Route path="/" element={<Startup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route
    path="/dashboard"
    element={
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />
          <Dashboard />
        </div>
      </div>
    }
  />

  <Route
    path="/budget"
    element={
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />
          <Budget />
        </div>
      </div>
    }
  />

  <Route
    path="/transactionPage"
    element={
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />
          <TransactionPage />
        </div>
      </div>
    }
  />

  <Route
    path="/report"
    element={
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />
          <Report />
        </div>
      </div>
    }
  />

  <Route
    path="/profile"
    element={
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />
          <Profile />
        </div>
      </div>
    }
  />

  <Route
    path="/settings"
    element={
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />
          <Settings />
        </div>
      </div>
    }
  />
</Routes>

    </Router>
  );
};

export default App;
