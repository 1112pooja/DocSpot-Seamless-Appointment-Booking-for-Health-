// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';

const AdminDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await API.get('/admin/getAllDoctors');
            if (res.data.success) setDoctors(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatus = async (doctorId, status) => {
        try {
            const res = await API.post('/admin/changeDoctorStatus', { doctorId, status });
            if (res.data.success) fetchDoctors();
        } catch (err) {
            console.error(err);
        }
    };

    const filtered = filter === 'all' ? doctors : doctors.filter(d => d.status === filter);

    return (
        <Layout title="Manage Doctors">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2 className="page-title">Manage Doctors</h2>
                        <p className="page-subtitle">Review and approve doctor applications</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {[
                            { label: `All (${doctors.length})`, value: 'all' },
                            { label: `Pending (${doctors.filter(d => d.status === 'pending').length})`, value: 'pending' },
                            { label: `Approved (${doctors.filter(d => d.status === 'approved').length})`, value: 'approved' },
                            { label: `Rejected (${doctors.filter(d => d.status === 'rejected').length})`, value: 'rejected' },
                        ].map(f => (
                            <button
                                key={f.value}
                                className={`btn btn-sm ${filter === f.value ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card-section">
                <div className="card-section-body" style={{ padding: 0 }}>
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading doctors...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">👨‍⚕️</div>
                            <div className="empty-state-title">No doctors found</div>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Doctor</th>
                                        <th>Specialization</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Fees</th>
                                        <th>Experience</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((doc, idx) => (
                                        <tr key={doc._id}>
                                            <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{idx + 1}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{
                                                        width: 36, height: 36, background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0,
                                                    }}>
                                                        {doc.fullname?.charAt(0)}
                                                    </div>
                                                    <span style={{ fontWeight: 600 }}>Dr. {doc.fullname}</span>
                                                </div>
                                            </td>
                                            <td><span style={{ color: 'var(--primary)', fontWeight: 500 }}>{doc.specialization}</span></td>
                                            <td>{doc.email}</td>
                                            <td>{doc.phone}</td>
                                            <td>₹{doc.fees}</td>
                                            <td>{doc.experience} yrs</td>
                                            <td>
                                                <span className={`badge badge-${doc.status}`}>
                                                    {doc.status === 'pending' ? '⏳' : doc.status === 'approved' ? '✅' : '❌'}
                                                    {' '}{doc.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 6 }}>
                                                    {doc.status !== 'approved' && (
                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => handleStatus(doc._id, 'approved')}
                                                        >
                                                            ✅ Approve
                                                        </button>
                                                    )}
                                                    {doc.status !== 'rejected' && (
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleStatus(doc._id, 'rejected')}
                                                        >
                                                            ❌ Reject
                                                        </button>
                                                    )}
                                                </div>
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

export default AdminDoctors;
