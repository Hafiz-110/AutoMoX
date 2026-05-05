import React from 'react';
import Navbar from './Navbar'; // This must point to Navbar.jsx correctly
import Discovery from './pages/Discovery';
import Login from './pages/Login';
import TradeIn from './pages/TradeIn';

function App() {
  const path = window.location.pathname;

  return (
    <div className="App">
      {/* 1. This adds the bar to the VERY top of every page */}
      <Navbar /> 

      <div className="content-area">
        {/* 2. Your routing logic stays here */}
        {path === '/login' ? (
          <Login />
        ) : path === '/trade-in' ? (
          <TradeIn />
        ) : (
          <Discovery />
        )}
      </div>
    </div>
  );
}

export default App;