import React from "react";
import { useNavigate } from "react-router-dom";
import "./Startup.css";

function Startup() {
  const navigate = useNavigate();

  return (
    <div className="startup-container">
      <div className="startup-illustration">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            d="M2 16C2 14.8954 2.89543 14 4 14H60C61.1046 14 62 14.8954 62 16V48C62 49.1046 61.1046 50 60 50H4C2.89543 50 2 49.1046 2 48V16Z"
            fill="#FFD700"
            stroke="#000"
            strokeWidth="2"
          />
          <circle cx="52" cy="32" r="6" fill="#FFA500" stroke="#000" strokeWidth="2"/>
          <line x1="52" y1="26" x2="52" y2="38" stroke="#000" strokeWidth="2"/>
          <line x1="46" y1="32" x2="58" y2="32" stroke="#000" strokeWidth="2"/>
        </svg>
      </div>

      <h1 className="startup-title">Hishab Nikash</h1>

      <p className="startup-tagline">Take control of your money. Simplify your life.</p>

      <p className="startup-onboarding">Start tracking your expenses today!</p>

      <div className="startup-buttons">
        <button className="btn-login" onClick={() => navigate("/login")}>
          Log In
        </button>
        <button className="btn-signup" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Startup;
