import React from "react";
import { useCurrency } from "./CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const handleChange = (e) => setCurrency(e.target.value);

  return (
    <select
      value={currency}
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
      <option value="TK">TK (৳)</option>
      
    </select>
  );
};

export default CurrencySelector;
