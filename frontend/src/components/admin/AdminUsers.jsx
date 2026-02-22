// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await API.get('/admin/getAllUsers');
            if (res.data.success) setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return;
        try {
            await API.delete(`/admin/deleteUser/${id}`);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const filtered = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout title="Manage Users">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2 className="page-title">Manage Users</h2>
                        <p className="page-subtitle">{users.length} total users registered</p>
                    </div>
                    <div className="search-box" style={{ width: 280 }}>
                        <span className="search-icon">🔍</span>
                        <input
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="card-section">
                <div className="card-section-body" style={{ padding: 0 }}>
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading users...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">👥</div>
                            <div className="empty-state-title">No users found</div>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Doctor Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((user, idx) => (
                                        <tr key={user._id}>
                                            <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{idx + 1}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{
                                                        width: 36, height: 36,
                                                        background: user.type === 'admin'
                                                            ? 'linear-gradient(135deg, var(--secondary), #9333ea)'
                                                            : user.isdoctor
                                                                ? 'linear-gradient(135deg, var(--success), #059669)'
                                                                : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        color: 'white', fontWeight: 700, fontSize: 14,
                                                    }}>
                                                        {user.name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                    <span style={{ fontWeight: 600 }}>{user.name}</span>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.phone || '—'}</td>
                                            <td>
                                                <span className={`badge badge-${user.type}`}>
                                                    {user.type === 'admin' ? '🛡️ Admin' : '👤 User'}
                                                </span>
                                            </td>
                                            <td>
                                                {user.isdoctor ? (
                                                    <span className="badge badge-doctor">👨‍⚕️ Doctor</span>
                                                ) : (
                                                    <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>—</span>
                                                )}
                                            </td>
                                            <td>
                                                {user.type !== 'admin' && (
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminUsers;
