/*
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";

function SalaryPage() {
  const [salary, setSalary] = useState("");
  const [isSalaryAdded, setIsSalaryAdded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkExistingSalary();
  }, []);

  async function checkExistingSalary() {
    const currentMonth = new Date().toISOString().slice(0, 7);

    const { data, error } = await supabase
      .from("salary")
      .select("id")
      .eq("month", currentMonth)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking salary:", error);
    } else if (data) {
      setIsSalaryAdded(true);
    }
  }

  async function addSalary() {
    if (!salary) {
      setError("Please enter a salary amount.");
      return;
    }

    if (isSalaryAdded) {
      setError("You have already added salary for this month.");
      return;
    }

    const salaryAmount = parseFloat(salary);
    const spending = (salaryAmount * 0.7).toFixed(2);
    const savings = (salaryAmount * 0.3).toFixed(2);
    const currentMonth = new Date().toISOString().slice(0, 7);

    const { error } = await supabase
      .from("salary")
      .insert([{ amount: salaryAmount, spending, savings, month: currentMonth }]);

    if (error) {
      console.error("Error adding salary:", error);
      setError("Error adding salary. Please try again.");
    } else {
      setSuccess(`Salary added! ₹${savings} (30%) has been automatically saved.`);
      setIsSalaryAdded(true);
      setTimeout(() => navigate("/transactions"), 2000);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Add Monthly Salary
      </h2>
      <p className="text-gray-600 text-center mb-2">
        You can only add salary once per month.
      </p>
      <p className="text-blue-500 text-center font-medium">
        30% of your salary will be automatically sent to savings.
      </p>
      {isSalaryAdded && (
        <p className="text-red-500 font-medium text-center mt-2">
          Salary for this month has already been added.
        </p>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Salary</label>
          <input
            type="number"
            placeholder="Enter Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
            disabled={isSalaryAdded}
          />
        </div>
        {!isSalaryAdded && (
          <button
            onClick={addSalary}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        )}
      </div>
      {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  )
}

export default SalaryPage;*/
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";
import "./SalaryPage.css";

function SalaryPage() {
  const [salary, setSalary] = useState("");
  const [isSalaryAdded, setIsSalaryAdded] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    checkExistingSalary();
  }, []);

  async function checkExistingSalary() {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data, error } = await supabase
      .from("salary")
      .select("id")
      .eq("month", currentMonth)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking salary:", error);
    } else if (data) {
      setIsSalaryAdded(true);
    }
  }

  function showNotification(message, type) {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  }

  async function addSalary() {
    if (!salary) {
      showNotification("Please enter a salary amount.", "error");
      return;
    }

    if (isSalaryAdded) {
      showNotification("You have already added salary for this month.", "error");
      return;
    }

    const salaryAmount = parseFloat(salary);
    const spending = (salaryAmount * 0.7).toFixed(2);
    const savings = (salaryAmount * 0.3).toFixed(2);
    const currentMonth = new Date().toISOString().slice(0, 7);

    const { error } = await supabase
      .from("salary")
      .insert([{ amount: salaryAmount, spending, savings, month: currentMonth }]);

    if (error) {
      console.error("Error adding salary:", error);
      showNotification("Error adding salary. Please try again.", "error");
    } else {
      showNotification(`Salary added! ₹${savings} (30%) saved automatically.`, "success");
      setIsSalaryAdded(true);
      setTimeout(() => navigate("/transactions"), 2000);
    }
  }

  return (
    <div className="container flex flex-col justify-center items-center min-h-screen">
      <div className="salaryCard">
        <h2 className="monthTitle">Enter Your Salary</h2>
        <p className="text-gray-600 text-center">
          You can only add your salary once per month.
        </p>
        <p className="text-green-500 text-center font-medium mb-4">
          30% of your salary will be automatically saved.
        </p>

        {isSalaryAdded && (
          <div className="mb-4 p-3 bg-gray-100 border-l-4 border-gray-500 text-gray-700 text-center rounded-md">
            Salary for this month has already been added.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium text-lg mb-2">
              Salary Amount
            </label>
            <input
              type="number"
              placeholder="Enter your salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="w-full p-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              disabled={isSalaryAdded}
            />
          </div>

          {!isSalaryAdded && (
            <button
              onClick={addSalary}
              className="w-full bg-green-600 text-white py-3 text-lg font-medium rounded-lg hover:bg-green-700 transition duration-200 transform active:scale-95"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Floating Notification */}
      {notification.message && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-lg text-white rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success" ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default SalaryPage;

