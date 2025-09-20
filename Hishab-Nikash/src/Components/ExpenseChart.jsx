// ExpenseChart.jsx
"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";

/**
 * Responsive SVG Pie:
 * - data: [{ name, amount }]
 * - palette: array of colors
 */
export function ExpenseChart({ data = [], palette = [] }) {
  const total = data.reduce((s, d) => s + d.amount, 0);
  const sizes = useMemo(
    () => data.map(d => (total ? d.amount / total : 0)),
    [data, total]
  );

  // Responsive container
  const box = 240;              // viewBox size
  const rOuter = 100;           // outer radius
  const rInner = 50;            // inner radius (donut)
  const cx = box / 2, cy = box / 2;

  // For tooltip
  const [hover, setHover] = useState(null);

  let startAngle = -90; // start at top (12 o'clock)
  const slices = sizes.map((p, i) => {
    const angle = p * 360;
    const endAngle = startAngle + angle;

    const largeArc = angle > 180 ? 1 : 0;

    const sx = cx + rOuter * Math.cos((Math.PI / 180) * startAngle);
    const sy = cy + rOuter * Math.sin((Math.PI / 180) * startAngle);
    const ex = cx + rOuter * Math.cos((Math.PI / 180) * endAngle);
    const ey = cy + rOuter * Math.sin((Math.PI / 180) * endAngle);

    const sx2 = cx + rInner * Math.cos((Math.PI / 180) * endAngle);
    const sy2 = cy + rInner * Math.sin((Math.PI / 180) * endAngle);
    const ex2 = cx + rInner * Math.cos((Math.PI / 180) * startAngle);
    const ey2 = cy + rInner * Math.sin((Math.PI / 180) * startAngle);

    const d = `
      M ${sx} ${sy}
      A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${ex} ${ey}
      L ${sx2} ${sy2}
      A ${rInner} ${rInner} 0 ${largeArc} 0 ${ex2} ${ey2}
      Z
    `.trim();

    const mid = startAngle + angle / 2;
    const rLabel = (rInner + rOuter) / 2;
    const lx = cx + rLabel * Math.cos((Math.PI / 180) * mid);
    const ly = cy + rLabel * Math.sin((Math.PI / 180) * mid);

    const label = p >= 0.05 ? `${Math.round(p * 100)}%` : null;

    const slice = {
      path: d,
      color: palette[i % palette.length] || "#ddd",
      label,
      lx, ly,
      name: data[i]?.name,
      amount: data[i]?.amount,
      percent: p * 100,
      idx: i,
    };

    startAngle = endAngle;
    return slice;
  });

  return (
    <div className="w-full">
      <div className="relative" style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
        <svg viewBox={`0 0 ${box} ${box}`} className="w-full h-auto">
          {/* pie slices */}
          {slices.map((s) => (
            <g key={s.idx}
               onMouseEnter={() => setHover(s.idx)}
               onMouseLeave={() => setHover(null)}
               style={{ cursor: "pointer" }}>
              <path d={s.path} fill={s.color} stroke="white" strokeWidth="1" />
              {s.label && (
                <text
                  x={s.lx}
                  y={s.ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="#111827"
                >
                  {s.label}
                </text>
              )}
            </g>
          ))}
          {/* center hole decoration */}
          <circle cx={cx} cy={cy} r={rInner - 6} fill="#ffffff" stroke="#f1f5f9" />
        </svg>

        {/* simple hover tooltip */}
        {hover != null && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 border border-gray-200 rounded-lg shadow px-3 py-2 text-xs text-gray-700"
            style={{ pointerEvents: "none" }}
          >
            <div className="font-semibold">{slices[hover].name}</div>
            <div>Amount: ৳{slices[hover].amount.toLocaleString()}</div>
            <div>{slices[hover].percent.toFixed(1)}% of total</div>
          </div>
        )}
      </div>
    </div>
  );
}
