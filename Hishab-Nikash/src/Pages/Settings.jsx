import React from "react";
import { Link } from "react-router-dom"; 
import { FaDollarSign, FaBullseye, FaDownload } from "react-icons/fa";
import CurrencySelector from "../Components/CurrencySelector.jsx";

const settingsOptions = [
  { icon: <FaDollarSign />, title: "Change Currency", component: <CurrencySelector /> },
  
  { icon: <FaDownload />, title: "Export Data" },
];

const SettingsPage = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Settings</h1>

        {settingsOptions.map((option, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
          >
            
            <div className="flex items-center gap-4">
              <div className="text-gray-700 text-lg">{option.icon}</div>
              <span className="text-gray-800 font-medium">{option.title}</span>
            </div>

            
            {option.component && <div className="mt-2">{option.component}</div>}
          </div>
        ))}
         <Link
          to="/settings/about"
          className="text-blue-600 hover:underline mt-4 text-center"
        >
          Learn more about Hishab Nikash
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
