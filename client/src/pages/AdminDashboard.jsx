import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const StatCard = ({ label, value, accent }) => (
  <div style={{ background: '#1a1a1a', border: `1px solid ${accent || '#333'}`, borderRadius: 12, padding: '24px', flex: 1, textAlign: 'center' }}>
    <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 900, color: accent || '#e8c96a' }}>{value}</div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [data, setData] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [analyticsRes, carsRes] = await Promise.all([
        axios.get(`${API}/admin/analytics`),
        axios.get(`${API}/cars`)
      ]);
      setData(analyticsRes.data);
      setCars(carsRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Feature 17: Delete car permanently
  const handleDelete = async (carId, carName) => {
    if (!window.confirm(`Permanently delete ${carName}? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API}/admin/cars/${carId}`);
      setCars(prev => prev.filter(c => c._id !== carId));
      alert(`${carName} deleted successfully.`);
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // Feature 17: Archive car
  const handleArchive = async (carId, carName, currentStatus) => {
    const newStatus = currentStatus === 'archived' ? 'available' : 'archived';
    const action = newStatus === 'archived' ? 'archive' : 'unarchive';
    if (!window.confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} ${carName}?`)) return;
    try {
      await axios.delete(`${API}/admin/cars/${carId}?archive=true`);
      setCars(prev => prev.map(c => c._id === carId ? { ...c, status: newStatus } : c));
      alert(`${carName} ${action}d successfully.`);
    } catch (err) {
      alert('Archive failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#fff', padding: '40px' }}>
      <h1 style={{ textAlign: 'center', color: '#e8c96a', marginBottom: '10px' }}>AutoMoX | Admin</h1>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginBottom: 40 }}>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{ padding: '12px 24px', borderRadius: 8, cursor: 'pointer', border: '1px solid #e8c96a', background: activeTab === 'analytics' ? '#e8c96a' : 'transparent', color: activeTab === 'analytics' ? '#000' : '#e8c96a', fontWeight: 'bold' }}
        >📊 Analytics</button>
        <button
          onClick={() => setActiveTab('inventory')}
          style={{ padding: '12px 24px', borderRadius: 8, cursor: 'pointer', border: '1px solid #e8c96a', background: activeTab === 'inventory' ? '#e8c96a' : 'transparent', color: activeTab === 'inventory' ? '#000' : '#e8c96a', fontWeight: 'bold' }}
        >🚗 Inventory</button>
      </div>

      {activeTab === 'analytics' ? (
        <div>
          {/* Feature 18: Summary Stats */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
            <StatCard label="Total Inventory" value={data?.totalInventory || 0} />
            <StatCard label="Inventory Value" value={`$${(data?.totalInventoryValue || 0).toLocaleString()}`} accent="#4ade80" />
            <StatCard label="Avg. Price" value={`$${(data?.averagePrice || 0).toLocaleString()}`} accent="#60a5fa" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 25 }}>
            {/* Feature 18: Views Tracking */}
            <div style={{ background: '#1a1a1a', padding: 25, borderRadius: 12, border: '1px solid #333' }}>
              <h3 style={{ color: '#e8c96a', marginBottom: 20 }}>🔥 Most Viewed Cars</h3>
              {(data?.topViewedCars || []).map((car) => (
                <div key={car._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #222' }}>
                  <span>{car.year} {car.make} {car.model}</span>
                  <span style={{ color: '#e8c96a', fontWeight: 'bold' }}>{car.viewCount} views</span>
                </div>
              ))}
            </div>

            {/* Feature 18: Make Breakdown */}
            <div style={{ background: '#1a1a1a', padding: 25, borderRadius: 12, border: '1px solid #333' }}>
              <h3 style={{ color: '#e8c96a', marginBottom: 20 }}>🏷️ Inventory by Make</h3>
              {(data?.makeBreakdown || []).map(m => (
                <div key={m._id} style={{ marginBottom: 15 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                    <span>{m._id}</span>
                    <span>{m.count} cars</span>
                  </div>
                  <div style={{ background: '#000', height: 8, borderRadius: 4 }}>
                    <div style={{ width: `${(m.count / data.totalInventory) * 100}%`, height: '100%', background: '#e8c96a', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Feature 17: Inventory Management */
        <div style={{ background: '#1a1a1a', padding: 30, borderRadius: 12, border: '1px solid #333' }}>
          <h3 style={{ color: '#e8c96a', marginBottom: 20 }}>Current Inventory</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#888', borderBottom: '1px solid #333' }}>
                <th style={{ padding: 10 }}>Vehicle</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car._id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '15px 10px' }}>{car.year} {car.make} {car.model}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px', borderRadius: 4,
                      background: car.status === 'archived' ? '#2b1a0d' : '#0d2b1a',
                      color: car.status === 'archived' ? '#facc15' : '#4ade80',
                      fontSize: 12
                    }}>
                      {car.status || 'available'}
                    </span>
                  </td>
                  <td>${car.price?.toLocaleString()}</td>
                  <td style={{ display: 'flex', gap: 8, padding: '15px 0' }}>
                    {/* Archive / Unarchive Button */}
                    <button
                      onClick={() => handleArchive(car._id, `${car.year} ${car.make} ${car.model}`, car.status)}
                      style={{
                        background: 'none',
                        border: `1px solid ${car.status === 'archived' ? '#4ade80' : '#facc15'}`,
                        color: car.status === 'archived' ? '#4ade80' : '#facc15',
                        padding: '5px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 12
                      }}
                    >
                      {car.status === 'archived' ? '✅ Unarchive' : '📦 Archive'}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(car._id, `${car.year} ${car.make} ${car.model}`)}
                      style={{
                        background: 'none', border: '1px solid #ef4444',
                        color: '#ef4444', padding: '5px 10px',
                        borderRadius: 4, cursor: 'pointer', fontSize: 12
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;