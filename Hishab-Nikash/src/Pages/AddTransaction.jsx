import React, { useState, useEffect } from "react";

const AddTransaction = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
  });

  const [typeOpen, setTypeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  // Get user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUserId(user.id);
  }, []);

  // Fetch categories for this user
  useEffect(() => {
    if (!userId) return;
    fetch(`http://127.0.0.1:8000/api/user-categories/${userId}`)
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error(err));
  }, [userId]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/add-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          title: formData.title,
          amount: Number(formData.amount),
          type: formData.type,
          category: formData.category,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Transaction Added Successfully!");

        if (typeof onAdd === "function") {
          const newTx = {
            id: data.transactionId,
            title: formData.title,
            amount: Number(formData.amount),
            type: formData.type,
            category: formData.category,
            created_at: new Date().toISOString(),
          };
          onAdd(newTx);
        }

        setFormData({ title: "", amount: "", type: "", category: "" });
      } else {
        console.error("Error saving transaction:", data);
        alert(data.message || "Error saving transaction!");
      }
    } catch (err) {
      console.error("Error submitting transaction:", err);
      alert("Something went wrong! Check console.");
    }
  };

  return (
    <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm"
            placeholder="e.g. Grocery shopping"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm"
            placeholder="e.g. 1500"
            required
          />
        </div>

        {/* Type */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <div
            className="w-full border border-gray-400 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer"
            onClick={() => setTypeOpen(!typeOpen)}
          >
            <span>{formData.type || "-- Select Type"}</span>
            <svg
              className={`h-4 w-4 transform transition-transform ${
                typeOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {typeOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-400 mt-1 max-h-40 overflow-y-auto rounded-md shadow-md">
              {["Debit", "Credit"].map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    handleChange("type", option);
                    setTypeOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Category */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div
            className="w-full border border-gray-400 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <span>{formData.category || "-- Select Category"}</span>
            <svg
              className={`h-4 w-4 transform transition-transform ${
                categoryOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {categoryOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-400 mt-1 max-h-40 overflow-y-auto rounded-md shadow-md">
              {categories.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    handleChange("category", option);
                    setCategoryOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm w-full cursor-pointer hover:bg-blue-700"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
