/*import React, { useState, useEffect } from "react";
import TransactionCard from "../Components/TransactionCard";
import AddTransaction from "./AddTransaction";
const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
const [categories, setCategories]= useState(["Grocery", "Rent", "Others"]);
const [newCategory, setNewCategory] =useState("");

const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  fetch(`http://127.0.0.1:8000/api/transactions/${user.id}`)
    .then(res => res.json())
    .then(data => setTransactions(data))
    .catch(err => console.error("Error Fetching Transactions:", err));
}, []);

  const handleAdd = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleAddCategory = () =>{
    if(newCategory.trim() && !categories.includes(newCategory)){
      setCategories((prev) => [...prev, newCategory.trim()]);

    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <p className="text-gray-700">
        Here are all your recent transactions with category colors and type.
      </p>
    
      <div className="mb-6 flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-400 rounded-md"
        />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add
        </button>
      </div>

      
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {cat}
          </span>
        ))}
      </div>
     
      <div className="mt-6 space-y-4 max-w-5xl mx-auto">
        {transactions.map((tx) => (
          <TransactionCard key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;*/

import React, { useState, useEffect } from "react";
import TransactionCard from "../Components/TransactionCard";
import Topbar from "../Components/Topbar";
const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  
  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:8000/api/transactions/${userId}`)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error("Error Fetching Transactions:", err));
  }, [userId]);


  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:8000/api/user-categories/${userId}`)
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error("Error Fetching Categories:", err));
  }, [userId]);

  const handleAddCategory = async () => {
    if (!newCategory.trim() || categories.includes(newCategory.trim())) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/add-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          category_name: newCategory.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCategories((prev) => [...prev, newCategory.trim()]);
        setNewCategory("");
      } else {
        alert(data.message || "Category already exists!");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Something went wrong!");
    }
  };
const filteredTransactions = transactions.filter((tx) =>
    tx.category?.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      

      

      <div className="mb-6 flex gap-4 max-w-full">
  
  <div className="flex gap-2 flex-1">
    <input
      type="text"
      placeholder="Search by category..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-1 px-2 py-1 border border-gray-400 rounded-md text-sm"
    />
    <button
      onClick={() => setAppliedSearch(searchQuery)}
      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
    >
      Search
    </button>
  </div>

  {/* Add category group */}
  <div className="flex gap-2 flex-1">
    <input
      type="text"
      placeholder="Add new category"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      className="flex-1 px-2 py-1 border border-gray-400 rounded-md text-sm"
    />
    <button
      onClick={handleAddCategory}
      className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
    >
      Add
    </button>
  </div>
</div>



     
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {cat}
          </span>
        ))}
      </div>

      
     <div className="mt-6 space-y-4 max-w-5xl mx-auto">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))
        ) : (
          <p className="text-gray-500">No transactions found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;

