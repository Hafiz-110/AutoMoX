import React from 'react';
import Discovery from './pages/Discovery';
import Login from './pages/Login';

function App() {
  // Check the current URL path
  const path = window.location.pathname;

  return (
    <div className="App">
      {/* Basic Routing Logic */}
      {path === '/login' ? <Login /> : <Discovery />}
    </div>
  );
}

export default App;