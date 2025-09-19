import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionCard from "../Components/TransactionCard";

const TransactionPage = ({ showForm, setShowForm }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "Income",
    amount: "",
  });

  // Fetch transactions from backend
  const fetchTransactions = () => {
    axios
      .get("http://localhost/hishab-nikash/backend/getTransactions.php")
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // Summary calculations
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome + totalExpense;

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost/hishab-nikash/backend/addTransaction.php", formData)
      .then((res) => {
        if (res.data.success) {
          fetchTransactions(); // Refresh list
          setShowForm(false); // Close modal
          setFormData({ name: "", type: "Income", amount: "" }); // Reset form
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add transaction");
      });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="font-semibold">Total Income</h2>
          <p className="text-green-600 font-bold text-lg">
            ৳{totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="font-semibold">Total Expense</h2>
          <p className="text-red-600 font-bold text-lg">
            ৳{Math.abs(totalExpense).toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="font-semibold">Balance</h2>
          <p
            className={`${
              balance >= 0 ? "text-green-600" : "text-red-600"
            } font-bold text-lg`}
          >
            ৳{balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="grid gap-4 mb-6">
        {transactions.map((t) => (
          <TransactionCard
            key={t.id}
            name={t.name}
            type={t.type}
            amount={parseFloat(t.amount)}
            timestamp={t.timestamp}
          />
        ))}
      </div>

      {/* Add Transaction Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
