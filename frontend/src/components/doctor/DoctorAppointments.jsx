// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';
import moment from 'moment';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [updating, setUpdating] = useState(null);
    const [toast, setToast] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await API.get('/doctor/getDoctorAppointments');
            if (res.data.success) setAppointments(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (appointmentId, status) => {
        setUpdating(appointmentId + status);
        try {
            const res = await API.post('/doctor/updateAppointmentStatus', { appointmentId, status });
            if (res.data.success) {
                showToast(status === 'approved' ? '✅ Appointment approved!' : '❌ Appointment rejected.');
                fetchAppointments();
            }
        } catch (err) {
            console.error(err);
            showToast('⚠️ Failed to update status.');
        } finally {
            setUpdating(null);
        }
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const filtered = filter === 'all'
        ? appointments
        : appointments.filter(a => a.status === filter);

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'pending').length,
        approved: appointments.filter(a => a.status === 'approved').length,
        rejected: appointments.filter(a => a.status === 'rejected').length,
    };

    const getStatusBadge = (status) => {
        const map = {
            pending: { cls: 'badge-pending', icon: '⏳', label: 'Pending' },
            approved: { cls: 'badge-approved', icon: '✅', label: 'Approved' },
            rejected: { cls: 'badge-rejected', icon: '❌', label: 'Rejected' },
        };
        return map[status] || map.pending;
    };

    return (
        <Layout title="Manage Appointments">
            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', top: 24, right: 24, zIndex: 9999,
                    background: 'var(--gray-900)', color: 'white',
                    padding: '14px 24px', borderRadius: 12,
                    boxShadow: 'var(--shadow-xl)', fontSize: 14, fontWeight: 500,
                    animation: 'slideUp 0.3s ease',
                }}>
                    {toast}
                </div>
            )}

            <div className="page-header">
                <h2 className="page-title">Manage Appointments</h2>
                <p className="page-subtitle">Review and manage your patient appointments</p>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 28 }}>
                {[
                    { label: 'Total', value: stats.total, icon: '📅', color: 'blue' },
                    { label: 'Pending', value: stats.pending, icon: '⏳', color: 'orange' },
                    { label: 'Approved', value: stats.approved, icon: '✅', color: 'green' },
                    { label: 'Rejected', value: stats.rejected, icon: '❌', color: 'red' },
                ].map(stat => (
                    <div key={stat.label} className={`stat-card ${stat.color}`}>
                        <div className="stat-card-header">
                            <div className="stat-card-icon">{stat.icon}</div>
                        </div>
                        <div className="stat-card-value">{stat.value}</div>
                        <div className="stat-card-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="card-section">
                <div className="card-section-header">
                    <div className="card-section-title">📋 Appointments</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['all', 'pending', 'approved', 'rejected'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={filter === f ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
                                style={{ textTransform: 'capitalize' }}
                            >
                                {f === 'all' ? '📋 All' :
                                    f === 'pending' ? '⏳ Pending' :
                                        f === 'approved' ? '✅ Approved' : '❌ Rejected'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="card-section-body" style={{ padding: 0 }}>
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading appointments...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📅</div>
                            <div className="empty-state-title">No appointments found</div>
                            <div className="empty-state-sub">
                                {filter === 'all' ? 'No appointments have been booked yet.' : `No ${filter} appointments.`}
                            </div>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Patient</th>
                                        <th>Contact</th>
                                        <th>Date & Time</th>
                                        <th>Document</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((appt, idx) => {
                                        const badge = getStatusBadge(appt.status);
                                        return (
                                            <tr key={appt._id}>
                                                <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{idx + 1}</td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <div style={{
                                                            width: 36, height: 36,
                                                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                                            borderRadius: '50%', display: 'flex', alignItems: 'center',
                                                            justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14,
                                                            flexShrink: 0,
                                                        }}>
                                                            {appt.userInfo?.name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: 14 }}>
                                                                {appt.userInfo?.name}
                                                            </div>
                                                            <div style={{ color: 'var(--gray-500)', fontSize: 12 }}>
                                                                {appt.userInfo?.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>
                                                        {appt.userInfo?.phone || '—'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ fontWeight: 600, color: 'var(--gray-800)', fontSize: 14 }}>
                                                        {moment(appt.date).format('DD MMM YYYY')}
                                                    </div>
                                                    <div style={{ color: 'var(--gray-500)', fontSize: 12 }}>
                                                        {appt.time || 'Time not specified'}
                                                    </div>
                                                </td>
                                                <td>
                                                    {appt.document ? (
                                                        <a
                                                            href={`http://localhost:5000/uploads/${appt.document}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="btn btn-outline btn-sm"
                                                        >
                                                            📎 View
                                                        </a>
                                                    ) : (
                                                        <span style={{ color: 'var(--gray-400)', fontSize: 13 }}>—</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <span className={`badge ${badge.cls}`}>
                                                        {badge.icon} {badge.label}
                                                    </span>
                                                </td>
                                                <td>
                                                    {appt.status === 'pending' ? (
                                                        <div style={{ display: 'flex', gap: 8 }}>
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => handleStatusUpdate(appt._id, 'approved')}
                                                                disabled={updating === appt._id + 'approved'}
                                                                title="Approve"
                                                            >
                                                                {updating === appt._id + 'approved' ? '...' : '✅ Approve'}
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleStatusUpdate(appt._id, 'rejected')}
                                                                disabled={updating === appt._id + 'rejected'}
                                                                title="Reject"
                                                            >
                                                                {updating === appt._id + 'rejected' ? '...' : '✕ Reject'}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span style={{ color: 'var(--gray-400)', fontSize: 13 }}>
                                                            {appt.status === 'approved' ? 'Approved ✓' : 'Rejected ✗'}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DoctorAppointments;
