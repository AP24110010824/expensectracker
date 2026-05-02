import React, { useState } from 'react';
import { PlusCircle, DollarSign, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

const AddExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };
    onAdd(newExpense);
    setTitle("");
    setAmount("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card"
    >
      <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <PlusCircle size={20} className="text-primary" />
        Add Transaction
      </h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div style={{ position: "relative" }}>
          <input 
            className="input"
            placeholder="What did you buy?" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ position: "relative" }}>
            <input 
              type="number"
              className="input"
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
            <DollarSign size={16} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          </div>
          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>
        <input 
          type="date" 
          className="input"
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <button className="button" type="submit">
          Add Expense
        </button>
      </form>
    </motion.div>
  );
};

export default AddExpenseForm;

