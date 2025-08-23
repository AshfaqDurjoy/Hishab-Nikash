import React from "react";
import { NavLink } from "react-router-dom";

const AppSidebar = () => {
  const linkClass = ({ isActive }) =>
    `block mb-4 px-2 py-1 rounded-md ${
      isActive ? "bg-gray-700 text-white font-bold" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="bg-gray-800 text-white w-64 h-full fixed top-0 left-0 p-4 flex flex-col">
      <div className="flex flex-col items-start mb-8">
        <h2 className="text-xl font-extrabold">Hishab Nikash</h2>
        <h1 className="text-m font-semibold mt-2">Your Personal Finance App</h1>
      </div>

      <ul className="flex-1">
        <li>
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactionPage" className={linkClass}>
            Transaction
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" className={linkClass}>
            Report
          </NavLink>
        </li>
        <li>
          <NavLink to="/budget" className={linkClass}>
            Budget
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </li>
      </ul>

      <button className="mt-auto border border-white text-white px-4 py-2 rounded-md hover:bg-gray-700">
        Logout
      </button>
    </div>
  );
};

export default AppSidebar;
