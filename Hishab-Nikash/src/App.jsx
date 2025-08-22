<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
=======
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // For routing
import AppSidebar from "./Components/AppSidebar";
import Topbar from "./Components/Topbar";
import Dashboard from "./Pages/Dashboard"; // Importing Dashboard

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard"); // Default page is dashboard

  return (
    <Router>
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar currentPage={currentPage} />

          {/* Route Switch */}
          <Routes>
            {/* Default route to the Dashboard */}
            <Route path="/" element={<Dashboard />} />
            {/* Add other routes as necessary */}
            {/* <Route path="/transactions" element={<Transactions />} /> */}
            {/* <Route path="/reports" element={<Reports />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};
>>>>>>> Stashed changes

export default App
