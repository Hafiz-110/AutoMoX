import React, { useState } from 'react';
import API from '../api'; // Path to your api.js

// Added 'onEmailChange' prop here
const BookingForm = ({ onEmailChange }) => {
  const [formData, setFormData] = useState({
    carName: '',
    customerName: '',
    email: '',
    date: '',
    timeSlot: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Added this logic: Whenever the email field changes, 
    // it notifies App.jsx to update the ManageBookings list
    if (name === 'email') {
      onEmailChange(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/bookings/book', formData);

      if (response.status === 201) {
        alert('Test Drive Booked Successfully! ✅');
        setFormData({ carName: '', customerName: '', email: '', date: '', timeSlot: '' });
        // Optional: clear the email filter in the parent if desired
        // onEmailChange(''); 
      }
    } catch (error) {
      console.error('Booking Error:', error);
      alert('Failed to book. Check console for details.');
    }
  };

  return (
    <div className="booking-container" style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
      <h2>🚗 Book a Test Drive</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="carName" placeholder="Car Model" value={formData.carName} onChange={handleChange} required />
        <input name="customerName" placeholder="Your Name" value={formData.customerName} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        
        <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
          <option value="">Select Time Slot</option>
          <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
          <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
          <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
        </select>

        <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '8px' }}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;