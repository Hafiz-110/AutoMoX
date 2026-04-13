import React from 'react';
import axios from 'axios';

const WishlistButton = ({ carId, userId }) => {
    const handleAdd = async () => {
        try {
            // REMOVED the random Date.now() ID generation here
            // We want the backend to find the existing carId/userId pair
            await axios.post('http://localhost:5000/api/add-wishlist', {
                carId, // "123"
                userId, // "User1"
                type: 'wishlist' // This tells the backend to change status from 'watch' to 'wishlist'
            });
            alert("Added to Wishlist successfully!");
        } catch (err) {
            alert("Error updating wishlist.");
        }
    };

    return (
        <button onClick={handleAdd} className="wishlist-btn" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            ❤️ Add to Wishlist
        </button>
    );
};

export default WishlistButton;