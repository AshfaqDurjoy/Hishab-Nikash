import React, { useState } from "react";
import { FaFilter, FaCalendarAlt } from "react-icons/fa"; 

const transactions = [
  {
    id: 1,
    name: "Salary Deposit",
    amount: "+5000",
    timestamp: "Today, 9:00 AM",
    type: "Salary",
    category: "green",
  },
  {
    id: 2,
    name: "Grocery Shopping",
    amount: "-250",
    timestamp: "Yesterday, 6:30 PM",
    type: "Shopping",
    category: "purple",
  },
];

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center border border-black px-4 py-2 rounded-md text-sm">
            <FaFilter className="mr-2" />
            Filter
          </button>

          <select className="border border-black px-4 py-2 rounded-md text-sm">
            <option value="all">All Categories</option>
            <option value="salary">Salary</option>
            <option value="shopping">Shopping</option>
          </select>

          <button className="flex items-center border border-black px-4 py-2 rounded-md text-sm">
            <FaCalendarAlt className="mr-2" />
            Calendar
          </button>
        </div>

        <div className="text-sm font-semibold text-gray-800">
          Total Transactions Found: {transactions.length}
        </div>

        <button className="bg-white text-black border border-black px-4 py-2 rounded-md text-sm">
          Export
        </button>
      </div>

      <div className="mt-8">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full bg-${transaction.category}-500 flex items-center justify-center`}
              >
                <span className="text-white text-xl">
                  {transaction.type[0]}
                </span>
              </div>
              <div>
                <div className="font-semibold">{transaction.name}</div>
                <div className="text-sm text-gray-500">
                  {transaction.timestamp}
                </div>
              </div>
            </div>
            <div
              className={`text-${transaction.category}-500 font-semibold`}
            >
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
