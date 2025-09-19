import React from "react";

const TransactionCard = ({ name, type, amount, timestamp }) => {
  // Format amount with commas and currency symbol
  const formattedAmount = `${type === "Income" ? "৳" : "-৳"}${Math.abs(amount).toLocaleString()}`;

  // Format date nicely
  const formattedDate = new Date(timestamp).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        {/* Type badge */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            type === "Income" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <span className="text-white font-bold text-lg">
            {type[0]}
          </span>
        </div>

        {/* Transaction info */}
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>

      {/* Amount */}
      <div className={`${type === "Income" ? "text-green-600" : "text-red-600"} font-bold text-lg`}>
        {formattedAmount}
      </div>
    </div>
  );
};

export default TransactionCard;
