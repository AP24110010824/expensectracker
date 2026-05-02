import React from "react";
import { Wallet, TrendingDown, PieChart, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ title, amount, icon: Icon, color, extra }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card"
    style={{ position: "relative", overflow: "hidden" }}
  >
    <div style={{ 
      position: "absolute", 
      top: "-10%", 
      right: "-10%", 
      width: "100px", 
      height: "100px", 
      background: `rgba(${color}, 0.05)`, 
      borderRadius: "50%",
      filter: "blur(20px)"
    }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
      <div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{title}</p>
        <h2 style={{ fontSize: "1.75rem", fontWeight: "800" }}>${amount.toLocaleString()}</h2>
        {extra}
      </div>
      <div style={{ 
        padding: "0.8rem", 
        borderRadius: "1rem", 
        background: `rgba(${color}, 0.1)`, 
        color: `rgb(${color})`,
        border: `1px solid rgba(${color}, 0.2)`
      }}>
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

const DashboardHeader = ({ expenses, budget, onEditBudget }) => {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = budget - total;
  const percentage = Math.min((total / budget) * 100, 100);
  
  let statusColor = "16, 185, 129"; // Success
  if (percentage > 90) statusColor = "244, 63, 94"; // Danger
  else if (percentage > 70) statusColor = "245, 158, 11"; // Warning

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div className="stats-grid">
        <StatCard 
          title="Monthly Budget" 
          amount={budget} 
          icon={Wallet} 
          color="16, 185, 129"
          extra={
            <button 
              onClick={onEditBudget}
              style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", marginTop: "0.5rem", fontWeight: "600" }}
            >
              <Edit3 size={12} /> Edit Budget
            </button>
          }
        />
        <StatCard 
          title="Total Spent" 
          amount={total} 
          icon={TrendingDown} 
          color="244, 63, 94" 
          extra={<p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>{expenses.length} Transactions</p>}
        />
        <StatCard 
          title="Balance" 
          amount={remaining} 
          icon={PieChart} 
          color={remaining >= 0 ? "34, 211, 238" : "244, 63, 94"} 
          extra={<p style={{ fontSize: "0.75rem", color: remaining >= 0 ? "var(--primary)" : "var(--danger)", marginTop: "0.5rem", fontWeight: "600" }}>{remaining >= 0 ? "On track" : "Over budget!"}</p>}
        />
      </div>

      <div className="glass-card" style={{ marginTop: "1.5rem", padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "var(--text-muted)" }}>Budget Utilization</span>
          <span style={{ fontSize: "0.875rem", fontWeight: "800", color: percentage > 90 ? "var(--danger)" : "var(--primary)" }}>{percentage.toFixed(1)}%</span>
        </div>
        <div className="progress-container">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`progress-fill ${percentage > 90 ? 'danger' : percentage > 70 ? 'warning' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

