import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppSidebar from "./Components/AppSidebar";
//import TopBar from "./Components/TopBar";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <div className="max-w-5xl mx-auto p-8">
            <Routes>
              <Route path="/transactions" element={<div>Transactions</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
