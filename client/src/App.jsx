import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discovery from './pages/Discovery';
import VehiclePersonalization from './pages/VehiclePersonalization';
import AdminDashboard from './pages/AdminDashboard';
import TradeIn from './pages/TradeIn'; // 1. ADD THIS IMPORT
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Persistent Header across all pages */}
        <header style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ margin: 0, letterSpacing: '2px' }}>AutoMoX | Premium Car Discovery</h1>
        </header>

        <main>
          <Routes>
            {/* Main car discovery page (FR-12) */}
            <Route path="/" element={<Discovery />} />

            {/* Personalization page (FR-13 & FR-14) */}
            <Route path="/personalize" element={<VehiclePersonalization />} />

            {/* Admin dashboard (FR-17 & FR-18) */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* 2. ADD THE TRADE-IN ROUTE HERE (FR-06) */}
            <Route path="/trade-in" element={<TradeIn />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;