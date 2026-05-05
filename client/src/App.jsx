import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discovery from './pages/Discovery';
import VehiclePersonalization from './pages/VehiclePersonalization';
import AdminDashboard from './pages/AdminDashboard';
import TradeIn from './pages/TradeIn';
import LoanCalculator from './components/LoanCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ margin: 0, letterSpacing: '2px' }}>AutoMoX | Premium Car Discovery</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Discovery />} />
            <Route path="/personalize" element={<VehiclePersonalization />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/trade-in" element={<TradeIn />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;