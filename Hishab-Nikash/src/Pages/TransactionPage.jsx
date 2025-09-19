import React, { useState, useEffect } from "react";
import TransactionCard from "../Components/TransactionCard";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error Fetching Transactions:", err));
  }, []);

  const handleAdd = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <p className="text-gray-700">
        Here are all your recent transactions with category colors and type.
      </p>
      {/* list */}
      <div className="mt-6 space-y-4 max-w-5xl mx-auto">
        {transactions.map((tx) => (
          <TransactionCard key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;
