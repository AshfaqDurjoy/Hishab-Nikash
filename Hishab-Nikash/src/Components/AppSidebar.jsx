import React from 'react';

const AppSidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-full fixed top-0 left-0 p-4">
      <div className="flex flex-col items-start mb-8">
        <h2 className="text-xl font-extrabold">Hishab Nikash</h2>
        <h1 className="text-m font-semibold mt-2">Your Personal Finance App</h1>
      </div>
      <ul>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Transactions
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Reports
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Bud
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AppSidebar;
