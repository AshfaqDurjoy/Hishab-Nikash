import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import AppSidebar from "./Components/AppSidebar";
import Topbar from "./Components/Topbar";
import Dashboard from "./Pages/Dashboard"; 
import Budget from "./Pages/Budget";
import TransactionPage from "./Pages/TransactionPage";
import AnalyticsScreen from "./Pages/AnalyticsScreen";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import About from "./Pages/About"; 
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

//import { AnalyticsScreen } from "./Pages/AnalyticsScreen";
import AddTransaction from "./Pages/AddTransaction";


const App = () => {
  const [currentPage, setCurrentPage] = useState("AnalyticsScreens"); 

  return (
    <Router>
      <div className="flex">
        <AppSidebar />
        <div className="ml-64 bg-gray-100 w-full">
          <Topbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />

           
              <Route path="/budget" element={<Budget/>} />
                 <Route path="/transactionPage" element={<TransactionPage/>} />
                    <Route path="/AnalyticsScreen" element={<AnalyticsScreen/>} />
                     <Route path="/profile" element={<Profile/>} />
                    <Route path="/settings/about" element={<About />} />
                      <Route path="/settings" element={<Settings/>} />

=======
            <Route path="/budget" element={<Budget/>} />
            <Route path="/add-transaction" element={<AddTransaction/>} />
            {/*<Route path="/report" element={<Report/>} />*/}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/settings" element={<Settings/>} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/transactionPage" element={<TransactionPage />} />

          </Routes>

        </div>
      </div>
    </Router>
  );
};

export default App;
