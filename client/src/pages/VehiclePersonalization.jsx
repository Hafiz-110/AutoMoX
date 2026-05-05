import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const VehiclePersonalization = () => {
    // --- STEP 1: GRAB DATA FROM THE URL ---
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Get the image and price passed from the Discovery page
    const passedImg = queryParams.get('img');
    const passedPrice = parseInt(queryParams.get('price')) || 35000;
    const carModel = queryParams.get('model') || "Vehicle";

    // --- STEP 2: SET UP STATE ---
    const [selectedColor, setSelectedColor] = useState('original');
    const [addons, setAddons] = useState({ rims: false, interior: false });
    const [serverPrice, setServerPrice] = useState(null);

    // Feature 13: Image Mapping
    // If 'original' is selected, we use the image from the Discovery page
    const carImages = {
        original: passedImg || 'https://placehold.co/500x300?text=No+Image+Found',
        silver: 'https://placehold.co/500x300/silver/white?text=Silver+Preview',
        red: 'https://placehold.co/500x300/red/white?text=Red+Preview',
        blue: 'https://placehold.co/500x300/blue/white?text=Blue+Preview',
    };

    // Feature 14: Local Price Calculation (Fallback)
    const calculateTotal = () => {
        let total = passedPrice;
        if (addons.rims) total += 1500;
        if (addons.interior) total += 2500;
        return total;
    };

    // Handle Backend Price Sync
    const handleAddonToggle = async (type) => {
        const newAddons = { ...addons, [type]: !addons[type] };
        setAddons(newAddons);

        try {
            const response = await fetch('http://localhost:5000/api/personalize/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ basePrice: passedPrice, addons: newAddons }),
            });
            const data = await response.json();
            setServerPrice(data.totalPrice); 
        } catch (err) {
            console.log("Backend not reached, using local calc");
        }
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Personalize Your {carModel}</h2>

            {/* FIX FOR image_10efe0.png: Visual Preview */}
            <div style={{ marginBottom: '30px' }}>
                <img 
                    src={carImages[selectedColor]} 
                    alt="Car Preview" 
                    style={{ width: '100%', maxWidth: '600px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                />
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h4>Select Exterior Color:</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button style={btnStyle} onClick={() => setSelectedColor('original')}>Default</button>
                    <button style={btnStyle} onClick={() => setSelectedColor('silver')}>Silver</button>
                    <button style={btnStyle} onClick={() => setSelectedColor('red')}>Red</button>
                    <button style={btnStyle} onClick={() => setSelectedColor('blue')}>Blue</button>
                </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', display: 'inline-block', textAlign: 'left' }}>
                <h4>Optional Add-ons:</h4>
                <label style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={addons.rims} onChange={() => handleAddonToggle('rims')} />
                    {" "} Premium Rims (+$1,500)
                </label>
                <label style={{ display: 'block', cursor: 'pointer' }}>
                    <input type="checkbox" checked={addons.interior} onChange={() => handleAddonToggle('interior')} />
                    {" "} Interior Upgrade (+$2,500)
                </label>
            </div>

            <h3 style={{ marginTop: '30px', color: '#2563eb' }}>
                Total Price: ${ (serverPrice || calculateTotal()).toLocaleString() }
            </h3>
        </div>
    );
};

// Simple reusable style for buttons
const btnStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    background: 'white',
    fontWeight: 'bold'
};

export default VehiclePersonalization;