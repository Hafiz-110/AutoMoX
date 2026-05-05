import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

// --- UI COMPONENTS ---

const StatCard = ({ label, value, accent }) => (
  <div style={{ background: '#1a1a1a', border: `1px solid ${accent || '#333'}`, borderRadius: 12, padding: '24px', flex: 1, textAlign: 'center' }}>
    <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 900, color: accent || '#e8c96a' }}>{value}</div>
  </div>
);

const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 24px',
      borderRadius: '8px 8px 0 0',
      cursor: 'pointer',
      border: 'none',
      background: active ? '#1a1a1a' : 'transparent',
      color: active ? '#e8c96a' : '#555',
      fontWeight: 'bold',
      borderBottom: active ? '2px solid #e8c96a' : '2px solid transparent',
      transition: '0.2s'
    }}
  >
    {label}
  </button>
);

const InventoryManager = ({ cars, onDelete, onArchive, onRefresh }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [vin, setVin] = useState('');
  const [formData, setFormData] = useState({ make: '', model: '', year: '', price: '' });

  const handleVinChange = async (e) => {
    const inputVin = e.target.value.toUpperCase();
    setVin(inputVin);
    if (inputVin.length === 17) {
      try {
        const res = await axios.post(`${API}/admin/cars/vin-lookup`, { vin: inputVin });
        if (res.data.data) {
          setFormData({
            ...formData,
            make: res.data.data.make || '',
            model: res.data.data.model || '',
            year: res.data.data.year || ''
          });
        }
      } catch (err) { console.error("VIN Error:", err); }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/admin/cars`, { ...formData, vin: vin.toUpperCase(), stockStatus: 'available' });
      setShowAddForm(false);
      setVin('');
      setFormData({ make: '', model: '', year: '', price: '' });
      onRefresh();
    } catch (err) { alert("Failed to add vehicle."); }
  };

  const handlePriceUpdate = async (carId, currentPrice, carName) => {
    const newPriceInput = window.prompt(`Update price for ${carName}:`, currentPrice);
    const newPrice = Number(newPriceInput);

    if (newPriceInput !== null && !isNaN(newPrice) && newPrice !== currentPrice) {
      try {
        // This MUST be axios.put to match the router.put in backend
        await axios.put(`${API}/admin/cars/${carId}`, { price: newPrice });
        
        if (newPrice < currentPrice) {
          alert("Price lowered! Notifications sent to watchers.");
        } else {
          alert("Price updated successfully.");
        }
        onRefresh();
      } catch (err) {
        console.error("Update error:", err);
        alert("Update failed. Check if your backend server is running and the route is .put");
      }
    }
  };

  return (
    <div style={{ background: '#111', padding: '30px', borderRadius: '15px', border: '1px solid #222' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#e8c96a', margin: 0, fontSize: '24px', fontWeight: '800' }}>Inventory Control</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ background: '#e8c96a', color: '#000', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {showAddForm ? '✕ Close' : '+ Add Vehicle'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px', background: '#1a1a1a', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
          <input placeholder="VIN" value={vin} onChange={handleVinChange} style={{ gridColumn: 'span 2', padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '6px' }} />
          <input placeholder="Make" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '6px' }} />
          <input placeholder="Model" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '6px' }} />
          <input placeholder="Year" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '6px' }} />
          <input placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '6px' }} />
          <button type="submit" style={{ gridColumn: 'span 2', background: '#4ade80', color: '#000', padding: '12px', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save Listing</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #222', color: '#555', fontSize: '14px', textTransform: 'uppercase' }}>
            <th style={{ padding: '15px' }}>Vehicle</th>
            <th style={{ padding: '15px' }}>Price</th>
            <th style={{ padding: '15px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id} style={{ borderBottom: '1px solid #1a1a1a' }}>
              <td style={{ padding: '20px 15px', fontWeight: '500' }}>{car.year} {car.make} {car.model}</td>
              <td style={{ padding: '20px 15px', color: '#fff', fontWeight: 'bold' }}>${Number(car.price).toLocaleString()}</td>
              <td style={{ padding: '20px 15px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handlePriceUpdate(car._id, car.price, `${car.make} ${car.model}`)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Edit Price
                </button>
                <button 
                  onClick={() => onArchive(car._id, car.model, car.stockStatus)}
                  style={{ background: '#d97706', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {car.stockStatus === 'archived' ? 'Unarchive' : 'Archive'}
                </button>
                <button 
                  onClick={() => onDelete(car._id, car.model)}
                  style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
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
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Permanently delete ${name}?`)) {
      try {
        await axios.delete(`${API}/admin/cars/${id}`);
        fetchData();
      } catch (err) { alert("Delete failed"); }
    }
  };

  const handleArchive = async (id, name, status) => {
    const query = status === 'archived' ? '' : '?archive=true';
    try {
      await axios.delete(`${API}/admin/cars/${id}${query}`);
      fetchData();
    } catch (err) { alert("Archive failed"); }
  };

  if (loading) return <div style={{ minHeight: '100vh', background: '#000', color: '#e8c96a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>INITIALIZING ADMIN TERMINAL...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#e8c96a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '900' }}>AUTOMX COMMAND CENTER</h1>
          <div style={{ height: '2px', width: '60px', background: '#e8c96a' }}></div>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <Tab label="📊 Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <Tab label="🚗 Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
        </div>

        {activeTab === 'analytics' && data && (
          <div style={{ display: 'flex', gap: '20px', animation: 'fadeIn 0.5s' }}>
            <StatCard label="Total Units" value={data.totalInventory} />
            <StatCard label="Asset Value" value={`$${data.totalInventoryValue.toLocaleString()}`} accent="#4ade80" />
            <StatCard label="Average Price" value={`$${Math.round(data.averagePrice).toLocaleString()}`} accent="#2563eb" />
          </div>
        )}

        {activeTab === 'inventory' && (
          <InventoryManager 
            cars={cars} 
            onDelete={handleDelete} 
            onArchive={handleArchive} 
            onRefresh={fetchData} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;