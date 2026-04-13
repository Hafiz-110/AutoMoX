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
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <h4>Leave a Review</h4>
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Your comment..." />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReviewForm;