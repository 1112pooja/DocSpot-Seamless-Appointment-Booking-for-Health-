// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [docRes, apptRes] = await Promise.all([
                API.get('/doctor/getDoctorProfile'),
                API.get('/doctor/getDoctorAppointments'),
            ]);
            if (docRes.data.success) setDoctor(docRes.data.data);
            if (apptRes.data.success) setAppointments(apptRes.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'pending').length,
        approved: appointments.filter(a => a.status === 'approved').length,
        rejected: appointments.filter(a => a.status === 'rejected').length,
    };

    if (loading) {
        return (
            <Layout title="Doctor Dashboard">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Doctor Dashboard">
            <div className="page-header">
                <h2 className="page-title">
                    Welcome, Dr. {doctor?.fullname}! 👋
                </h2>
                <p className="page-subtitle">{doctor?.specialization} • ₹{doctor?.fees} per consultation</p>
            </div>

            {/* Profile Status */}
            {doctor?.status !== 'approved' && (
                <div style={{
                    background: 'linear-gradient(135deg, #fef9c3 0%, #fef3c7 100%)',
                    border: '1px solid #fde68a',
                    borderRadius: 12,
                    padding: '16px 20px',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                }}>
                    <div style={{ fontSize: 24 }}>⏳</div>
                    <div>
                        <div style={{ fontWeight: 700, color: '#92400e' }}>Account Pending Approval</div>
                        <div style={{ fontSize: 14, color: '#a16207', marginTop: 2 }}>
                            Your doctor account is awaiting admin approval. You'll be notified once approved.
                        </div>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="stats-grid">
                {[
                    { label: 'Total Appointments', value: stats.total, icon: '📅', color: 'blue' },
                    { label: 'Pending', value: stats.pending, icon: '⏳', color: 'orange' },
                    { label: 'Approved', value: stats.approved, icon: '✅', color: 'green' },
                    { label: 'Consultation Fee', value: `₹${doctor?.fees || 0}`, icon: '💰', color: 'purple' },
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }}>
                {/* Doctor Profile Card */}
                <div className="card-section">
                    <div className="card-section-header">
                        <div className="card-section-title">👤 My Profile</div>
                        <button className="btn btn-outline btn-sm" onClick={() => navigate('/doctor/profile')}>
                            Edit
                        </button>
                    </div>
                    <div className="card-section-body">
                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            <div style={{
                                width: 80, height: 80, background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontWeight: 700, fontSize: 30, margin: '0 auto 12px',
                            }}>
                                {doctor?.fullname?.charAt(0)}
                            </div>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Dr. {doctor?.fullname}</div>
                            <div style={{ color: 'var(--primary)', fontWeight: 500, fontSize: 14, marginTop: 2 }}>
                                {doctor?.specialization}
                            </div>
                            <span className={`badge badge-${doctor?.status}`} style={{ marginTop: 8, display: 'inline-flex' }}>
                                {doctor?.status === 'approved' ? '✅ Approved' : doctor?.status === 'pending' ? '⏳ Pending' : '❌ Rejected'}
                            </span>
                        </div>
                        {[
                            { icon: '📧', label: 'Email', value: doctor?.email },
                            { icon: '📞', label: 'Phone', value: doctor?.phone },
                            { icon: '📍', label: 'Address', value: doctor?.address },
                            { icon: '🏆', label: 'Experience', value: `${doctor?.experience} years` },
                            { icon: '🕐', label: 'Timings', value: `${doctor?.timings?.[0]} - ${doctor?.timings?.[1]}` },
                        ].map(item => (
                            <div key={item.label} style={{
                                display: 'flex', gap: 10, alignItems: 'flex-start',
                                marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--gray-100)',
                            }}>
                                <span style={{ fontSize: 16, marginTop: 1 }}>{item.icon}</span>
                                <div>
                                    <div style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{item.label}</div>
                                    <div style={{ fontSize: 14, color: 'var(--gray-800)', fontWeight: 500 }}>{item.value || '—'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Appointments */}
                <div className="card-section">
                    <div className="card-section-header">
                        <div className="card-section-title">📅 Recent Appointments</div>
                        <button className="btn btn-outline btn-sm" onClick={() => navigate('/doctor/appointments')}>
                            View All
                        </button>
                    </div>
                    <div className="card-section-body" style={{ padding: 0 }}>
                        {appointments.slice(0, 5).length === 0 ? (
                            <div className="empty-state" style={{ padding: '30px' }}>
                                <div className="empty-state-icon">📅</div>
                                <div className="empty-state-title">No appointments yet</div>
                            </div>
                        ) : (
                            appointments.slice(0, 5).map(appt => (
                                <div key={appt._id} style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '14px 20px', borderBottom: '1px solid var(--gray-100)',
                                }}>
                                    <div style={{ fontSize: 20 }}>👤</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{appt.userInfo?.name}</div>
                                        <div style={{ color: 'var(--gray-500)', fontSize: 12 }}>{appt.date} {appt.time ? `• ${appt.time}` : ''}</div>
                                    </div>
                                    <span className={`badge badge-${appt.status}`}>{appt.status}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DoctorDashboard;
