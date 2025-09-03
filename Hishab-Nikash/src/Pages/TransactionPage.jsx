import React from "react";
import TransactionCard from "../Components/TransactionCard";

const TransactionPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <p className="text-gray-700">
        Here are all your recent transactions with category colors and type. 
      </p>

      <TransactionCard />
    </div>
  );
};

export default TransactionPage; 
