import React from 'react';
import Discovery from './pages/Discovery'; // Make sure the file name is Discovery.jsx
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0, letterSpacing: '2px' }}>AutoMoX | Premium Car Discovery</h1>
      </header>
      
      <main>
        {/* This line activates your features */}
        <Discovery />
      </main>
    </div>
  );
}

export default App;