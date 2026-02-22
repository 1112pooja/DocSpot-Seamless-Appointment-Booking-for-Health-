// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';
import moment from 'moment';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState({ date: '', time: '' });
    const [document, setDocument] = useState(null);
    const [booking, setBooking] = useState(false);
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [docRes, userRes, apptRes] = await Promise.all([
                API.get('/user/getAllDoctors'),
                API.get('/user/getUserData'),
                API.get('/user/get-user-appointments'),
            ]);
            if (docRes.data.success) setDoctors(docRes.data.data);
            if (userRes.data.success) setUser(userRes.data.data);
            if (apptRes.data.success) {
                const appts = apptRes.data.data;
                setStats({
                    total: appts.length,
                    pending: appts.filter(a => a.status === 'pending').length,
                    approved: appts.filter(a => a.status === 'approved').length,
                    rejected: appts.filter(a => a.status === 'rejected').length,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredDoctors = doctors.filter(doc =>
        doc.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization?.toLowerCase().includes(search.toLowerCase())
    );

    const openBookingModal = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
        setBookingData({ date: '', time: '' });
        setDocument(null);
        setSuccess('');
    };

    const handleBook = async (e) => {
        e.preventDefault();
        if (!bookingData.date) return;
        setBooking(true);
        try {
            const formData = new FormData();
            formData.append('doctorId', selectedDoctor._id);
            formData.append('doctorInfo', JSON.stringify(selectedDoctor));
            formData.append('userInfo', JSON.stringify(user));
            formData.append('date', bookingData.date);
            formData.append('time', bookingData.time);
            if (document) formData.append('document', document);

            const res = await API.post('/user/book-appointment', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.success) {
                setSuccess('Appointment booked successfully!');
                fetchData();
                setTimeout(() => setShowModal(false), 1500);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setBooking(false);
        }
    };

    return (
        <Layout title="Find Doctors">
            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 28 }}>
                {[
                    { label: 'Total Appointments', value: stats.total, icon: '📅', color: 'blue' },
                    { label: 'Pending', value: stats.pending, icon: '⏳', color: 'orange' },
                    { label: 'Approved', value: stats.approved, icon: '✅', color: 'green' },
                    { label: 'Rejected', value: stats.rejected, icon: '❌', color: 'red' },
                ].map(stat => (
                    <div key={stat.label} className={`stat-card ${stat.color}`}>
                        <div className="stat-card-header">
                            <div className={`stat-card-icon`}>{stat.icon}</div>
                        </div>
                        <div className="stat-card-value">{stat.value}</div>
                        <div className="stat-card-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="card-section">
                <div className="card-section-header">
                    <div className="card-section-title">👨‍⚕️ Available Doctors ({filteredDoctors.length})</div>
                    <div className="search-box" style={{ width: 280 }}>
                        <span className="search-icon">🔍</span>
                        <input
                            placeholder="Search doctors or specialization..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="card-section-body">
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading doctors...</p>
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">👨‍⚕️</div>
                            <div className="empty-state-title">No doctors found</div>
                            <div className="empty-state-sub">Try a different search term</div>
                        </div>
                    ) : (
                        <div className="doctors-grid">
                            {filteredDoctors.map((doc) => (
                                <div key={doc._id} className="doctor-card">
                                    <div className="doctor-card-banner">
                                        <div className="doctor-card-avatar">
                                            {doc.fullname?.charAt(0)?.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="doctor-card-body">
                                        <div className="doctor-card-name">Dr. {doc.fullname}</div>
                                        <div className="doctor-card-specialty">{doc.specialization}</div>
                                        <div className="doctor-card-info">
                                            <div className="doctor-card-info-item">
                                                <span>📍</span>
                                                <span>{doc.address}</span>
                                            </div>
                                            <div className="doctor-card-info-item">
                                                <span>📞</span>
                                                <span>{doc.phone}</span>
                                            </div>
                                            <div className="doctor-card-info-item">
                                                <span>💰</span>
                                                <span>₹{doc.fees} per consultation</span>
                                            </div>
                                            <div className="doctor-card-info-item">
                                                <span>🏆</span>
                                                <span>{doc.experience} years experience</span>
                                            </div>
                                            <div className="doctor-card-info-item">
                                                <span>🕐</span>
                                                <span>{doc.timings?.[0]} - {doc.timings?.[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="doctor-card-footer">
                                        <button
                                            className="btn btn-primary btn-full"
                                            onClick={() => openBookingModal(doc)}
                                        >
                                            📅 Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && selectedDoctor && (
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="modal-box">
                        <div className="modal-header">
                            <div className="modal-title">Book Appointment</div>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div style={{
                                background: 'var(--primary-light)', borderRadius: 12, padding: '16px 20px',
                                marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14,
                            }}>
                                <div style={{
                                    width: 52, height: 52, background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 22, fontWeight: 700, color: 'white',
                                }}>
                                    {selectedDoctor.fullname?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 16 }}>Dr. {selectedDoctor.fullname}</div>
                                    <div style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>{selectedDoctor.specialization}</div>
                                    <div style={{ color: 'var(--gray-600)', fontSize: 12 }}>💰 ₹{selectedDoctor.fees} • 🏆 {selectedDoctor.experience} yrs exp</div>
                                </div>
                            </div>

                            {success && (
                                <div style={{
                                    background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a',
                                    borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14,
                                }}>
                                    ✅ {success}
                                </div>
                            )}

                            <form onSubmit={handleBook}>
                                <div className="form-group">
                                    <label className="form-label">Appointment Date *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={bookingData.date}
                                        min={moment().format('YYYY-MM-DD')}
                                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Preferred Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={bookingData.time}
                                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Upload Document (optional)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => setDocument(e.target.files[0])}
                                    />
                                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>
                                        Accepted: PDF, JPG, PNG (max 5MB)
                                    </div>
                                </div>
                                <div className="modal-footer" style={{ padding: 0, marginTop: 8 }}>
                                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={booking}>
                                        {booking ? '⏳ Booking...' : '📅 Confirm Booking'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default DoctorList;
