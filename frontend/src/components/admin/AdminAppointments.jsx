// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';
import moment from 'moment';

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await API.get('/admin/getAllAppointments');
            if (res.data.success) setAppointments(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

    const getStatusBadge = (status) => {
        const map = {
            pending: { class: 'badge-pending', icon: '⏳' },
            approved: { class: 'badge-approved', icon: '✅' },
            rejected: { class: 'badge-rejected', icon: '❌' },
        };
        return map[status] || map.pending;
    };

    return (
        <Layout title="All Appointments">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2 className="page-title">All Appointments</h2>
                        <p className="page-subtitle">{appointments.length} total appointments</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['all', 'pending', 'approved', 'rejected'].map(f => (
                            <button
                                key={f}
                                className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setFilter(f)}
                                style={{ textTransform: 'capitalize' }}
                            >
                                {f} ({f === 'all' ? appointments.length : appointments.filter(a => a.status === f).length})
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
                            <p>Loading appointments...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📅</div>
                            <div className="empty-state-title">No appointments found</div>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Patient</th>
                                        <th>Doctor</th>
                                        <th>Specialization</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Fees</th>
                                        <th>Document</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((appt, idx) => {
                                        const badge = getStatusBadge(appt.status);
                                        return (
                                            <tr key={appt._id}>
                                                <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{idx + 1}</td>
                                                <td>
                                                    <div style={{ fontWeight: 600 }}>{appt.userInfo?.name}</div>
                                                    <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{appt.userInfo?.email}</div>
                                                </td>
                                                <td>
                                                    <div style={{ fontWeight: 600 }}>Dr. {appt.doctorInfo?.fullname}</div>
                                                </td>
                                                <td><span style={{ color: 'var(--primary)', fontWeight: 500 }}>{appt.doctorInfo?.specialization}</span></td>
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
                                                        {badge.icon} {appt.status}
                                                    </span>
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

export default AdminAppointments;
