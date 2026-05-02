import React from 'react';
import { Trash2, ShoppingBag, Coffee, Heart, Film, Package } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORY_ICONS = {
  Food: Coffee,
  Shopping: ShoppingBag,
  Health: Heart,
  Entertainment: Film,
  Other: Package,
};

const TransactionItem = ({ exp, onDelete }) => {
  const Icon = CATEGORY_ICONS[exp.category] || CATEGORY_ICONS.Other;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card"
      style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "1rem",
        marginBottom: "0.75rem",
        textAlign: "left"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ 
          padding: "0.5rem", 
          borderRadius: "0.5rem", 
          background: "rgba(99, 102, 241, 0.1)",
          color: "var(--primary)"
        }}>
          <Icon size={20} />
        </div>
        <div>
          <h4 style={{ fontSize: "1rem", color: "#fff" }}>{exp.title}</h4>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem", alignItems: "center" }}>
            <span className={`badge badge-${exp.category?.toLowerCase()}`}>{exp.category}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{exp.date}</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontWeight: "700", color: "var(--danger)", fontSize: "1.125rem" }}>
          -${exp.amount.toLocaleString()}
        </span>
        <button 
          onClick={() => onDelete(exp.id)}
          className="button secondary" 
          style={{ padding: "0.5rem", borderRadius: "0.5rem", color: "var(--danger)", background: "transparent" }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default TransactionItem;

