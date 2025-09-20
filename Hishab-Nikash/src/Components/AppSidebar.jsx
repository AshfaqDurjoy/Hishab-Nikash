import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AppSidebar = ({ setCurrentPage, disabled, setToken,sidebarOpen,setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null); 
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block mb-4 px-2 py-1 rounded-md ${
      isActive ? "bg-gray-700 text-white font-bold" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    } ${disabled ? "pointer-events-none opacity-50" : ""}`;

  const handleNavClick = (page) => {
    if (!disabled) setCurrentPage(page);
  };

  return (
  <>
    {}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {}
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 flex flex-col transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
    >
      <div className="flex flex-col items-start mb-8">
        <h2 className="text-xl font-extrabold">Hishab Nikash</h2>
        <h1 className="text-m font-semibold mt-2">Your Personal Finance App</h1>
      </div>

      <ul className="flex-1">
        <li>
          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => { handleNavClick("dashboard"); setSidebarOpen(false); }}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactionPage"
            className={linkClass}
            onClick={() => { handleNavClick("transactions"); setSidebarOpen(false); }}
          >
            Transaction
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={linkClass}
            onClick={() => { handleNavClick("report"); setSidebarOpen(false); }}
          >
            Report
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/budget"
            className={linkClass}
            onClick={() => { handleNavClick("budget"); setSidebarOpen(false); }}
          >
            Budget
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={linkClass}
            onClick={() => { handleNavClick("profile"); setSidebarOpen(false); }}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={linkClass}
            onClick={() => { handleNavClick("settings"); setSidebarOpen(false); }}
          >
            Settings
          </NavLink>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        disabled={disabled}
        className={`mt-auto border border-white text-white px-4 py-2 rounded-md hover:bg-gray-700 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Logout
      </button>
    </div>
  </>
);

};

export default AppSidebar;
