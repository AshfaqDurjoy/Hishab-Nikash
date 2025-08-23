import { StrictMode } from 'react'
import React from "react";
import { createRoot } from 'react-dom/client'
import { CurrencyProvider } from "./Components/CurrencyContext";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </React.StrictMode>
)
