import React from "react";

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
  {
    id: 3,
    name: "Coffee Shop",
    amount: "-85",
    timestamp: "Yesterday, 2:15 PM",
    type: "Coffee",
    category: "yellow",
  },
  {
    id: 4,
    name: "Uber Ride",
    amount: "-120",
    timestamp: "Yesterday, 11:45 AM",
    type: "Transport",
    category: "blue",
  },
  {
    id: 5,
    name: "Freelance Payment",
    amount: "+800",
    timestamp: "Aug 1, 4:00 PM",
    type: "Salary",
    category: "green",
  },
];

function App() {
  return (
    <div className="bg-gray-100 h-screen font-sans text-gray-800">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Transaction
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
    </div>
  );
}

export default App;
