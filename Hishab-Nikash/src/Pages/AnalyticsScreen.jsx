"use client";
import React, { useMemo, useState } from "react";
import { ExpenseChart } from "../Components/ExpenseChart";


const CREDIT_CATEGORIES = [
  { name: "Salary", amount: 5200 },
  { name: "Refunds", amount: 350 },
  { name: "Dividends", amount: 240 },
  { name: "Other Income", amount: 160 },
];

const DEBIT_CATEGORIES = [
  { name: "Groceries", amount: 820 },
  { name: "Bills & Utilities", amount: 610 },
  { name: "Shopping", amount: 440 },
  { name: "Dining", amount: 260 },
  { name: "Transport", amount: 180 },
];

const RECENT = [
  { id: 1, date: "2025-09-02", desc: "Salary (ACME Inc.)", amount: 5200, type: "credit", category: "Salary" },
  { id: 2, date: "2025-09-03", desc: "Groceries — Shwapno", amount: -145, type: "debit", category: "Groceries" },
  { id: 3, date: "2025-09-03", desc: "Electric Bill", amount: -320, type: "debit", category: "Bills & Utilities" },
  { id: 4, date: "2025-09-04", desc: "Refund — Online Store", amount: 90, type: "credit", category: "Refunds" },
  { id: 5, date: "2025-09-05", desc: "Dinner — Kacchi Bhai", amount: -75, type: "debit", category: "Dining" },
  { id: 6, date: "2025-09-06", desc: "Uber", amount: -28, type: "debit", category: "Transport" },
];

//hard coded color palette
const PALETTE_CREDIT = ["#d9f2e4", "#bfe9d5", "#92d9bf", "#67c9a9", "#3fb894"];
const PALETTE_DEBIT  = ["#ffe2e2", "#ffc8c8", "#ffa8a8", "#ff8b8b", "#ff6b6b"];

// tiny colored dot for legend/list
const Dot = ({ color }) => (
  <span className="inline-block align-middle" style={{
    width: 10, height: 10, borderRadius: 9999, background: color
  }} />
);

export function AnalyticsScreen() {
  const [mode, setMode] = useState("credit"); 
  const chartData = mode === "credit" ? CREDIT_CATEGORIES : DEBIT_CATEGORIES;
  const palette   = mode === "credit" ? PALETTE_CREDIT : PALETTE_DEBIT;
  const total     = useMemo(() => chartData.reduce((s, d) => s + d.amount, 0), [chartData]);

  // category wise color kora
  const colorMap = useMemo(() => {
    const m = new Map();
    chartData.forEach((c, i) => m.set(c.name, palette[i % palette.length]));
    return m;
  }, [chartData, palette]);

  const filteredRecent = RECENT.filter(r => r.type === mode);

  return (
    <div className="space-y-6">
      {/* Page Title 
      <h1 className="text-3xl font-extrabold tracking-tight">Transaction Analytics</h1>
      */}
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
        {/* Pill Toggle */}
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

        {/* Chart + Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6 items-start">
          {/* Pie Chart (SVG, no libs) */}
          <div className="lg:col-span-3">
            <ExpenseChart data={chartData} palette={palette} />
          </div>

          {/* Legend */}
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
                        <div className="text-sm font-semibold text-gray-900">৳{d.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{pct}%</div>
                      </div>
                    </li>
                  );
                })}
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
            <p className="text-xs text-gray-500 mt-1">Pie & list update with the toggle</p>
          </div>
        </div>
        {/* Recent Transactions x
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Transactions</h3>
          <div className="max-h-72 overflow-auto pr-1">
            <ul className="divide-y divide-gray-100">
              {filteredRecent.map((tx) => {
                const isCredit = tx.type === "credit";
                const color = colorMap.get(tx.category) || (isCredit ? "#3fb894" : "#ff6b6b");
                return (
                  <li key={tx.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <Dot color={color} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{tx.desc}</p>
                        <p className="text-xs text-gray-500">{tx.date} • {tx.category}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${isCredit ? "text-emerald-600" : "text-rose-600"}`}>
                      {isCredit ? "+" : "-"}৳{Math.abs(tx.amount).toLocaleString()}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
