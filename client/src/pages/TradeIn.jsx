import React, { useState } from 'react';

const TradeIn = () => {
  const [carData, setCarData] = useState({ make: '', model: '', year: '', condition: 'Good' });
  const [valuation, setValuation] = useState(null);

  const calculateValue = (e) => {
    e.preventDefault();
    // Logic for Feature 6: Automated valuation based on year/condition
    const baseValue = 20000; 
    const yearFactor = (carData.year - 2010) * 1000;
    const conditionFactor = carData.condition === 'Excellent' ? 1.2 : 1.0;
    
    const estimate = (baseValue + yearFactor) * conditionFactor;
    setValuation(estimate > 0 ? estimate : 5000);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto', fontFamily: 'Segoe UI' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>🚗 Trade-In Valuation</h2>
        <p style={{ textAlign: 'center', color: '#64748b' }}>Enter your vehicle details to get an instant market estimate.</p>
        
        <form onSubmit={calculateValue} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input placeholder="Make (e.g. Honda)" required onChange={e => setCarData({...carData, make: e.target.value})} style={inputStyle} />
          <input placeholder="Model (e.g. Civic)" required onChange={e => setCarData({...carData, model: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Year" required onChange={e => setCarData({...carData, year: e.target.value})} style={inputStyle} />
          
          <select onChange={e => setCarData({...carData, condition: e.target.value})} style={inputStyle}>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>

          <button type="submit" style={{ padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Get Valuation
          </button>
        </form>

        {valuation && (
          <div style={{ marginTop: '30px', padding: '20px', background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: '10px', textAlign: 'center' }}>
            <h3 style={{ color: '#166534', margin: 0 }}>Estimated Value</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#15803d' }}>${valuation.toLocaleString()}</p>
            <p style={{ fontSize: '0.8rem' }}>This value can be applied toward your next AutoMoX purchase!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' };

export default TradeIn;