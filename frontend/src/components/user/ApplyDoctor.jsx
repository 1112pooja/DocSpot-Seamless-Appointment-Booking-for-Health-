// @ts-nocheck
import React, { useState } from 'react';
import Layout from '../common/Layout';
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';

const SPECIALIZATIONS = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist',
    'Orthopedic', 'Pediatrician', 'Psychiatrist', 'Gynecologist',
    'Ophthalmologist', 'ENT Specialist', 'Dentist', 'Urologist',
];

const ApplyDoctor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '', email: '', phone: '', address: '',
        specialization: '', experience: '', fees: '',
        timings: ['09:00', '17:00'],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleTimingChange = (idx, val) => {
        const t = [...formData.timings];
        t[idx] = val;
        setFormData({ ...formData, timings: t });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/user/apply-doctor', {
                ...formData,
                experience: Number(formData.experience),
                fees: Number(formData.fees),
            });
            if (res.data.success) {
                setSuccess('Application submitted! Awaiting admin approval.');
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Apply as Doctor">
            <div className="page-header">
                <h2 className="page-title">Apply as Doctor</h2>
                <p className="page-subtitle">Fill in your details to apply for a doctor account</p>
            </div>

            <div className="card-section" style={{ maxWidth: 800 }}>
                <div className="card-section-header">
                    <div className="card-section-title">🩺 Doctor Application Form</div>
                    <span className="badge badge-pending">⏳ Requires Admin Approval</span>
                </div>
                <div className="card-section-body">
                    {error && (
                        <div style={{
                            background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                            borderRadius: 8, padding: '12px 16px', fontSize: 14, marginBottom: 20,
                        }}>
                            ⚠️ {error}
                        </div>
                    )}
                    {success && (
                        <div style={{
                            background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a',
                            borderRadius: 8, padding: '12px 16px', fontSize: 14, marginBottom: 20,
                        }}>
                            ✅ {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gray-700)', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--gray-200)' }}>
                            Personal Information
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input className="form-control" name="fullname" placeholder="Dr. John Smith"
                                    value={formData.fullname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input type="email" className="form-control" name="email" placeholder="doctor@example.com"
                                    value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Phone *</label>
                                <input className="form-control" name="phone" placeholder="9876543210"
                                    value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Address *</label>
                                <input className="form-control" name="address" placeholder="City, State"
                                    value={formData.address} onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gray-700)', margin: '8px 0 12px', paddingBottom: 8, borderBottom: '1px solid var(--gray-200)' }}>
                            Professional Information
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Specialization *</label>
                                <select className="form-control" name="specialization"
                                    value={formData.specialization} onChange={handleChange} required>
                                    <option value="">Select Specialization</option>
                                    {SPECIALIZATIONS.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Experience (years) *</label>
                                <input type="number" className="form-control" name="experience" placeholder="5"
                                    min="0" value={formData.experience} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Consultation Fees (₹) *</label>
                                <input type="number" className="form-control" name="fees" placeholder="500"
                                    min="0" value={formData.fees} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Working Hours</label>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <input type="time" className="form-control" value={formData.timings[0]}
                                        onChange={(e) => handleTimingChange(0, e.target.value)} />
                                    <span style={{ color: 'var(--gray-500)', fontWeight: 600 }}>to</span>
                                    <input type="time" className="form-control" value={formData.timings[1]}
                                        onChange={(e) => handleTimingChange(1, e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                            <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
                                ← Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? '⏳ Submitting...' : '🩺 Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ApplyDoctor;
