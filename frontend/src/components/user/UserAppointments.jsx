// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';
import moment from 'moment';

const UserAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await API.get('/user/get-user-appointments');
            if (res.data.success) setAppointments(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            const res = await API.delete(`/user/cancel-appointment/${id}`);
            if (res.data.success) fetchAppointments();
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            pending: { class: 'badge-pending', icon: '⏳', label: 'Pending' },
            approved: { class: 'badge-approved', icon: '✅', label: 'Approved' },
            rejected: { class: 'badge-rejected', icon: '❌', label: 'Rejected' },
        };
        return map[status] || map.pending;
    };

    return (
        <Layout title="My Appointments">
            <div className="page-header">
                <h2 className="page-title">My Appointments</h2>
                <p className="page-subtitle">{appointments.length} total appointments</p>
            </div>

            <div className="card-section">
                <div className="card-section-header">
                    <div className="card-section-title">📅 Appointment History</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                            <span key={f} className={`badge badge-${f === 'Pending' ? 'pending' : f === 'Approved' ? 'approved' : f === 'Rejected' ? 'rejected' : 'user'}`}
                                style={{ cursor: 'pointer', padding: '5px 12px' }}>
                                {f}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="card-section-body" style={{ padding: 0 }}>
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading appointments...</p>
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📅</div>
                            <div className="empty-state-title">No appointments yet</div>
                            <div className="empty-state-sub">Book your first appointment from the doctor list</div>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Doctor</th>
                                        <th>Specialization</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Fees</th>
                                        <th>Document</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appt, idx) => {
                                        const badge = getStatusBadge(appt.status);
                                        return (
                                            <tr key={appt._id}>
                                                <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{idx + 1}</td>
                                                <td>
                                                    <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                                                        Dr. {appt.doctorInfo?.fullname}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span style={{ color: 'var(--primary)', fontWeight: 500 }}>
                                                        {appt.doctorInfo?.specialization}
                                                    </span>
                                                </td>
                                                <td>{moment(appt.date).format('DD MMM YYYY')}</td>
                                                <td>{appt.time || '—'}</td>
                                                <td>₹{appt.doctorInfo?.fees}</td>
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
                                                    ) : '—'}
                                                </td>
                                                <td>
                                                    <span className={`badge ${badge.class}`}>
                                                        {badge.icon} {badge.label}
                                                    </span>
                                                </td>
                                                <td>
                                                    {appt.status === 'pending' && (
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleCancel(appt._id)}
                                                        >
                                                            ✕ Cancel
                                                        </button>
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

export default UserAppointments;
