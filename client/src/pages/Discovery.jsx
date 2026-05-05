import ReviewForm from '../components/Reviews/ReviewForm';
import WishlistButton from '../components/Wishlist/WishlistButton';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const localCars = [
  { id: 1, make: "Tesla", model: "Model 3", price: 45000, fuel: "Electric", year: 2024, range: "350 miles", speed: "145 mph", img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400", category: "Sedan" },
  { id: 2, make: "Toyota", model: "Camry", price: 28000, fuel: "Petrol", year: 2023, range: "450 miles", speed: "135 mph", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400", category: "Sedan" },
  { id: 3, make: "BMW", model: "i4", price: 62000, fuel: "Electric", year: 2024, range: "300 miles", speed: "118 mph", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400", category: "Sedan" },
  { id: 4, make: "Nissan", model: "Altima", price: 27000, fuel: "Petrol", year: 2022, range: "400 miles", speed: "130 mph", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400", category: "Sedan" },
  { id: 6, make: "Ford", model: "Mustang", price: 55000, fuel: "Petrol", year: 2023, range: "350 miles", speed: "155 mph", img: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400", category: "Coupe" },
  { id: 8, make: "Porsche", model: "Taycan", price: 90000, fuel: "Electric", year: 2024, range: "240 miles", speed: "143 mph", img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400", category: "Sedan" },
  { id: 9, make: "Mercedes", model: "C-Class", price: 46000, fuel: "Petrol", year: 2023, range: "420 miles", speed: "132 mph", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400", category: "Sedan" },
  { id: 10, make: "Honda", model: "Civic", price: 25000, fuel: "Petrol", year: 2023, range: "410 miles", speed: "125 mph", img: "https://images.unsplash.com/photo-1599912027806-cfec9f5944b6?w=400", category: "Sedan" },
  { id: 12, make: "Lamborghini", model: "Urus", price: 230000, fuel: "Petrol", year: 2024, range: "370 miles", speed: "190 mph", img: "https://placehold.co/400x225/facc15/000?text=Urus", category: "SUV" },
];

const Discovery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(230000);
  const [selectedCars, setSelectedCars] = useState([]);
  const [activeCarId, setActiveCarId] = useState(null);
  const [fuelFilter, setFuelFilter] = useState('All');

  // NEW: Feature 10 Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      alert("Logged out successfully.");
    } else {
      const pass = prompt("Enter User Password (Hint: 1234):");
      if (pass === "1234") {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        alert("Welcome back, Junayed!");
      } else {
        alert("Invalid password!");
      }
    }
  };

  const filteredCars = localCars.filter(car =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) &&
    car.price <= priceRange &&
    (fuelFilter === 'All' || car.fuel === fuelFilter)
  );

  const handleViewTracking = async (carId) => {
    try {
      await axios.patch(`http://localhost:5000/api/cars/${carId}/view`);
    } catch (err) {
      console.error("Tracking failed:", err);
    }
  };

  const handleWatch = async (car) => {
    try {
      await axios.post('http://localhost:5000/api/wishlist', {
        userId: "User1",
        carId: car.id.toString(),
        email: "junayedazuz530@gmail.com",
        type: 'watch'
      });
      setActiveCarId(car.id);
      alert(`${car.make} ${car.model} is now being tracked!`);
    } catch (err) {
      console.error("Connection Error:", err.response || err);
    }
  };

  const handleBookTestDrive = async (car) => {
    const date = prompt("Enter a preferred date for your Test Drive (YYYY-MM-DD):");
    if (!date) return;
    try {
      await axios.post('http://localhost:5000/api/wishlist', {
        userId: "User1",
        carId: car.id.toString(),
        email: "junayedazuz530@gmail.com",
        type: 'test-drive',
        note: `Requested Date: ${date}`
      });
      alert(`Success! Test drive for ${car.make} ${car.model} on ${date} saved to database. ✅`);
    } catch (err) {
      console.error("Database Error:", err);
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
    <div style={{ background: '#090909', minHeight: '100vh', padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>

        {/* Header & Filters */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, color: '#111' }}>AutoMoX | Discovery Dashboard</h1>
            
            {/* UPDATED: Feature 10 Header Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAuth}
                style={{ background: isLoggedIn ? '#ef4444' : '#10b981', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {isLoggedIn ? '🔓 Logout' : '🔒 Login'}
              </button>
              <button
                onClick={() => navigate('/admin')}
                style={{ background: '#1e293b', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                🛡️ Dealer Admin Portal
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
            <input
              placeholder="Search by Make..."
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: '2', minWidth: '250px', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
            />

            <select
              onChange={(e) => setFuelFilter(e.target.value)}
              style={{ flex: '1', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
            >
              <option value="All">All Fuel Types</option>
              <option value="Electric">Electric</option>
              <option value="Petrol">Petrol</option>
            </select>

            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
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
            <div key={car.id} style={{ background: '#111010', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #333' }}>
              <img src={car.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} alt={car.model} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0', color: '#fff' }}>{car.make} {car.model}</h3>
                <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.2rem', margin: '10px 0' }}>
                  ${car.price.toLocaleString()}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', background: '#323334', padding: '10px', borderRadius: '8px', marginBottom: '15px', color: '#fff' }}>
                  <div>📅 {car.year}</div>
                  <div>⛽ {car.fuel}</div>
                  <div>🏎️ {car.speed}</div>
                  <div>🔋 {car.range}</div>
                </div>

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

                <button
                  onClick={() => handleBookTestDrive(car)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '10px', border: 'none',
                    cursor: 'pointer', background: '#f59e0b', color: 'white', fontWeight: 'bold', marginBottom: '10px'
                  }}
                >
                  📅 Book Test Drive
                </button>

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

                <div style={{ borderTop: '1px solid #333', paddingTop: '10px', marginTop: '10px' }}>
                  {activeCarId !== car.id ? (
                    <button
                      onClick={() => handleWatch(car)}
                      style={{
                        width: '100%', padding: '12px', borderRadius: '10px', border: 'none',
                        background: '#333', color: '#fff', fontWeight: 'bold', cursor: 'pointer'
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
                        style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#aaa', fontSize: '0.7rem', cursor: 'pointer' }}
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

        {/* Comparison Table */}
        {selectedCars.length >= 2 && (
          <div style={{ marginTop: '40px', background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '20px', color: '#111' }}>🔍 Car Comparison</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#333' }}>Feature</th>
                    {selectedCars.map(car => (
                      <th key={car.id} style={{ padding: '15px', borderBottom: '2px solid #e2e8f0', color: '#333' }}>
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
                      <td style={{ padding: '15px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#333' }}>{row.label}</td>
                      {selectedCars.map(car => (
                        <td key={car.id} style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', color: '#555' }}>
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

        {/* FEATURE 8: Floating Inquiry / Chat Bubble */}
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
          <button 
            onClick={() => {
              const msg = prompt("How can we help you today? (e.g., 'Is the Tesla available?')");
              if(msg) {
                axios.post('http://localhost:5000/api/wishlist', {
                  userId: "User1",
                  email: "junayedazuz530@gmail.com",
                  type: 'inquiry',
                  note: msg
                });
                alert("Your message has been sent to the dealer! 📩");
              }
            }}
            style={{ 
              width: '65px', height: '65px', borderRadius: '50%', background: '#2563eb', 
              color: 'white', border: 'none', cursor: 'pointer', fontSize: '28px', 
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.5)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            💬
          </button>
        </div>

      </div>
    </div>
  );
};

export default Discovery;