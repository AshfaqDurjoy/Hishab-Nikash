import React from "react";

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
  Salary: "bg-emerald-500",  
  Bonus: "bg-emerald-600",   
  "Part Time": "bg-emerald-700", 
};

const TransactionCard = ({ transaction }) => {
  const circleBg = categoryColorClass[transaction.category] || "bg-gray-500";


  const amountColor = transaction.type === "Debit" ? "text-red-500" : "text-green-500";
  const sign = transaction.type === "Debit" ? "-" : "+";

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between hover:shadow-xl transition-shadow">
      <div className="flex items-center space-x-4">
        {}
        <div className={`w-10 h-10 rounded-full ${circleBg} flex items-center justify-center`}>
          <span className="text-white font-bold">{transaction.type[0]}</span>
        </div>

        {/* info */}
        <div>
          <div className="font-semibold">{transaction.title}</div>
          <div className="text-sm text-gray-500">{transaction.timestamp}</div>
        </div>
      </div>

      {}
      <div className={`font-semibold ${amountColor}`}>
        {sign}৳{Math.abs(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionCard;
