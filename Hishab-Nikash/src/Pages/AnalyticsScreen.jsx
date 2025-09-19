"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ExpenseChart } from "../Components/ExpenseChart";

// ==== CONFIG: choose backend URL ====
// 1) Use your Node/Express route from Server.js:
const ANALYTICS_URL = "http://localhost:5000/analytics"; // Make sure the backend server is running on port 5000
// 2) If you're using a PHP route instead, you can use the following line (comment out the above):
// const ANALYTICS_URL = "http://localhost/hishab-api/analytics.php"; 

// ==== Palettes (yours) ====
const PALETTE_CREDIT = ["#d9f2e4", "#bfe9d5", "#92d9bf", "#67c9a9", "#3fb894"];
const PALETTE_DEBIT  = ["#ffe2e2", "#ffc8c8", "#ffa8a8", "#ff8b8b", "#ff6b6b"];

// tiny colored dot for the legend
const Dot = ({ color }) => (
  <span className="inline-block align-middle" style={{ width: 10, height: 10, borderRadius: 9999, background: color }} />
);

export default function Report() {
  const [mode, setMode] = useState("credit"); // "credit" | "debit"
  const [range, setRange] = useState("7d");   // "today" | "3d" | "7d" | "1m"
  const [creditData, setCreditData] = useState([]); // Data for Credit Transactions [{name, amount}]
  const [debitData, setDebitData]   = useState([]); // Data for Debit Transactions [{name, amount}]
  const [loading, setLoading]       = useState(false); // For loading state
  const [error, setError]           = useState(""); // For error state

  // If you have user authentication, you can pass user_id
  const userId = null; // Example: from context/store or login session

  // Fetch analytics data whenever range changes
  useEffect(() => {
    const url = new URL(ANALYTICS_URL);
    url.searchParams.set("range", range); // Set range filter (7d, today, 3d, 1m)
    if (userId) url.searchParams.set("user_id", userId); // Optionally add user_id if available

    setLoading(true);
    setError(""); // Reset errors on new fetch

    fetch(url.toString()) // Fetch from backend
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`); // Handle failed request
        return r.json(); // Parse JSON data
      })
      .then((data) => {
        // Normalize shapes: Expect arrays [{name, amount}]
        const cd = Array.isArray(data.credit) ? data.credit : (data.credit?.rows || []);
        const dd = Array.isArray(data.debit)  ? data.debit  : (data.debit?.rows  || []);
        setCreditData(cd.map(x => ({ name: x.name, amount: Number(x.amount) || 0 })));
        setDebitData (dd.map(x => ({ name: x.name, amount: Number(x.amount) || 0 })));
      })
      .catch((e) => setError(e.message || "Failed to load analytics")) // Handle errors
      .finally(() => setLoading(false)); // End loading state
  }, [range, userId]); // Dependency array: refetch when `range` or `userId` changes

  const chartData = mode === "credit" ? creditData : debitData; // Select data based on mode
  const palette   = mode === "credit" ? PALETTE_CREDIT : PALETTE_DEBIT; // Set colors for chart

  const total = useMemo(
    () => chartData.reduce((s, d) => s + (Number(d.amount) || 0), 0), // Sum up total amount
    [chartData]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
        {/* Top bar: Credit/Debit toggle + Range filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full p-1 bg-gray-100 border border-gray-200">
              <button
                onClick={() => setMode("credit")}
                className={`px-4 py-2 text-sm md:text-base rounded-full transition
                  ${mode === "credit" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:text-gray-800"}`}
                aria-pressed={mode === "credit"}
              >
                Credit
              </button>
              <button
                onClick={() => setMode("debit")}
                className={`px-4 py-2 text-sm md:text-base rounded-full transition
                  ${mode === "debit" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:text-gray-800"}`}
                aria-pressed={mode === "debit"}
              >
                Debit
              </button>
            </div>
          </div>

          {/* Range filter */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-full p-1 bg-gray-100 border border-gray-200">
              {["today", "3d", "7d", "1m"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition
                    ${range === r ? "bg-gray-900 text-white shadow" : "text-gray-700 hover:text-gray-900"}`}
                  aria-pressed={range === r}
                  title={
                    r === "today" ? "Today" :
                    r === "3d"    ? "Past 3 days" :
                    r === "7d"    ? "Past 7 days" : "Past 1 month"
                  }
                >
                  {r === "today" ? "Today" : r === "3d" ? "3d" : r === "7d" ? "7d" : "1m"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && <p className="mt-4 text-sm text-gray-500">Loading analytics…</p>}
        {error &&   <p className="mt-4 text-sm text-rose-600">Error: {error}</p>}

        {/* Chart + Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6 items-start">
          <div className="lg:col-span-3">
            <ExpenseChart data={chartData} palette={palette} /> {/* Chart for displaying data */}
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-100 p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Breakdown</h3>
              <ul className="space-y-2">
                {chartData.map((d, i) => {
                  const pct = total ? ((d.amount / total) * 100).toFixed(1) : 0;
                  const color = palette[i % palette.length];
                  return (
                    <li key={d.name} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Dot color={color} />
                        <span className="text-sm text-gray-800 truncate">{d.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">৳{Number(d.amount).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{pct}%</div>
                      </div>
                    </li>
                  );
                })}
                {!loading && chartData.length === 0 && (
                  <li className="text-sm text-gray-500">No data in this range.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-2 rounded-xl border border-gray-100 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {mode === "credit" ? "Total Credit" : "Total Debit"}
            </p>
            <div className="flex items-end gap-2">
              <div className="text-3xl md:text-4xl font-extrabold">
                ৳{total.toLocaleString()}
              </div>
              <span className={`inline-flex items-center text-sm font-medium ${mode === "credit" ? "text-emerald-600" : "text-rose-600"}`}>
                {mode === "credit" ? "Inflow" : "Outflow"}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">View</p>
            <p className="text-lg font-semibold">{mode === "credit" ? "Credit" : "Debit"}</p>
            <p className="text-xs text-gray-500 mt-1">Filter: {range === "today" ? "Today" : range === "3d" ? "Past 3 days" : range === "7d" ? "Past 7 days" : "Past 1 month"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
