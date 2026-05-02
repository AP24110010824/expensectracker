import React from 'react';
import TransactionItem from './TransactionItem';
import { AnimatePresence, motion } from "framer-motion";
import { ListFilter } from "lucide-react";

const TransactionList = ({ expense, onDelete }) => {
  return (
    <div className="glass-card" style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ListFilter size={20} className="text-primary" />
          Recent Transactions
        </h3>
        <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          {expense.length} Total
        </span>
      </div>

      <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "0.5rem" }}>
        {expense.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
            <p>No transactions found.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {expense.map((exp) => (
              <TransactionItem key={exp.id} exp={exp} onDelete={onDelete} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TransactionList;

