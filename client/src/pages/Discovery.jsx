import ReviewForm from '../components/Reviews/ReviewForm';
import WishlistButton from '../components/Wishlist/WishlistButton';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
];

const Discovery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(230000);
  const [selectedCars, setSelectedCars] = useState([]);
  const [activeCarId, setActiveCarId] = useState(null);

  const filteredCars = localCars.filter(car =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) &&
    car.price <= priceRange
  );

  const handleViewTracking = async (carId) => {
    try {
      await axios.patch(`http://localhost:5000/api/cars/${carId}/view`);
      console.log("View tracked for:", carId);
    } catch (err) {
      console.error("Tracking failed:", err);
    }
  };

  const handleWatch = async (car) => {
    try {
      await axios.post('http://localhost:5000/api/add-wishlist', {
        type: 'watch',
        carId: car.id.toString(),
        userId: "User1"
      });
      setActiveCarId(car.id);
      alert(`${car.make} ${car.model} is now being tracked.`);
    } catch (err) {
      alert("Error saving to database.");
    }
  };

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

        {/* Header & Filters */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ margin: 0 }}>AutoMoX | Discovery Dashboard</h1>
            <button
              onClick={() => navigate('/admin')}
              style={{ background: '#1e293b', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              🛡️ Dealer Admin Portal
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
            <input
              placeholder="Search by Make..."
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: '1', minWidth: '250px', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
            />
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Max Price: ${Number(priceRange).toLocaleString()}
              </label>
              <input
                type="range" min="20000" max="230000" step="5000"
                value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Car Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {filteredCars.map(car => (
            <div key={car.id} style={{ background: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <img src={car.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} alt={car.model} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0' }}>{car.make} {car.model}</h3>
                <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.2rem', margin: '10px 0' }}>
                  ${car.price.toLocaleString()}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', background: '#f8fafc', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
                  <div>📅 {car.year}</div>
                  <div>⛽ {car.fuel}</div>
                  <div>🏎️ {car.speed}</div>
                  <div>🔋 {car.range}</div>
                </div>

                {/* Feature 2: Compare Button */}
                <button
                  onClick={() => toggleCompare(car)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: selectedCars.find(c => c.id === car.id) ? '#ef4444' : '#2563eb',
                    color: 'white', fontWeight: 'bold', marginBottom: '10px'
                  }}
                >
                  {selectedCars.find(c => c.id === car.id) ? 'Remove Compare' : 'Add to Compare'}
                </button>

                {/* Feature 13: Build & Personalize */}
                <button
                  onClick={() => {
                    handleViewTracking(car.id);
                    const params = new URLSearchParams({
                      model: car.model,
                      img: car.img,
                      price: car.price
                    }).toString();
                    navigate(`/personalize?${params}`);
                  }}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #2563eb',
                    cursor: 'pointer', background: 'white', color: '#2563eb', fontWeight: 'bold', marginBottom: '10px'
                  }}
                >
                  🛠️ Build & Personalize
                </button>

                {/* Feature 6: Trade-In */}
                <button
                  onClick={() => navigate('/trade-in')}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1',
                    cursor: 'pointer', background: '#fff', color: '#64748b', fontSize: '0.9rem', marginBottom: '10px'
                  }}
                >
                  🚗 Trade-In Valuation
                </button>

                {/* Feature 4: Watch / Wishlist */}
                <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px' }}>
                  {activeCarId !== car.id ? (
                    <button
                      onClick={() => handleWatch(car)}
                      style={{
                        width: '100%', padding: '12px', borderRadius: '10px', border: 'none',
                        background: '#f1f5f9', color: '#475569', fontWeight: 'bold', cursor: 'pointer'
                      }}
                    >
                      👁️ Watch This Car
                    </button>
                  ) : (
                    <div>
                      <p style={{ fontSize: '0.8rem', color: '#059669', marginBottom: '10px' }}>✅ Currently Tracking</p>
                      <WishlistButton carId={car.id.toString()} userId="User1" />
                      <div style={{ marginTop: '10px' }}>
                        <ReviewForm carId={car.id.toString()} userId="User1" />
                      </div>
                      <button
                        onClick={() => setActiveCarId(null)}
                        style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#666', fontSize: '0.7rem', cursor: 'pointer' }}
                      >
                        Close Forms
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature 2: Comparison Table */}
        {selectedCars.length >= 2 && (
          <div style={{ marginTop: '40px', background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '20px' }}>🔍 Car Comparison</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
                    {selectedCars.map(car => (
                      <th key={car.id} style={{ padding: '15px', borderBottom: '2px solid #e2e8f0' }}>
                        <img src={car.img} alt={car.model} style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '8px', display: 'block', margin: '0 auto 8px' }} />
                        {car.make} {car.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: '💰 Price', key: 'price', format: v => `$${v.toLocaleString()}` },
                    { label: '📅 Year', key: 'year' },
                    { label: '⛽ Fuel', key: 'fuel' },
                    { label: '🏎️ Speed', key: 'speed' },
                    { label: '🔋 Range', key: 'range' },
                  ].map((row, i) => (
                    <tr key={row.key} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '15px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>{row.label}</td>
                      {selectedCars.map(car => (
                        <td key={car.id} style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
                          {row.format ? row.format(car[row.key]) : car[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setSelectedCars([])}
              style={{ marginTop: '20px', padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Clear Comparison
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Discovery;