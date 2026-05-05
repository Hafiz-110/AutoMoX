import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ carId, userId }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewId = "REV-" + Date.now(); // Unique ID for class diagram
            await axios.post('http://localhost:5000/api/add-review', {
                reviewId, rating, comment, carId, userId
            });
            alert("Review submitted!");
            setComment(''); // Clear comment after success
        } catch (err) {
            console.error(err);
            alert("Failed to submit review. Is the server running?");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '15px', textAlign: 'left' }}>
            {/* Heading: Changed to white for visibility on dark cards */}
            <h4 style={{ 
                color: '#ffffff', 
                fontSize: '0.95rem', 
                marginBottom: '10px', 
                textAlign: 'center',
                fontWeight: '600'
            }}>
                Leave a Review
            </h4>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input 
                    type="number" 
                    min="1" 
                    max="5" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    style={{
                        width: '50px',
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #444',
                        background: '#fff',
                        color: '#000',
                        fontWeight: 'bold'
                    }}
                />
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Your comment..." 
                    style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #444',
                        background: '#fff',
                        color: '#000',
                        fontSize: '0.85rem',
                        minHeight: '40px',
                        outline: 'none'
                    }}
                />
            </div>

            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#2563eb',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.background = '#2563eb'}
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;