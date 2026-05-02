import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  Food: "#10b981",      // Emerald
  Shopping: "#22d3ee",  // Cyan
  Health: "#f43f5e",    // Rose
  Entertainment: "#f59e0b", // Amber
  Other: "#a1a1aa",     // Zinc
};

const SpendingChart = ({ expenses }) => {
  const data = expenses.reduce((acc, curr) => {
    const category = curr.category || "Other";
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: category, value: curr.amount });
    }
    return acc;
  }, []);

  return (
    <div className="glass-card" style={{ height: "420px", marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "800" }}>Spending Analytics</h3>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>BY CATEGORY</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: 600 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: 600 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            contentStyle={{ 
              backgroundColor: "var(--surface-strong)", 
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              color: "#fff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
            }}
            itemStyle={{ color: "#fff", fontWeight: 700 }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Other} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


export default SpendingChart;
