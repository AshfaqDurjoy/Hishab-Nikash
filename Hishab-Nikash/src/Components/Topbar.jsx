
import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Topbar = ({ currentPage, disabled }) => {
  const [currentPage, setCurrentPage] = useState('Transactions');
  const navigate = useNavigate();


  const getPageTitle = () => {
    if (disabled) return "Welcome";

    switch (currentPage.toLowerCase()) {
      case "transactions":
        return "Transactions";
      case "dashboard":
        return "Dashboard";
      case "budget":
        return "Budget";
      case "report":
        return "Report";
      case "profile":
        return "Profile";
      case "settings":
        return "Settings";
      default:
        return "Page Title";
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Page Title */}
      <div className="text-sm font-semibold text-gray-800">
        <h1>{getPageTitle()}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder={disabled ? "Login required" : "Search..."}
          className={`px-4 py-2 border border-black rounded-md text-sm text-gray-700 w-64 ${
            disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "bg-gray-200"
          }`}
          disabled={disabled}
        />
        <button
          className={`bg-white border border-black p-2 rounded-full ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={disabled}
        >
          <FaBell className="text-black" />
        </button>

        <button 
         onClick={ () => navigate ( "/add-transaction")} 
          className={`px-4 py-2 rounded-md text-sm ${
            disabled ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50" : "bg-black text-white"
          }`}
          disabled={disabled}
        >
          + Add Transaction
        </button>
      </div>
    </div>
  );
};

export default Topbar;
