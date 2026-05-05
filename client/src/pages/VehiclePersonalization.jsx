import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 1. Added useNavigate

const VehiclePersonalization = () => {
    const navigate = useNavigate(); // 2. Initialize navigate
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const passedImg = queryParams.get('img');
    const passedPrice = parseInt(queryParams.get('price')) || 35000;
    const carModel = queryParams.get('model') || "Vehicle";

    const [selectedColor, setSelectedColor] = useState('original');
    const [addons, setAddons] = useState({ rims: false, interior: false });
    const [serverPrice, setServerPrice] = useState(null);

    const carImages = {
        original: passedImg || 'https://placehold.co/500x300?text=No+Image+Found',
        silver: 'https://placehold.co/500x300/silver/white?text=Silver+Preview',
        red: 'https://placehold.co/500x300/red/white?text=Red+Preview',
        blue: 'https://placehold.co/500x300/blue/white?text=Blue+Preview',
    };

    const calculateTotal = () => {
        let total = passedPrice;
        if (addons.rims) total += 1500;
        if (addons.interior) total += 2500;
        return total;
    };

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
            
            {/* --- NEW HEADER WITH ADMIN PORTAL LINK --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto 40px auto' }}>
                <button 
                    onClick={() => navigate('/')} 
                    style={{ background: '#f1f5f9', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}
                >
                    ⬅️ Back to Discovery
                </button>
                
                <button 
                    onClick={() => navigate('/admin')}
                    style={{ background: '#1e293b', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🛡️ Dealer Admin Portal
                </button>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Personalize Your {carModel}</h2>

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

const btnStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    background: 'white',
    fontWeight: 'bold'
};

export default VehiclePersonalization;