import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Discovery from './pages/Discovery';
import LoanCalculator from './components/LoanCalculator';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/"                element={<Discovery />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;