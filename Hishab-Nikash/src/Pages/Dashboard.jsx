import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFilter, FaCalendarAlt, FaRobot } from "react-icons/fa";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiCurrencyBangladeshi,
  HiCalendar,
} from "react-icons/hi";
import TransactionCard from "./TransactionCard";

// Optional color tags if your TransactionCard doesn't style categories
const categoryColors = {
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

// Helper: CSV export
function exportToCSV(rows, filename = "transactions.csv") {
  if (!rows?.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const v = r[h] ?? "";
          const s = String(v).replaceAll('"', '""');
          return `"${s}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const Dashboard = () => {
  const navigate = useNavigate();

  // State
  const [transactions, setTransactions] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Configure your API endpoint:
  // Prefer Vite env (VITE_TXN_URL), else fallback to your PHP route.
  const API_URL =
    import.meta?.env?.VITE_TXN_URL || "http://localhost/transactions.php";

  // Fetch transactions once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL, {
          headers: { Accept: "application/json" },
        });

        // Accept either: Array or {transactions: [...]}
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.transactions || [];

        if (mounted) setTransactions(list);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load transactions");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  // Derived stats
  const { totalCredit, totalDebit, totalBalance, monthBalance } = useMemo(() => {
    const isThisMonth = (ts) => {
      const d = new Date(ts || Date.now());
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    };

    let credit = 0;
    let debit = 0;
    let month = 0;

    for (const t of transactions) {
      const amt = Number(t.amount) || 0;
      if ((t.type || "").toLowerCase() === "credit") credit += amt;
      if ((t.type || "").toLowerCase() === "debit") debit += amt;
      if (isThisMonth(t.timestamp || t.date || t.created_at)) {
        // monthBalance as net amount (credit positive, debit negative)
        month += (t.type || "").toLowerCase() === "debit" ? -Math.abs(amt) : Math.abs(amt);
      }
    }

    return {
      totalCredit: credit,
      totalDebit: debit,
      totalBalance: credit - debit,
      monthBalance: month,
    };
  }, [transactions]);

  // UI helpers
  const filteredTransactions = useMemo(() => {
    if (filterCategory === "all") return transactions;
    return transactions.filter(
      (t) =>
        (t.category || "").toLowerCase() === filterCategory.toLowerCase() ||
        (t.type || "").toLowerCase() === filterCategory.toLowerCase()
    );
  }, [transactions, filterCategory]);

  const openChat = () => navigate("/chat");
  const handleExport = () => exportToCSV(transactions);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button className="flex items-center border border-black px-4 py-2 rounded-md text-sm">
            <FaFilter className="mr-2" /> Filter
          </button>

          <select
            className="border border-black px-4 py-2 rounded-md text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="salary">Salary</option>
            <option value="shopping">Shopping</option>
            <option value="credit">Only Credit</option>
            <option value="debit">Only Debit</option>
          </select>

          <button className="flex items-center border border-black px-4 py-2 rounded-md text-sm">
            <FaCalendarAlt className="mr-2" /> Calendar
          </button>
        </div>

        <div className="text-sm font-semibold text-gray-800">
          Total Transactions Found: {filteredTransactions.length}
        </div>

        <button
          onClick={handleExport}
          className="bg-white text-black border border-black px-4 py-2 rounded-md text-sm"
        >
          Export
        </button>
      </div>

      {/* Error / Loading */}
      {error && (
        <div className="mb-4 p-3 rounded-md border border-red-300 bg-red-50 text-red-700">
          Failed to load: {error}
        </div>
      )}
      {loading && (
        <div className="mb-4 p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-700">
          Loading transactions…
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-50 text-blue-600">
            <HiCurrencyBangladeshi className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Balance</div>
            <div className="text-lg font-semibold">৳ {totalBalance.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-50 text-green-600">
            <HiTrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Credit</div>
            <div className="text-lg font-semibold">৳ {totalCredit.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-red-50 text-red-600">
            <HiTrendingDown className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Debit</div>
            <div className="text-lg font-semibold">৳ {totalDebit.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-purple-50 text-purple-600">
            <HiCalendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">This Month</div>
            <div className="text-lg font-semibold">৳ {monthBalance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Transactions list */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <TransactionCard
            key={transaction.id || `${transaction.name}-${transaction.timestamp}`}
            transaction={transaction}
            // If your TransactionCard accepts extra props, you can pass categoryColors or others here
            categoryColors={categoryColors}
          />
        ))}
        {!loading && !filteredTransactions.length && (
          <div className="text-sm text-gray-500">No transactions to display.</div>
        )}
      </div>

      {/* Chat FAB */}
      <button
        onClick={openChat}
        className="fixed bottom-4 right-4 bg-black hover:bg-gray-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center z-50"
        aria-label="Open Chat"
        title="Open Chat"
      >
        <FaRobot className="w-6 h-5" />
      </button>
    </div>
  );
};

export default Dashboard;
