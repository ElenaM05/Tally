/*import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [spending, setSpending] = useState(0);
  const [expenditure, setExpenditure] = useState(0);
  const [salaryId, setSalaryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Fetch salary details for the current month
  const fetchCurrentMonthSalary = useCallback(async () => {
    let { data, error } = await supabase
      .from("salary")
      .select("id, spending, expenditure, savings")
      .eq("month", currentMonth)
      .order("id", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching salary:", error);
    } else if (data.length > 0) {
      setSalaryId(data[0].id);
      setSpending(data[0].spending);
      setExpenditure(data[0].expenditure || 0);
      await rolloverToSavings(data[0]); // Ensure savings roll over
    }

    setLoading(false);
  }, [currentMonth]);

  // Move leftover spending into savings at the end of the month
  const rolloverToSavings = async (latestSalary) => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    if (today.getDate() === lastDayOfMonth && latestSalary.spending > 0) {
      const newSavings = parseFloat(latestSalary.savings) + parseFloat(latestSalary.spending);

      let { error } = await supabase
        .from("salary")
        .update({ spending: 0, savings: newSavings })
        .eq("id", latestSalary.id);

      if (error) console.error("Error updating savings:", error);
      else setSpending(0);
    }
  };

  // Fetch today's transactions
  const fetchTransactions = useCallback(async () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    let { data, error } = await supabase
      .from("transactions")
      .select("*")
      .gte("created_at", today + "T00:00:00.000Z")
      .lte("created_at", today + "T23:59:59.999Z");

    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      setTransactions(data);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchCurrentMonthSalary();
  }, [fetchTransactions, fetchCurrentMonthSalary]);

  // Add a new transaction
  async function addTransaction() {
    if (!amount || !category) return;
    const transactionAmount = parseFloat(amount);

    if (transactionAmount > spending) {
      alert("Not enough funds in spending budget.");
      return;
    }

    const newSpending = spending - transactionAmount;
    const newExpenditure = expenditure + transactionAmount;

    const { data, error } = await supabase
      .from("transactions")
      .insert([{ amount: transactionAmount, category, created_at: new Date().toISOString() }])
      .select("*");

    if (error) {
      console.error("Error adding transaction:", error);
    } else {
      setTransactions((prev) => [...prev, data[0]]);
      setSpending(newSpending);
      setExpenditure(newExpenditure);

      if (salaryId) {
        await supabase
          .from("salary")
          .update({ spending: newSpending, expenditure: newExpenditure })
          .eq("id", salaryId);
      }

      setAmount("");
      setCategory("");
    }
  }

  return (
    <div>
      <h1>Transactions</h1>
      {loading ? <p>Loading...</p> : <h3>Spending Budget: Rs. {spending}</h3>}
      <h3>Total Expenditure: Rs. {expenditure}</h3>

      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button onClick={addTransaction}>Add Transaction</button>

      <h2>Today's Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.category}: Rs. {t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;*/
import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import "./Transactions.css"; // Import the styles

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [spending, setSpending] = useState(0);
  const [expenditure, setExpenditure] = useState(0);
  const [salaryId, setSalaryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Fetch salary details for the current month
  const fetchCurrentMonthSalary = useCallback(async () => {
    let { data, error } = await supabase
      .from("salary")
      .select("id, spending, expenditure, savings")
      .eq("month", currentMonth)
      .order("id", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching salary:", error);
    } else if (data.length > 0) {
      setSalaryId(data[0].id);
      setSpending(data[0].spending);
      setExpenditure(data[0].expenditure || 0);
      await rolloverToSavings(data[0]); // Ensure savings roll over
    }

    setLoading(false);
  }, [currentMonth]);

  // Move leftover spending into savings at the end of the month
  const rolloverToSavings = async (latestSalary) => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    if (today.getDate() === lastDayOfMonth && latestSalary.spending > 0) {
      const newSavings = parseFloat(latestSalary.savings) + parseFloat(latestSalary.spending);

      let { error } = await supabase
        .from("salary")
        .update({ spending: 0, savings: newSavings })
        .eq("id", latestSalary.id);

      if (error) console.error("Error updating savings:", error);
      else setSpending(0);
    }
  };

  // Fetch today's transactions
  const fetchTransactions = useCallback(async () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    let { data, error } = await supabase
      .from("transactions")
      .select("*")
      .gte("created_at", today + "T00:00:00.000Z")
      .lte("created_at", today + "T23:59:59.999Z");

    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      setTransactions(data);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchCurrentMonthSalary();
  }, [fetchTransactions, fetchCurrentMonthSalary]);

  // Add a new transaction
  async function addTransaction() {
    if (!amount || !category) return;
    const transactionAmount = parseFloat(amount);

    if (transactionAmount > spending) {
      alert("Not enough funds in spending budget.");
      return;
    }

    const newSpending = spending - transactionAmount;
    const newExpenditure = expenditure + transactionAmount;

    const { data, error } = await supabase
      .from("transactions")
      .insert([{ amount: transactionAmount, category, created_at: new Date().toISOString() }])
      .select("*");

    if (error) {
      console.error("Error adding transaction:", error);
    } else {
      setTransactions((prev) => [...prev, data[0]]);
      setSpending(newSpending);
      setExpenditure(newExpenditure);

      if (salaryId) {
        await supabase
          .from("salary")
          .update({ spending: newSpending, expenditure: newExpenditure })
          .eq("id", salaryId);
      }

      setAmount("");
      setCategory("");
    }
  }

  return (
    <div className="transactions-container">
      <h1>Transactions</h1>
      {loading ? <p>Loading...</p> : <h3>Spending Budget: ₹{spending}</h3>}
      <h3>Total Expenditure: ₹{expenditure}</h3>

      {/* Transaction Input */}
      <div className="transaction-input">
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <h2>Today's Transactions</h2>

      {/* Transactions Table */}
      {transactions.length > 0 ? (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{new Date(t.created_at).toLocaleDateString()}</td>
                <td>{t.category}</td>
                <td>₹{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-transactions">No transactions recorded today.</p>
      )}
    </div>
  );
}

export default Transactions;

