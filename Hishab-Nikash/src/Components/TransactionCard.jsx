import React from "react";

// Sample transactions
const transactions = [
  {
    id: 1,
    name: "Grocery shopping",
    type: "Debit",
    category: "Grocery",
    amount: "-1500",
    timestamp: "2025-09-04 10:30 AM",
  },
  {
    id: 2,
    name: "Salary",
    type: "Credit",
    category: "Income",
    amount: "+50000",
    timestamp: "2025-09-01 09:00 AM",
  },
  {
    id: 3,
    name: "Internet Bill",
    type: "Debit",
    category: "Internet",
    amount: "-1200",
    timestamp: "2025-09-02 03:00 PM",
  },
];


const categoryColorClass = {
  Grocery: "bg-green-500",
  Milk: "bg-yellow-500",
  Internet: "bg-blue-500",
  "Gas Filling": "bg-orange-500",
  Electricity: "bg-purple-500",
  Water: "bg-cyan-500",
  Rent: "bg-rose-500",
  "Phone Bill": "bg-indigo-500",
  "Dining Out": "bg-pink-500",
  Entertainment: "bg-violet-500",
  Healthcare: "bg-teal-500",
  Transportation: "bg-amber-500",
  Clothing: "bg-lime-500",
  Insurance: "bg-fuchsia-500",
  Education: "bg-sky-500",
  Others: "bg-gray-500",
  Income: "bg-emerald-500",
};

const TransactionCard = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mt-8 max-h-[500px] overflow-y-auto">
        {transactions.map((transaction) => {
          const bgClass = categoryColorClass[transaction.category] || "bg-gray-500";

          const amountColor = transaction.amount.startsWith("-") ? "text-red-500" : "text-green-500";

          return (
            <div
              key={transaction.id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center`}>
                  <span className="text-white font-bold">{transaction.type[0]}</span>
                </div>
                <div>
                  <div className="font-semibold">{transaction.name}</div>
                  <div className="text-sm text-gray-500">{transaction.timestamp}</div>
                </div>
              </div>
              
              <div className={`font-semibold ${amountColor}`}>
                ৳{transaction.amount}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionCard;
