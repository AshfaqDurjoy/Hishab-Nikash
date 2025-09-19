import React from "react";
import { FaFilter, FaCalendarAlt } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown, HiCurrencyBangladeshi, HiCalendar } from "react-icons/hi";

const transactions = [
  {
    id: 1,
    name: "Salary Deposit",
    amount: 5000,
    timestamp: "Today, 9:00 AM",
    type: "credit", // credit or debit
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
  return (
    

    <div className="max-w-5xl mx-auto p-8">
      {/* Filters */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <button className="flex items-center border border-black px-4 py-2 rounded-md text-sm">
            <FaFilter className="mr-2" /> Filter
          </button>
          <select className="border border-black px-4 py-2 rounded-md text-sm">
            <option value="all">All Categories</option>
            <option value="salary">Salary</option>
            <option value="shopping">Shopping</option>
          </select>
          <button className="flex items-center border border-black px-4 py-2 rounded-md text-sm">
            <FaCalendarAlt className="mr-2" /> Calendar
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-800">
          Total Transactions Found: {transactions.length}
        </div>
        <button className="bg-white text-black border border-black px-4 py-2 rounded-md text-sm">
          Export
        </button>
      </div>

      {/* Stats */}
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

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between"
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
    </div>
  );
};

export default Dashboard;
