// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ users: 0, doctors: 0, appointments: 0, pending: 0 });
    const [recentDoctors, setRecentDoctors] = useState([]);
    const [recentAppts, setRecentAppts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, doctorsRes, apptsRes] = await Promise.all([
                API.get('/admin/getAllUsers'),
                API.get('/admin/getAllDoctors'),
                API.get('/admin/getAllAppointments'),
            ]);
            const users = usersRes.data.data || [];
            const doctors = doctorsRes.data.data || [];
            const appts = apptsRes.data.data || [];
            setStats({
                users: users.length,
                doctors: doctors.filter(d => d.status === 'approved').length,
                appointments: appts.length,
                pending: doctors.filter(d => d.status === 'pending').length,
            });
            setRecentDoctors(doctors.slice(0, 4));
            setRecentAppts(appts.slice(0, 5));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Admin Dashboard">
            <div className="page-header">
                <h2 className="page-title">Welcome, Admin! 👋</h2>
                <p className="page-subtitle">Here's what's happening with your platform today</p>
            </div>

            <div className="stats-grid">
                {[
                    { label: 'Total Users', value: stats.users, icon: '👥', color: 'blue' },
                    { label: 'Active Doctors', value: stats.doctors, icon: '👨‍⚕️', color: 'green' },
                    { label: 'Appointments', value: stats.appointments, icon: '📅', color: 'purple' },
                    { label: 'Pending Approvals', value: stats.pending, icon: '⏳', color: 'orange' },
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Recent Doctor Applications */}
                <div className="card-section">
                    <div className="card-section-header">
                        <div className="card-section-title">🩺 Recent Doctor Applications</div>
                        <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/doctors')}>
                            View All
                        </button>
                    </div>
                    <div className="card-section-body" style={{ padding: 0 }}>
                        {recentDoctors.length === 0 ? (
                            <div className="empty-state" style={{ padding: '30px 20px' }}>
                                <div className="empty-state-title">No applications yet</div>
                            </div>
                        ) : (
                            recentDoctors.map(doc => (
                                <div key={doc._id} style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '14px 20px', borderBottom: '1px solid var(--gray-100)',
                                }}>
                                    <div style={{
                                        width: 42, height: 42, background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 700, fontSize: 16,
                                    }}>
                                        {doc.fullname?.charAt(0)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>Dr. {doc.fullname}</div>
                                        <div style={{ color: 'var(--gray-500)', fontSize: 12 }}>{doc.specialization}</div>
                                    </div>
                                    <span className={`badge badge-${doc.status}`}>
                                        {doc.status === 'pending' ? '⏳' : doc.status === 'approved' ? '✅' : '❌'}
                                        {' '}{doc.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Appointments */}
                <div className="card-section">
                    <div className="card-section-header">
                        <div className="card-section-title">📅 Recent Appointments</div>
                        <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/appointments')}>
                            View All
                        </button>
                    </div>
                    <div className="card-section-body" style={{ padding: 0 }}>
                        {recentAppts.length === 0 ? (
                            <div className="empty-state" style={{ padding: '30px 20px' }}>
                                <div className="empty-state-title">No appointments yet</div>
                            </div>
                        ) : (
                            recentAppts.map(appt => (
                                <div key={appt._id} style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '14px 20px', borderBottom: '1px solid var(--gray-100)',
                                }}>
                                    <div style={{ fontSize: 20 }}>📅</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{appt.userInfo?.name}</div>
                                        <div style={{ color: 'var(--gray-500)', fontSize: 12 }}>
                                            Dr. {appt.doctorInfo?.fullname} • {appt.date}
                                        </div>
                                    </div>
                                    <span className={`badge badge-${appt.status}`}>{appt.status}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card-section" style={{ marginTop: 24 }}>
                <div className="card-section-header">
                    <div className="card-section-title">⚡ Quick Actions</div>
                </div>
                <div className="card-section-body">
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        {[
                            { label: 'Manage Doctors', icon: '👨‍⚕️', path: '/admin/doctors', color: 'btn-primary' },
                            { label: 'Manage Users', icon: '👥', path: '/admin/users', color: 'btn-success' },
                            { label: 'View Appointments', icon: '📅', path: '/admin/appointments', color: 'btn-outline' },
                        ].map(action => (
                            <button
                                key={action.path}
                                className={`btn ${action.color}`}
                                onClick={() => navigate(action.path)}
                            >
                                {action.icon} {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
