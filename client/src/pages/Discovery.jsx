import React, { useState } from 'react';

const localCars = [
  { id: 1, make: "Tesla", model: "Model 3", price: 45000, fuel: "Electric", year: 2024, range: "350 miles", speed: "145 mph", img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400" },
  { id: 2, make: "Toyota", model: "Camry", price: 28000, fuel: "Petrol", year: 2023, range: "450 miles", speed: "135 mph", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400" },
  { id: 3, make: "BMW", model: "i4", price: 62000, fuel: "Electric", year: 2024, range: "300 miles", speed: "118 mph", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400" },
  { id: 4, make: "Nissan", model: "Altima", price: 27000, fuel: "Petrol", year: 2022, range: "400 miles", speed: "130 mph", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400" },
  { id: 6, make: "Ford", model: "Mustang", price: 55000, fuel: "Petrol", year: 2023, range: "350 miles", speed: "155 mph", img: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400" },
  { id: 8, make: "Porsche", model: "Taycan", price: 90000, fuel: "Electric", year: 2024, range: "240 miles", speed: "143 mph", img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400" },
  { id: 9, make: "Mercedes", model: "C-Class", price: 46000, fuel: "Petrol", year: 2023, range: "420 miles", speed: "132 mph", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400" },
  { id: 10, make: "Honda", model: "Civic", price: 25000, fuel: "Petrol", year: 2023, range: "410 miles", speed: "125 mph", img: "https://images.unsplash.com/photo-1599912027806-cfec9f5944b6?w=400" },
  { id: 12, make: "Lamborghini", model: "Urus", price: 230000, fuel: "Petrol", year: 2024, range: "370 miles", speed: "190 mph", img: "https://placehold.co/400x225/facc15/000?text=Urus" },
]

const Discovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(100000); // Default to max
  const [selectedCars, setSelectedCars] = useState([]);

  const filteredCars = localCars.filter(car => 
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) &&
    car.price <= priceRange
  );

  const toggleCompare = (car) => {
    if (selectedCars.find(c => c.id === car.id)) {
      setSelectedCars(selectedCars.filter(c => c.id !== car.id));
    } else if (selectedCars.length < 4) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        
        {/* Header and Controls */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <h1 style={{ marginBottom: '20px' }}>AutoMoX | Discovery Dashboard</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
            <input 
              placeholder="Search by Make..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: '1', minWidth: '250px', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
            />
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Max Price: ${priceRange.toLocaleString()}
              </label>
              <input 
                type="range" min="20000" max="100000" step="5000"
                value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Grid Container */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {filteredCars.map(car => (
            <div key={car.id} style={{ background: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <img src={car.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} alt={car.model} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0' }}>{car.make} {car.model}</h3>
                <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.2rem', margin: '10px 0' }}>${car.price.toLocaleString()}</p>
                
                {/* Stats Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', background: '#f8fafc', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
                   <div>📅 {car.year}</div>
                   <div>⛽ {car.fuel}</div>
                   <div>🏎️ {car.speed}</div>
                   <div>🔋 {car.range}</div>
                </div>

                <button 
                  onClick={() => toggleCompare(car)}
                  style={{ 
                    width: '100%', padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: selectedCars.find(c => c.id === car.id) ? '#ef4444' : '#2563eb', color: 'white', fontWeight: 'bold'
                  }}
                >
                  {selectedCars.find(c => c.id === car.id) ? 'Remove Compare' : 'Add to Compare'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Modal (Feature 2) */}
        {selectedCars.length > 0 && (
          <div style={{ marginTop: '50px', background: '#fff', padding: '30px', borderRadius: '20px', border: '2px solid #2563eb' }}>
            <h2 style={{ color: '#1e293b' }}>Technical Comparison</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                    <th style={{ padding: '15px' }}>Metrics</th>
                    {selectedCars.map(car => <th key={car.id}>{car.model}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>Market Price</td>
                    {selectedCars.map(car => <td key={car.id}>${car.price.toLocaleString()}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>Max Speed</td>
                    {selectedCars.map(car => <td key={car.id}>{car.speed}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>Range/Tank</td>
                    {selectedCars.map(car => <td key={car.id}>{car.range}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discovery;