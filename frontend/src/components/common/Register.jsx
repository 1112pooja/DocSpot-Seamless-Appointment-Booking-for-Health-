// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../utils/API';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        type: 'user',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/user/register', formData);
            if (res.data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left Panel */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: 56, marginBottom: 20 }}>👤</div>
                    <div className="auth-left-title">Join DocSpot</div>
                    <div className="auth-left-sub">
                        Create your account and start booking appointments with the best doctors in your area.
                    </div>
                    <div className="auth-feature-list">
                        {[
                            { icon: '✅', text: 'Free account creation' },
                            { icon: '🩺', text: 'Apply to become a doctor' },
                            { icon: '🔒', text: 'Secure and private platform' },
                            { icon: '📱', text: 'Access from any device' },
                        ].map((f) => (
                            <div key={f.text} className="auth-feature-item">
                                <div className="auth-feature-item-icon">{f.icon}</div>
                                {f.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="auth-right">
                <div className="auth-box">
                    <div className="auth-box-logo">
                        <div className="auth-box-logo-icon">🏥</div>
                        <div className="auth-box-logo-text">DocSpot</div>
                    </div>

                    <h2 className="auth-box-title">Create Account</h2>
                    <p className="auth-box-sub">Join thousands of patients using DocSpot</p>

                    {error && (
                        <div style={{
                            background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                            borderRadius: 8, padding: '12px 16px', fontSize: 14, marginBottom: 20,
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a',
                            borderRadius: 8, padding: '12px 16px', fontSize: 14, marginBottom: 20,
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            ✅ {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    placeholder="1234567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Choose a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Account Type</label>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="user"
                                        checked={formData.type === 'user'}
                                        onChange={handleChange}
                                    />
                                    👤 Patient / User
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="admin"
                                        checked={formData.type === 'admin'}
                                        onChange={handleChange}
                                    />
                                    🛡️ Admin
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            style={{ padding: '14px', marginTop: 4, fontSize: 15 }}
                            disabled={loading}
                        >
                            {loading ? '⏳ Creating account...' : '✨ Create Account'}
                        </button>
                    </form>

                    <div className="auth-divider" style={{ marginTop: 24 }}>
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </div>
                    <div className="auth-divider" style={{ marginTop: 8 }}>
                        <Link to="/home">← Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
