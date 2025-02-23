
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SalaryPage from "./SalaryPage";
import Transactions from "./Transactions";
import Savings from "./Savings";
import Game from "./Game"; 
import PieCharts from "./PieCharts"; // Import PieCharts
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/salary" className="nav-link">Add Salary</Link>
          <Link to="/transactions" className="nav-link">Log Transactions</Link>
          <Link to="/savings" className="nav-link">Savings</Link>
          <Link to="/game" className="nav-link">Game Section</Link>
          <Link to="/charts" className="nav-link">Charts</Link> 
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/game" element={<Game />} />
          <Route path="/charts" element={<PieCharts />} /> 
        </Routes>
      </div>
    </Router>
  );
}

// Home Page Component
function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to <span>Tally</span></h1>
      <p className="home-subtitle">Your personal budget planner.</p>
      <div className="button-group">
      <Link to="/salary"><button className="home-button">Go to Salary</button></Link>
        <Link to="/transactions"><button className="home-button">Go to Transactions</button></Link>        
        <Link to="/game"><button className="home-button">Play Game</button></Link>
        <Link to="/charts"><button className="home-button">View Charts</button></Link> 
      </div>
    </div>
  );
}

export default App;
