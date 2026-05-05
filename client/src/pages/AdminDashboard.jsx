import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Reusable styled alert ─────────────────────────────────────────────────
const Alert = ({ type, message, onClose }) => {
  if (!message) return null;
  const colors = {
    success: { bg: '#0d2b1a', border: '#22c55e', text: '#4ade80' },
    error:   { bg: '#2b0d0d', border: '#ef4444', text: '#f87171' },
    info:    { bg: '#0d1b2b', border: '#3b82f6', text: '#60a5fa' },
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '12px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: c.text, fontSize: 14 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: c.text, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
    </div>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, accent }) => (
  <div style={{ background: '#1a1a1a', border: `1px solid ${accent || '#333'}`, borderRadius: 12, padding: '20px 24px', flex: 1, minWidth: 160 }}>
    <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 900, color: accent || '#e8c96a', letterSpacing: -1 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{sub}</div>}
  </div>
);

// ─── Tab Button ────────────────────────────────────────────────────────────
const Tab = ({ label, active, onClick, badge }) => (
  <button onClick={onClick} style={{ padding: '10px 20px', background: active ? '#e8c96a' : 'transparent', color: active ? '#0f0f0f' : '#888', border: `1px solid ${active ? '#e8c96a' : '#333'}`, borderRadius: 8, cursor: 'pointer', fontWeight: active ? 800 : 500, fontSize: 14, transition: 'all 0.2s', position: 'relative' }}>
    {label}
    {badge != null && <span style={{ marginLeft: 6, background: active ? '#0f0f0f' : '#e8c96a', color: active ? '#e8c96a' : '#0f0f0f', borderRadius: 99, padding: '1px 7px', fontSize: 11, fontWeight: 800 }}>{badge}</span>}
  </button>
);

// ─── FEATURE 18: Analytics Dashboard ──────────────────────────────────────
const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/admin/analytics`)
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: '#666', textAlign: 'center', padding: 48 }}>Loading analytics…</div>;
  if (!data) return <div style={{ color: '#f87171' }}>Failed to load analytics.</div>;

  const stockMap = {};
  (data.stockBreakdown || []).forEach(s => { stockMap[s._id] = s.count; });

  const stockColors = { available: '#4ade80', reserved: '#facc15', sold: '#f87171', archived: '#555' };

  return (
    <div>
      {/* KPI Row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <StatCard label="Total Inventory" value={data.totalInventory} accent="#e8c96a" />
        <StatCard label="Inventory Value" value={`$${(data.totalInventoryValue || 0).toLocaleString()}`} accent="#4ade80" />
        <StatCard label="Avg. Price" value={`$${(data.averagePrice || 0).toLocaleString()}`} accent="#60a5fa" />
        <StatCard label="Available" value={stockMap.available || 0} accent="#4ade80" sub="vehicles" />
        <StatCard label="Reserved" value={stockMap.reserved || 0} accent="#facc15" sub="vehicles" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Most Viewed Cars */}
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 12, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', color: '#e8c96a', fontSize: 16, fontWeight: 800 }}>🔥 Most Viewed Cars</h3>
          {(data.topViewedCars || []).map((car, i) => (
            <div key={car._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < data.topViewedCars.length - 1 ? '1px solid #222' : 'none' }}>
              <span style={{ color: '#555', fontWeight: 800, fontSize: 18, width: 24 }}>#{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{car.year} {car.make} {car.model}</div>
                <div style={{ color: '#888', fontSize: 12 }}>${(car.price || 0).toLocaleString()}</div>
              </div>
              <div style={{ color: '#e8c96a', fontWeight: 800, fontSize: 14 }}>{car.viewCount} views</div>
              <span style={{ padding: '3px 8px', borderRadius: 99, fontSize: 11, background: stockColors[car.stockStatus] + '22', color: stockColors[car.stockStatus], border: `1px solid ${stockColors[car.stockStatus]}` }}>
                {car.stockStatus}
              </span>
            </div>
          ))}
        </div>

        {/* Make Breakdown */}
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 12, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', color: '#e8c96a', fontSize: 16, fontWeight: 800 }}>🏷️ Inventory by Make</h3>
          {(data.makeBreakdown || []).map(m => {
            const pct = data.totalInventory ? Math.round((m.count / data.totalInventory) * 100) : 0;
            return (
              <div key={m._id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#ccc', fontSize: 13 }}>{m._id}</span>
                  <span style={{ color: '#888', fontSize: 12 }}>{m.count} ({pct}%)</span>
                </div>
                <div style={{ background: '#0f0f0f', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #c8a951, #e8c96a)', borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fuel Breakdown + Recent Listings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 12, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', color: '#e8c96a', fontSize: 16, fontWeight: 800 }}>⛽ By Fuel Type</h3>
          {(data.fuelBreakdown || []).map(f => (
            <div key={f._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #222', alignItems: 'center' }}>
              <span style={{ color: '#ccc', fontSize: 13 }}>{f._id}</span>
              <span style={{ color: '#e8c96a', fontWeight: 700, fontSize: 14 }}>{f.count}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 12, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', color: '#e8c96a', fontSize: 16, fontWeight: 800 }}>🕐 Recently Added</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333' }}>
                {['Vehicle', 'Year', 'Price', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0 0 10px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data.recentListings || []).map(car => (
                <tr key={car._id} style={{ borderBottom: '1px solid #1f1f1f' }}>
                  <td style={{ padding: '10px 0', color: '#fff', fontSize: 14 }}>{car.make} {car.model}</td>
                  <td style={{ padding: '10px 0', color: '#888', fontSize: 13 }}>{car.year}</td>
                  <td style={{ padding: '10px 0', color: '#4ade80', fontSize: 13, fontWeight: 700 }}>${(car.price || 0).toLocaleString()}</td>
                  <td style={{ padding: '10px 0' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, background: (stockColors[car.stockStatus] || '#555') + '22', color: stockColors[car.stockStatus] || '#888', border: `1px solid ${stockColors[car.stockStatus] || '#555'}` }}>
                      {car.stockStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── FEATURE 15 + 16 + 17: Inventory Manager ──────────────────────────────
const InventoryManager = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // VIN Lookup state (Feature 15)
  const [vin, setVin] = useState('');
  const [vinLoading, setVinLoading] = useState(false);
  const [vinData, setVinData] = useState(null);
  const [newCarForm, setNewCarForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit state (Feature 16)
  const [editingCar, setEditingCar] = useState(null);
  const [editForm, setEditForm] = useState({});

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const r = await axios.get(`${API}/cars`);
      setCars(r.data);
    } catch {
      showAlert('error', 'Failed to load inventory.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  // Feature 15: VIN Lookup
  const handleVinLookup = async () => {
    if (!vin || vin.length !== 17) return showAlert('error', 'VIN must be exactly 17 characters.');
    setVinLoading(true);
    try {
      const r = await axios.post(`${API}/admin/cars/vin-lookup`, { vin });
      setVinData(r.data.data);
      setNewCarForm({ ...r.data.data, price: '', images: [] });
      setShowAddForm(true);
    } catch (err) {
      showAlert('error', err.response?.data?.error || 'VIN lookup failed.');
    } finally {
      setVinLoading(false);
    }
  };

  // Feature 15: Create Car
  const handleCreateCar = async () => {
    try {
      await axios.post(`${API}/admin/cars`, newCarForm);
      showAlert('success', 'Car listing created successfully!');
      setShowAddForm(false);
      setVin(''); setVinData(null); setNewCarForm({});
      fetchCars();
    } catch (err) {
      showAlert('error', err.response?.data?.error || 'Failed to create listing.');
    }
  };

  // Feature 16: Update Car
  const handleUpdate = async () => {
    try {
      await axios.patch(`${API}/admin/cars/${editingCar._id}`, editForm);
      showAlert('success', 'Car updated successfully!');
      setEditingCar(null);
      fetchCars();
    } catch (err) {
      showAlert('error', err.response?.data?.error || 'Update failed.');
    }
  };

  // Feature 17: Delete / Archive
  const handleDelete = async (car, archive = false) => {
    const action = archive ? 'archive' : 'permanently delete';
    if (!window.confirm(`Are you sure you want to ${action} the ${car.year} ${car.make} ${car.model}?`)) return;
    try {
      await axios.delete(`${API}/admin/cars/${car._id}${archive ? '?archive=true' : ''}`);
      showAlert('success', archive ? 'Car archived.' : 'Car deleted permanently.');
      fetchCars();
    } catch (err) {
      showAlert('error', err.response?.data?.error || 'Operation failed.');
    }
  };

  const stockColors = { available: '#4ade80', reserved: '#facc15', sold: '#f87171', archived: '#555' };

  const inputStyle = { background: '#111', border: '1px solid #333', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, width: '100%', boxSizing: 'border-box', outline: 'none' };
  const labelStyle = { fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, display: 'block' };

  return (
    <div>
      <Alert type={alert?.type} message={alert?.message} onClose={() => setAlert(null)} />

      {/* ── Feature 15: Add Car via VIN ── */}
      <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px', color: '#e8c96a', fontSize: 16, fontWeight: 800 }}>➕ Add New Listing via VIN</h3>
        <div style={{ display: 'flex', gap: 12, marginBottom: showAddForm ? 20 : 0 }}>
          <input
            value={vin}
            onChange={e => setVin(e.target.value.toUpperCase())}
            placeholder="Enter 17-character VIN…"
            maxLength={17}
            style={{ ...inputStyle, flex: 1, fontFamily: 'monospace', letterSpacing: 2 }}
          />
          <button onClick={handleVinLookup} disabled={vinLoading} style={{ padding: '10px 24px', background: vinLoading ? '#333' : 'linear-gradient(135deg, #c8a951, #e8c96a)', color: '#0f0f0f', border: 'none', borderRadius: 8, cursor: vinLoading ? 'not-allowed' : 'pointer', fontWeight: 800, fontSize: 14, whiteSpace: 'nowrap' }}>
            {vinLoading ? 'Looking up…' : '🔍 Decode VIN'}
          </button>
        </div>

        {showAddForm && (
          <div style={{ borderTop: '1px solid #333', paddingTop: 20 }}>
            <div style={{ background: '#111', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 13, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 8 }}>
              ✅ VIN decoded — review and complete the fields below, then save.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { key: 'make', label: 'Make' }, { key: 'model', label: 'Model' }, { key: 'year', label: 'Year', type: 'number' },
                { key: 'fuelType', label: 'Fuel Type' }, { key: 'price', label: 'Price (BDT)', type: 'number' }, { key: 'color', label: 'Color' },
                { key: 'engineType', label: 'Engine' }, { key: 'transmission', label: 'Transmission' }, { key: 'drivetrain', label: 'Drivetrain' },
                { key: 'bodyStyle', label: 'Body Style' }, { key: 'vin', label: 'VIN' },
              ].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    value={newCarForm[field.key] || ''}
                    onChange={e => setNewCarForm(p => ({ ...p, [field.key]: e.target.value }))}
                    style={inputStyle}
                    readOnly={field.key === 'vin'}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button onClick={handleCreateCar} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #166534, #22c55e)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>
                ✅ Save Listing
              </button>
              <button onClick={() => { setShowAddForm(false); setVin(''); setVinData(null); }} style={{ padding: '12px 20px', background: '#2a2a2a', color: '#888', border: '1px solid #333', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Feature 16 & 17: Inventory Table ── */}
      <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 12, padding: 24 }}>
        <h3 style={{ margin: '0 0 20px', color: '#e8c96a', fontSize: 16, fontWeight: 800 }}>📋 Current Inventory ({cars.length})</h3>
        {loading ? (
          <div style={{ color: '#666', textAlign: 'center', padding: 32 }}>Loading…</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  {['Vehicle', 'VIN', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0 12px 12px 0', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <React.Fragment key={car._id}>
                    <tr style={{ borderBottom: '1px solid #1f1f1f' }}>
                      <td style={{ padding: '14px 12px 14px 0', color: '#fff', fontSize: 14, fontWeight: 600 }}>{car.year} {car.make} {car.model}</td>
                      <td style={{ padding: '14px 12px 14px 0', color: '#555', fontSize: 12, fontFamily: 'monospace' }}>{car.vin}</td>
                      <td style={{ padding: '14px 12px 14px 0', color: '#4ade80', fontWeight: 700 }}>${(car.price || 0).toLocaleString()}</td>
                      <td style={{ padding: '14px 12px 14px 0' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 12, background: (stockColors[car.stockStatus] || '#555') + '22', color: stockColors[car.stockStatus] || '#888', border: `1px solid ${stockColors[car.stockStatus] || '#555'}` }}>
                          {car.stockStatus || 'available'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 0' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => { setEditingCar(car); setEditForm({ price: car.price, stockStatus: car.stockStatus, color: car.color, fuelType: car.fuelType }); }} style={{ padding: '6px 14px', background: '#1e3a5f', color: '#60a5fa', border: '1px solid #2563eb', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Edit</button>
                          
                        </div>
                      </td>
                    </tr>

                    {/* Inline edit row (Feature 16) */}
                    {editingCar?._id === car._id && (
                      <tr style={{ background: '#111' }}>
                        <td colSpan={5} style={{ padding: '20px 0' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
                            <div>
                              <label style={labelStyle}>Price</label>
                              <input type="number" value={editForm.price || ''} onChange={e => setEditForm(p => ({ ...p, price: e.target.value }))} style={inputStyle} />
                            </div>
                            <div>
                              <label style={labelStyle}>Stock Status</label>
                              <select value={editForm.stockStatus || 'available'} onChange={e => setEditForm(p => ({ ...p, stockStatus: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="available">Available</option>
                                <option value="reserved">Reserved</option>
                                <option value="sold">Sold</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>
                            <div>
                              <label style={labelStyle}>Color</label>
                              <input value={editForm.color || ''} onChange={e => setEditForm(p => ({ ...p, color: e.target.value }))} style={inputStyle} />
                            </div>
                            <div>
                              <label style={labelStyle}>Fuel Type</label>
                              <input value={editForm.fuelType || ''} onChange={e => setEditForm(p => ({ ...p, fuelType: e.target.value }))} style={inputStyle} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={handleUpdate} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #166534, #22c55e)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 800, fontSize: 13 }}>💾 Save Changes</button>
                            <button onClick={() => setEditingCar(null)} style={{ padding: '10px 18px', background: '#2a2a2a', color: '#888', border: '1px solid #333', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
                            <button onClick={() => handleDelete(car, true)} style={{ padding: '6px 14px', background: '#2a2006', color: '#facc15', border: '1px solid #ca8a04', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Archive</button>
                            <button onClick={() => handleDelete(car, false)} style={{ padding: '6px 14px', background: '#2b0d0d', color: '#f87171', border: '1px solid #ef4444', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Delete</button>

                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN ADMIN DASHBOARD ──────────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', fontFamily: "'Helvetica Neue', Arial, sans-serif", color: '#fff' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #222', padding: '0 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e8c96a' }} />
            <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>AutoDealer</span>
            <span style={{ color: '#555', fontSize: 13, marginLeft: 4 }}>Admin Console</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👤</div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '0 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 8, paddingTop: 16, paddingBottom: 0 }}>
          <Tab label="📊 Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <Tab label="🚗 Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px' }}>
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'inventory' && <InventoryManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;
