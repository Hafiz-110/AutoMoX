import { useEffect, useState } from 'react';
import API from '../api';

const AdminVerification = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDocs = async () => {
        try {
            const res = await API.get('/api/admin/pending-verifications');
            setDocs(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadDocs(); }, []);

    const handleUpdate = async (id, status) => {
        try {
            await API.patch(`/api/admin/update-status/${id}`, { status });
            alert(`Document ${status} successfully!`);
            loadDocs(); // Reload the list to remove the processed item
        } catch (err) {
            alert("Action failed. Check console for details.");
        }
    };

    if (loading) return <div style={{ color: '#d946ef', padding: '40px', textAlign: 'center' }}>Syncing with Database...</div>;

    return (
        <div style={{ padding: '20px', textAlign: 'left', color: 'white', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#d946ef', margin: 0 }}>🛡️ Admin: Purchase Verification</h2>
                <button onClick={loadDocs} style={{ background: 'transparent', border: '1px solid #d946ef', color: '#d946ef', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                    🔄 Refresh
                </button>
            </div>
            
            {docs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', background: '#1e1e1e', borderRadius: '10px', border: '1px dashed #444' }}>
                    <p style={{ color: '#888' }}>✨ All caught up! No documents pending review.</p>
                </div>
            ) : (
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#1e1e1e' }}>
                        <thead>
                            <tr style={{ background: '#333', color: '#d946ef', textAlign: 'left' }}>
                                <th style={{ padding: '15px' }}>User Name</th>
                                <th style={{ padding: '15px' }}>Document Type</th>
                                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map(doc => (
                                <tr key={doc._id} style={{ borderBottom: '1px solid #333' }} className="admin-table-row">
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>
                                        {/* LOGIC: 
                                            1. Check if user is an object with a name (Populated from real users collection)
                                            2. If it's just a string, show the string
                                        */}
                                        {typeof doc.user === 'object' && doc.user !== null 
                                            ? doc.user.name 
                                            : (doc.user || "Unknown User")}
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ background: '#2d2d2d', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', color: '#ccc' }}>
                                            {doc.documentType}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <button 
                                            onClick={() => handleUpdate(doc._id, 'Approved')} 
                                            style={{ background: '#22c55e', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px', fontWeight: '600' }}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleUpdate(doc._id, 'Rejected')} 
                                            style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            <style>{`
                .admin-table-row:hover {
                    background-color: #252525 !important;
                    transition: 0.2s ease;
                }
            `}</style>
        </div>
    );
};

export default AdminVerification;