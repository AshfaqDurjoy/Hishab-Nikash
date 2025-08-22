import React from "react";
/*
// Transaction data moved here for rendering
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
  // Add more transactions as needed...
];*/

const TransactionCard = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Transactions Section */}
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
                  {transaction.type[0]} {/* First letter of transaction type */}
                </span>
              </div>
              <div>
                <div className="font-semibold">{transaction.name}</div>
                <div className="text-sm text-gray-500">
                  {transaction.timestamp}
                </div>
              </div>
            </div>
            <div className={`text-${transaction.category}-500 font-semibold`}>
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionCard;
