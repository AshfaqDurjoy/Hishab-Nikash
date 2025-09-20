/*
import React from "react";
import { FaFilter, FaCalendarAlt, FaRobot } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown, HiCurrencyBangladeshi, HiCalendar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const transactions = [
  {
    id: 1,
    name: "Salary Deposit",
    amount: 5000,
    timestamp: "Today, 9:00 AM",
    type: "credit", 
    category: "green",
  },
  {
    id: 2,
    name: "Grocery Shopping",
    amount: -250,
    timestamp: "Yesterday, 6:30 PM",
    type: "debit",
    category: "purple",
  },
];

const stats = [
  {
    title: "Total Balance",
    value: "৳ 9,680",
    icon: HiCurrencyBangladeshi,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Credit",
    value: "৳ 41,100",
    icon: HiTrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Debit",
    value: "৳ 31,420",
    icon: HiTrendingDown,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "This Month",
    value: "৳ 12,350",
    icon: HiCalendar,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const categoryColors = {
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

const Dashboard = () => {
   const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:8000/api/transactions/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // take only first 4 transactions
        setTransactions(data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, [userId]);

  const openChat = () => {
   
    navigate("/chat");
  };
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button className="flex items-center border border-black px-4 py-2 rounded-md text-sm">
            <FaCalendarAlt className="mr-2" /> Calendar
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`flex items-center p-4 rounded-lg shadow-sm ${stat.bgColor}`}
            >
              <div className={`p-3 rounded-full ${stat.color} bg-white/30 mr-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="font-semibold text-lg">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryColors[transaction.category]}`}
              >
                <span className="text-white font-bold text-lg">
                  {transaction.type[0].toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-semibold">{transaction.name}</div>
                <div className="text-sm text-gray-500">{transaction.timestamp}</div>
              </div>
            </div>
            <div
              className={`font-semibold ${
                transaction.amount > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {transaction.amount > 0 ? "+" : "-"}৳{Math.abs(transaction.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={openChat}
        className="fixed bottom-4 right-4 bg-black hover:bg-gray-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center z-50"
      >
        <FaRobot className="w-6 h-5" />
      </button>
    </div>
  );
};

export default Dashboard;*/

import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown, HiCurrencyBangladeshi } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const categoryColors = {
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

useEffect(() => {
  if (!userId) return;

  fetch(`http://127.0.0.1:8000/api/transactions/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      setTransactions(data.slice(0, 4)); // first 4 transactions

      const totalCredit = data
        .filter(tx => tx.type.toLowerCase() === "credit")
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

      const totalDebit = data
        .filter(tx => tx.type.toLowerCase() === "debit")
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

      const totalBalance = totalCredit - totalDebit;

      setStats([
        { title: "Total Balance", value: `৳ ${totalBalance.toLocaleString()}`, icon: HiCurrencyBangladeshi, color: "text-blue-600", bgColor: "bg-blue-50" },
        { title: "Total Credit", value: `৳ ${totalCredit.toLocaleString()}`, icon: HiTrendingUp, color: "text-green-600", bgColor: "bg-green-50" },
        { title: "Total Debit", value: `৳ ${totalDebit.toLocaleString()}`, icon: HiTrendingDown, color: "text-red-600", bgColor: "bg-red-50" },
      ]);
    })
    .catch((err) => console.error("Error fetching transactions:", err));
}, [userId]);


  const openChat = () => {
    navigate("/chat");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`flex items-center p-4 rounded-lg shadow-sm ${stat.bgColor}`}>
              <div className={`p-3 rounded-full ${stat.color} bg-white/30 mr-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="font-semibold text-lg">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  categoryColors[transaction.category] || "bg-gray-500"
                }`}
              >
                <span className="text-white font-bold text-lg">
                  {transaction.type[0].toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-semibold">{transaction.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(transaction.created_at).toLocaleString()}
                </div>
              </div>
            </div>
            <div
              className={`font-semibold ${transaction.type === "Credit" ? "text-green-500" : "text-red-500"}`}
            >
              {transaction.type === "Credit" ? "+" : "-"}৳{transaction.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={openChat}
        className="fixed bottom-4 right-4 bg-black hover:bg-gray-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center z-50"
      >
        <FaRobot className="w-6 h-5" />
      </button>
    </div>
  );
};

export default Dashboard;
