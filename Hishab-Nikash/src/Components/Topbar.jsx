import React from 'react';
import { FaBell, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ currentPage, disabled, setSidebarOpen }) => {
  const navigate = useNavigate();

  const getPageTitle = () => {
    if (disabled) return "Welcome";
    switch (currentPage.toLowerCase()) {
      case "transactions": return "Transactions";
      case "dashboard": return "Dashboard";
      case "budget": return "Budget";
      case "report": return "Report";
      case "profile": return "Profile";
      case "settings": return "Settings";
      default: return "Page Title";
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
      {}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          className="md:hidden p-2 border border-black rounded-md"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
        <h1 className="text-sm font-semibold text-gray-800">{getPageTitle()}</h1>
      </div>

      {}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <input
          type="text"
          placeholder={disabled ? "Login required" : "Search..."}
          className={`px-4 py-2 border border-black rounded-md text-sm text-gray-700 w-full sm:w-64 ${
            disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "bg-gray-200"
          }`}
          disabled={disabled}
        />
        <div className="flex items-center gap-3">
          <button className={`bg-white border border-black p-2 rounded-full ${disabled ? "cursor-not-allowed opacity-50" : ""}`} disabled={disabled}>
            <FaBell className="text-black" />
          </button>
          <button
            onClick={() => navigate("/add-transaction")}
            className={`px-4 py-2 rounded-md text-sm ${disabled ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50" : "bg-black text-white"}`}
            disabled={disabled}
          >
            + Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
