import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import AppSidebar from "./Components/AppSidebar";
import Topbar from "./Components/Topbar";
import Dashboard from "./Pages/Dashboard"; 

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard"); 

  return (
    <Router>
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />

          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
