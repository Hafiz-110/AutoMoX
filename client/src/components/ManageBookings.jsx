import React, { useState, useEffect } from 'react';
import API from '../api';

const ManageBookings = ({ userEmail }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!userEmail) return;
    try {
      const res = await API.get(`/api/bookings/my-bookings/${userEmail}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this test drive?")) {
      try {
        await API.delete(`/api/bookings/cancel/${id}`);
        // FIX: Use functional update to ensure we use the latest state
        setBookings(prevBookings => prevBookings.filter(b => b._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Delete failed. Is the backend route correct?");
      }
    }
  };

  return (
    <div style={{ marginTop: '30px', textAlign: 'left', color: 'white' }}>
      <h3>Manage Your Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found for {userEmail || "this email"}.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', color: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', textAlign: 'left' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #555' }}>Car</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #555' }}>Date</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #555' }}>Status</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #555' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id} style={{ borderBottom: '1px solid #444' }}>
                <td style={{ padding: '10px' }}>{b.carName}</td>
                <td style={{ padding: '10px' }}>
                  {b.date ? new Date(b.date).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ 
                  padding: '10px', 
                  color: b.status === 'Pending' ? 'orange' : '#4caf50',
                  fontWeight: 'bold' 
                }}>
                  {b.status || 'Pending'}
                </td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => handleCancel(b._id)} 
                    style={{ 
                      color: '#ff4d4d', 
                      border: '1px solid #ff4d4d', 
                      background: 'rgba(255, 77, 77, 0.1)', 
                      padding: '5px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBookings;