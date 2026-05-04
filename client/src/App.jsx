import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Discovery from './pages/Discovery';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main car discovery page */}
        <Route
          path="/"
          element={
            <div className="App">
              <header style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
                <h1 style={{ margin: 0, letterSpacing: '2px' }}>AutoMoX | Premium Car Discovery</h1>
              </header>
              <main>
                <Discovery />
              </main>
            </div>
          }
        />

        {/* Admin dashboard — visit http://localhost:5173/admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
