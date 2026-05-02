import React, { useState } from "react";
import AddExpenseForm from "./components/expense/AddExpenseForm";
import TransactionList from "./components/expense/TransactionList";
import SpendingChart from "./components/charts/SpendingChart";
import DashboardHeader from "./components/Stats/DashboardHeader";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LayoutDashboard, Download } from "lucide-react";

const App = () => {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [budget, setBudget] = useLocalStorage("budget", 5000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
    toast.success("Expense added!", {
      icon: '💰',
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid rgba(16, 185, 129, 0.2)",
      },
    });
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    toast.error("Expense removed", {
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid rgba(244, 63, 94, 0.2)",
      },
    });
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ budget, expenses }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "budget_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("Data exported!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="app-container"
    >
      <Toaster position="bottom-center" />
      
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "2.5rem",
        padding: "0.5rem 0" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ 
            background: "linear-gradient(135deg, var(--primary), var(--accent))", 
            padding: "0.6rem", 
            borderRadius: "1rem",
            boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)"
          }}>
            <LayoutDashboard size={26} color="#000" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", margin: 0, fontWeight: "800", letterSpacing: "-0.03em" }}>
              Expense<span style={{ color: "var(--primary)" }}>Tracker</span>
            </h1>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pro Version</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={exportData} className="button secondary" style={{ padding: "0.6rem 1rem" }}>
            <Download size={18} />
            <span className="hide-mobile">Export</span>
          </button>
        </div>
      </header>

      <DashboardHeader 
        expenses={expenses} 
        budget={budget} 
        onEditBudget={() => setIsEditingBudget(true)} 
      />

      {isEditingBudget && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card" 
          style={{ marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Set Monthly Budget</p>
            <input 
              type="number" 
              className="input" 
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))}
              autoFocus
            />
          </div>
          <button className="button" onClick={() => setIsEditingBudget(false)} style={{ marginTop: "1.5rem" }}>
            Save Budget
          </button>
        </motion.div>
      )}

      <div className="dashboard-grid">
        <div className="main-content">
          <AddExpenseForm onAdd={handleAddExpense} />
          <SpendingChart expenses={expenses} />
        </div>
        <div className="side-content">
          <TransactionList expense={expenses} onDelete={handleDelete} />
        </div>
      </div>

      <footer style={{ marginTop: "4rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem", paddingBottom: "2rem" }}>
        <p>Built with ❤️ for the top 1%.</p>
      </footer>
    </motion.div>
  );
};


export default App;