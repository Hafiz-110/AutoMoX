import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discovery from './pages/Discovery';
import VehiclePersonalization from './pages/VehiclePersonalization';

function App() {
  return (
    <Router>
      <Routes>
        {/* This is your main car list page */}
        <Route path="/" element={<Discovery />} />
        
        {/* This is your personalization page */}
        <Route path="/personalize" element={<VehiclePersonalization />} />
      </Routes>
    </Router>
  );
}

export default App;