import React, { useState } from 'react';
import axios from 'axios';

const WishlistButton = ({ carId, userId }) => {
    // State to track if the car is in the wishlist
    const [isAdded, setIsAdded] = useState(false);

    const handleToggleWishlist = async () => {
        if (!isAdded) {
            // ADD logic
            try {
                await axios.post('http://localhost:5000/api/add-wishlist', {
                    carId,
                    userId,
                    type: 'wishlist'
                });
                setIsAdded(true);
                alert("Added to Wishlist!");
            } catch (err) {
                alert("Error adding to wishlist.");
            }
        } else {
            // REMOVE logic
            try {
                // Adjust this URL to match your backend delete route
                await axios.delete(`http://localhost:5000/api/remove-wishlist/${userId}/${carId}`);
                setIsAdded(false);
                alert("Removed from Wishlist.");
            } catch (err) {
                alert("Error removing from wishlist.");
            }
        }
    };

    return (
        <button 
            onClick={handleToggleWishlist} 
            style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '10px', 
                border: 'none', 
                // Toggles color between Blue and the Red from your screenshot
                background: isAdded ? '#ef4444' : '#2563eb', 
                color: 'white', 
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
            }}
        >
            {isAdded ? '🗑️ Remove from Wishlist' : '❤️ Add to Wishlist'}
        </button>
    );
};

export default WishlistButton;