// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../utils/API';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/user/login', formData);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                const user = res.data.user;
                if (user.type === 'admin') {
                    navigate('/admin/dashboard');
                } else if (user.isdoctor) {
                    navigate('/doctor/dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left Panel */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: 56, marginBottom: 20 }}>🏥</div>
                    <div className="auth-left-title">Welcome Back!</div>
                    <div className="auth-left-sub">
                        Sign in to access your DocSpot account and manage your healthcare appointments.
                    </div>
                    <div className="auth-feature-list">
                        {[
                            { icon: '📅', text: 'Book doctor appointments instantly' },
                            { icon: '🔔', text: 'Get real-time appointment notifications' },
                            { icon: '📋', text: 'Access your medical history' },
                            { icon: '👨‍⚕️', text: '500+ verified specialist doctors' },
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

                    <h2 className="auth-box-title">Sign In</h2>
                    <p className="auth-box-sub">Enter your credentials to continue</p>

                    {error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            borderRadius: 8,
                            padding: '12px 16px',
                            fontSize: 14,
                            marginBottom: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            style={{ padding: '14px', marginTop: 8, fontSize: 15 }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                    Signing in...
                                </>
                            ) : '🔐 Sign In'}
                        </button>
                    </form>

                    <div className="auth-divider" style={{ marginTop: 24 }}>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                    <div className="auth-divider" style={{ marginTop: 8 }}>
                        <Link to="/home">← Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
