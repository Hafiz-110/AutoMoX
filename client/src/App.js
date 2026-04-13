import React, { useState } from 'react';
import ReviewForm from './components/Reviews/ReviewForm';
import WishlistButton from './components/Wishlist/WishlistButton';
import axios from 'axios'; 
import './App.css';

function App() {
  const [isWatching, setIsWatching] = useState(false);
  const carImageUrl = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400";

  const handleWatch = async () => {
    try {
      await axios.post('http://localhost:5000/api/add-wishlist', { 
        type: 'watch',
        carId: "123",
        userId: "User1"
      });
      setIsWatching(true); 
      alert("Car is now being tracked.");
    } catch (err) {
      alert("Error saving to database.");
    }
  };

  const handleRemoveWishlist = async () => {
    try {
      await axios.delete('http://localhost:5000/api/delete-last-wishlist');
      setIsWatching(false); 
      alert("Car removed from tracking.");
    } catch (err) {
      alert("Error removing from database.");
    }
  };

  const handleDeleteReview = async () => {
    try {
      const res = await axios.delete('http://localhost:5000/api/delete-last-review');
      alert(res.data.message);
    } catch (err) {
      alert("Error deleting review.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AutoMoX User Dashboard</h1>
        
        <div style={{ margin: '20px', padding: '20px', border: '2px solid #555', borderRadius: '15px', backgroundColor: '#222', width: '80%', maxWidth: '600px' }}>
          
          {/* FEATURE 4: WATCH & WISHLIST */}
          <section style={{ marginBottom: '30px' }}>
            <h2>Requirement 1, Feature 4: Watch & Wishlist</h2>
            
            {isWatching && (
              <div style={{ marginBottom: '15px' }}>
                <img src={carImageUrl} alt="Car" style={{ width: '100%', borderRadius: '10px', border: '2px solid #2196F3' }} />
                <p style={{ color: '#2196F3', fontWeight: 'bold' }}>⭐ Now tracking: Tesla Model S</p>
              </div>
            )}

            {!isWatching ? (
              <button onClick={handleWatch} style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>
                👁️ Watch Car
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <WishlistButton carId="123" userId="User1" />
                <p style={{ fontSize: '12px' }}>Car saved! Click above to move to Wishlist.</p>
                
                <button onClick={handleRemoveWishlist} style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>
                  🗑️ Remove from Watchlist/Wishlist
                </button>
              </div>
            )}
          </section>

          {/* FEATURE 11: REVIEWS - Now inside the conditional block */}
          {isWatching && (
            <section style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px' }}>
              <h2>Requirement 3, Feature 11: Leave a Review</h2>
              <ReviewForm carId="123" userId="User1" />
              
              <button 
                onClick={handleDeleteReview} 
                style={{ 
                  backgroundColor: '#ff4d4d', 
                  color: 'white', 
                  marginTop: '20px', 
                  padding: '8px 15px', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  border: 'none' 
                }}
              >
                🗑️ Delete Last Review
              </button>
            </section>
          )}

        </div>
      </header>
    </div>
  );
}

export default App;