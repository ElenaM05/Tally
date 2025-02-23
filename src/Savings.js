/*
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

function Savings() {
  const [savings, setSavings] = useState(0);
  const [spending, setSpending] = useState(0);
  const [expenditure, setExpenditure] = useState(0);
  const [month, setMonth] = useState("");

  useEffect(() => {
    fetchSavings();
    fetchAndUpdateExpenditure();
  }, []);

  async function fetchSavings() {
    const { data, error } = await supabase
      .from("salary")
      .select("savings, spending, month")
      .order("month", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching savings:", error);
    } else if (data.length > 0) {
      setSavings(data[0].savings);
      setSpending(data[0].spending);
      setMonth(data[0].month);
    }
  }

  async function fetchAndUpdateExpenditure() {
    try {
      const { data: transactions, error } = await supabase
        .from("transactions")
        .select("amount, created_at");

      if (error) throw error;

      const currentMonth = new Date().toISOString().slice(0, 7);

      // Calculate total expenditure for the month
      const totalExpenditure = transactions
        .filter((t) => t.created_at.startsWith(currentMonth))
        .reduce((sum, t) => sum + t.amount, 0);

      setExpenditure(totalExpenditure);

      // Update expenditure in salary table
      const { error: updateError } = await supabase
        .from("salary")
        .update({ expenditure: totalExpenditure })
        .eq("month", currentMonth);

      if (updateError) throw updateError;

      console.log("Expenditure updated:", totalExpenditure);
    } catch (err) {
      console.error("Error updating expenditure:", err);
    }
  }

  async function moveSpendingToSavings() {
    if (spending <= 0) {
      alert("No spending budget left to transfer.");
      return;
    }

    const newSavings = savings + spending; // Move spending to savings
    const newSpending = 0; // Reset spending to zero

    const { error } = await supabase
      .from("salary")
      .update({ savings: newSavings, spending: newSpending })
      .eq("month", month);

    if (error) {
      console.error("Error moving spending to savings:", error);
    } else {
      setSavings(newSavings);
      setSpending(newSpending);
      console.log("Spending moved to savings:", newSavings);
    }
  }

  return (
    <div>
      <h1>Savings Overview</h1>
      <p>Current Month: {month}</p>
      <p>Total Savings: Rs. {savings}</p>
      <p>Remaining Spending Budget: Rs. {spending}</p>
      <p>Total Expenditure: Rs. {expenditure}</p>
      <button onClick={moveSpendingToSavings}>Move Spending to Savings</button>
    </div>
  );
}

export default Savings;
*/
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./Savings.css"; // Import the styles

function Savings() {
  const [savings, setSavings] = useState(0);
  const [spending, setSpending] = useState(0);
  const [expenditure, setExpenditure] = useState(0);
  const [month, setMonth] = useState("");

  useEffect(() => {
    fetchSavings();
    fetchAndUpdateExpenditure();
  }, []);

  async function fetchSavings() {
    const { data, error } = await supabase
      .from("salary")
      .select("savings, spending, month")
      .order("month", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching savings:", error);
    } else if (data.length > 0) {
      setSavings(data[0].savings);
      setSpending(data[0].spending);
      setMonth(data[0].month);
    }
  }

  async function fetchAndUpdateExpenditure() {
    try {
      const { data: transactions, error } = await supabase
        .from("transactions")
        .select("amount, created_at");

      if (error) throw error;

      const currentMonth = new Date().toISOString().slice(0, 7);

      // Calculate total expenditure for the month
      const totalExpenditure = transactions
        .filter((t) => t.created_at.startsWith(currentMonth))
        .reduce((sum, t) => sum + t.amount, 0);

      setExpenditure(totalExpenditure);

      // Update expenditure in salary table
      const { error: updateError } = await supabase
        .from("salary")
        .update({ expenditure: totalExpenditure })
        .eq("month", currentMonth);

      if (updateError) throw updateError;

      console.log("Expenditure updated:", totalExpenditure);
    } catch (err) {
      console.error("Error updating expenditure:", err);
    }
  }

  async function moveSpendingToSavings() {
    if (spending <= 0) {
      alert("No spending budget left to transfer.");
      return;
    }

    const newSavings = savings + spending; // Move spending to savings
    const newSpending = 0; // Reset spending to zero

    const { error } = await supabase
      .from("salary")
      .update({ savings: newSavings, spending: newSpending })
      .eq("month", month);

    if (error) {
      console.error("Error moving spending to savings:", error);
    } else {
      setSavings(newSavings);
      setSpending(newSpending);
      console.log("Spending moved to savings:", newSavings);
    }
  }

  return (
    <div className="savings-container">
      <h1>Savings Overview</h1>
      <div className="savings-details">
        <p><strong>Current Month:</strong> {month}</p>
        <p><strong>Total Savings:</strong> ₹{savings}</p>
        <p><strong>Remaining Spending Budget:</strong> ₹{spending}</p>
        <p><strong>Total Expenditure:</strong> ₹{expenditure}</p>
      </div>
      <button onClick={moveSpendingToSavings} className="savings-button">
        Move Spending to Savings
      </button>
    </div>
  );
}

export default Savings;
