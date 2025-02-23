import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styles from "./PieCharts.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF6384"]; 
// Keeps the original color scheme

const PieCharts = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Fetch Transactions Data (Grouped by Category)
  useEffect(() => {
    const fetchTransactionData = async () => {
      const { data, error } = await supabase.from("transactions").select("category");

      if (error) {
        console.error("Error fetching transactions:", error);
      } else {
        const groupedData = data.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(groupedData).map((key) => ({
          label: key,
          value: groupedData[key],
        }));

        setTransactionData(formattedData);
      }
    };

    fetchTransactionData();
  }, []);

  // Fetch Salary Data for Savings vs Expenditure
  useEffect(() => {
    const fetchSalaryData = async () => {
      const { data, error } = await supabase
        .from("salary")
        .select("savings, expenditure, month")
        .order("month", { ascending: false });

      if (error) {
        console.error("Error fetching salary:", error);
      } else {
        const formattedData = data
          .filter((item) => item.savings > 0 || item.expenditure > 0) // Ensure we only show meaningful data
          .map((item) => ({
            month: item.month,
            data: [
              { label: "Savings", value: item.savings },
              { label: "Expenditure", value: item.expenditure },
            ],
          }));

        setSalaryData(formattedData);
      }
    };

    fetchSalaryData();
  }, []);

  return (
    <div className={styles.container}>
      {/* Transactions by Category */}
      <div className={styles.chartSection}>
        <h2 className={styles.chartTitle}>Transactions by Category</h2>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={transactionData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {transactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Savings vs Expenditure Breakdown by Month */}
      <div className={styles.chartSection}>
        <h2 className={styles.chartTitle}>Savings vs Expenditure by Month</h2>
        <div className={styles.salaryGrid}>
          {salaryData.map((monthData, index) => (
            <div key={index} className={styles.salaryCard}>
              <h3 className={styles.monthTitle}>{monthData.month}</h3>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={monthData.data}
                      dataKey="value"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      label={({ name, value }) => `${name}: Rs. ${value}`}
                    >
                      {monthData.data.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={COLORS[idx % COLORS.length]}
                          style={{
                            filter:
                              hoverIndex === idx
                                ? "drop-shadow(0px 0px 10px rgba(0,0,0,0.4))"
                                : "none",
                            transition: "all 0.3s ease-in-out",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() => setHoverIndex(idx)}
                          onMouseLeave={() => setHoverIndex(null)}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
