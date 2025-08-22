import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; 
 

const Topbar = () => {

  const [currentPage, setCurrentPage] = useState('Transactions');

  const getPageTitle = () => {
    switch (currentPage) {
      case 'transactions':
        return 'Transactions';
      case 'dashboard':
        return 'Dashboard';
      default:
        return 'Page Title';
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">

      <div className="text-sm font-semibold text-gray-800">
        <h1>{getPageTitle()}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-black rounded-md text-sm text-gray-700 w-64 bg-gray-200"
        />
        <button className="bg-white border border-black p-2 rounded-full">
          <FaBell className="text-black" />
        </button>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
          + Add Transaction
        </button>
      </div>
    </div>
  );
};

export default Topbar;
