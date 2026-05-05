import React, { useState } from 'react';

const TradeIn = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        mileage: '',
        condition: 'Good'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Point to the 'calculate' route which isn't protected
            // 2. Ensure the port (5000) matches your backend
            const response = await fetch('http://localhost:5000/api/trade-in/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Valuation Received: $${data.estimatedValue}`);
            } else {
                alert(`Error: ${data.message || 'Check console'}`);
            }
        } catch (err) {
            console.error("Connection failed", err);
            alert("Cannot reach the server. Is it running on port 5000?");
        }
    };

    // Styling to match your Dashboard's clean look
    const containerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '6px',
        border: '1px solid #ddd',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Trade-In Valuation</h2>
            <p style={{ textAlign: 'center', color: '#666' }}>Enter your vehicle details to get an instant estimate.</p>

            <form onSubmit={handleSubmit}>
                <label>Vehicle Make</label>
                <input type="text" placeholder="e.g. Toyota" style={inputStyle}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })} required />

                <label>Model</label>
                <input type="text" placeholder="e.g. Camry" style={inputStyle}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })} required />

                <label>Year</label>
                <input type="number" placeholder="e.g. 2022" style={inputStyle}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })} required />

                <label>Mileage</label>
                <input type="number" placeholder="Current Odometer" style={inputStyle}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })} required />

                <button type="submit" style={buttonStyle}>Get Estimate</button>
            </form>
        </div>
    );
};

export default TradeIn;