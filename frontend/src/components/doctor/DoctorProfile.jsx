// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';

const specializations = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist',
    'Orthopedic', 'Pediatrician', 'Psychiatrist', 'Gynecologist',
    'Ophthalmologist', 'ENT Specialist', 'Urologist', 'Gastroenterologist',
    'Oncologist', 'Endocrinologist', 'Pulmonologist', 'Radiologist',
];

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        specialization: '',
        experience: '',
        fees: '',
        timings: ['09:00', '17:00'],
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get('/doctor/getDoctorProfile');
            if (res.data.success) {
                const doc = res.data.data;
                setDoctor(doc);
                setFormData({
                    fullname: doc.fullname || '',
                    email: doc.email || '',
                    phone: doc.phone || '',
                    address: doc.address || '',
                    specialization: doc.specialization || '',
                    experience: doc.experience || '',
                    fees: doc.fees || '',
                    timings: doc.timings || ['09:00', '17:00'],
                });
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess('');
        setError('');
    };

    const handleTimingChange = (index, value) => {
        const timings = [...formData.timings];
        timings[index] = value;
        setFormData({ ...formData, timings });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess('');
        setError('');
        try {
            const res = await API.put('/doctor/updateDoctorProfile', formData);
            if (res.data.success) {
                setSuccess('✅ Profile updated successfully!');
                fetchProfile();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout title="My Profile">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading profile...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="My Profile">
            <div className="page-header">
                <h2 className="page-title">Doctor Profile</h2>
                <p className="page-subtitle">Manage your professional information and availability</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
                {/* Profile Summary Card */}
                <div className="card-section" style={{ height: 'fit-content' }}>
                    <div className="card-section-body" style={{ textAlign: 'center', padding: '32px 20px' }}>
                        <div style={{
                            width: 96, height: 96,
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            borderRadius: '50%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: 'white', fontWeight: 800,
                            fontSize: 36, margin: '0 auto 16px', boxShadow: 'var(--shadow-md)',
                        }}>
                            {doctor?.fullname?.charAt(0)?.toUpperCase()}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--gray-900)' }}>
                            Dr. {doctor?.fullname}
                        </div>
                        <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 14, marginTop: 4 }}>
                            {doctor?.specialization}
                        </div>
                        <span
                            className={`badge badge-${doctor?.status}`}
                            style={{ marginTop: 12, display: 'inline-flex' }}
                        >
                            {doctor?.status === 'approved' ? '✅ Approved' :
                                doctor?.status === 'pending' ? '⏳ Pending Approval' : '❌ Rejected'}
                        </span>

                        <div style={{ marginTop: 24, textAlign: 'left' }}>
                            {[
                                { icon: '📧', label: 'Email', value: doctor?.email },
                                { icon: '📞', label: 'Phone', value: doctor?.phone },
                                { icon: '🏆', label: 'Experience', value: `${doctor?.experience} years` },
                                { icon: '💰', label: 'Fees', value: `₹${doctor?.fees}` },
                                { icon: '🕐', label: 'Timings', value: `${doctor?.timings?.[0]} - ${doctor?.timings?.[1]}` },
                            ].map(item => (
                                <div key={item.label} style={{
                                    display: 'flex', gap: 10, alignItems: 'flex-start',
                                    marginBottom: 12, padding: '8px 0',
                                    borderBottom: '1px solid var(--gray-100)',
                                }}>
                                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            {item.label}
                                        </div>
                                        <div style={{ fontSize: 13, color: 'var(--gray-700)', fontWeight: 500, marginTop: 1 }}>
                                            {item.value || '—'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="card-section">
                    <div className="card-section-header">
                        <div className="card-section-title">✏️ Edit Profile</div>
                    </div>
                    <div className="card-section-body">
                        {success && (
                            <div style={{
                                background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a',
                                borderRadius: 10, padding: '12px 18px', marginBottom: 20, fontSize: 14,
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}>
                                {success}
                            </div>
                        )}
                        {error && (
                            <div style={{
                                background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                                borderRadius: 10, padding: '12px 18px', marginBottom: 20, fontSize: 14,
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Personal Info */}
                            <div style={{
                                fontSize: 12, fontWeight: 700, color: 'var(--gray-400)',
                                textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16,
                            }}>
                                Personal Information
                            </div>
                            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        className="form-control"
                                        placeholder="Dr. John Doe"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="doctor@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        placeholder="Clinic / Hospital address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div style={{
                                fontSize: 12, fontWeight: 700, color: 'var(--gray-400)',
                                textTransform: 'uppercase', letterSpacing: '1px',
                                marginTop: 8, marginBottom: 16,
                            }}>
                                Professional Information
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">Specialization *</label>
                                    <select
                                        name="specialization"
                                        className="form-control"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        required
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <option value="">Select Specialization</option>
                                        {specializations.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Experience (years) *</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        className="form-control"
                                        placeholder="e.g. 5"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        min="0"
                                        max="60"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Consultation Fees (₹) *</label>
                                    <input
                                        type="number"
                                        name="fees"
                                        className="form-control"
                                        placeholder="e.g. 500"
                                        value={formData.fees}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Timings */}
                            <div style={{
                                fontSize: 12, fontWeight: 700, color: 'var(--gray-400)',
                                textTransform: 'uppercase', letterSpacing: '1px',
                                marginTop: 8, marginBottom: 16,
                            }}>
                                Availability Timings
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">🕐 From</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={formData.timings[0]}
                                        onChange={(e) => handleTimingChange(0, e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">🕐 To</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={formData.timings[1]}
                                        onChange={(e) => handleTimingChange(1, e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                    style={{ padding: '12px 28px' }}
                                >
                                    {saving ? '⏳ Saving...' : '💾 Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={fetchProfile}
                                    style={{ padding: '12px 24px' }}
                                >
                                    ↺ Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DoctorProfile;
