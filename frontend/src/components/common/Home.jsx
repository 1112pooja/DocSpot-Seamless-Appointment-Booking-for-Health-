// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="landing-nav">
                <a className="landing-logo" href="/home">
                    <div className="landing-logo-icon">🏥</div>
                    DocSpot
                </a>
                <div className="landing-nav-links">
                    <a className="landing-nav-link outline" href="/login">Login</a>
                    <a className="landing-nav-link filled" href="/register">Register</a>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span>🏥</span>
                        Trusted by 10,000+ patients
                    </div>
                    <h1 className="hero-title">
                        Book Your Doctor<br />
                        <span>Appointment</span><br />
                        with Ease
                    </h1>
                    <p className="hero-subtitle">
                        Effortlessly schedule your doctor appointments with just a few clicks,
                        putting your health in your hands. Connect with top specialists in your area.
                    </p>
                    <div className="hero-actions">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/register')}
                        >
                            🩺 Book your Doctor
                        </button>
                        <button
                            className="btn btn-outline btn-lg"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
                        {[
                            { icon: '👨‍⚕️', count: '500+', label: 'Doctors' },
                            { icon: '👥', count: '10K+', label: 'Patients' },
                            { icon: '⭐', count: '4.9', label: 'Rating' },
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)' }}>{stat.count}</div>
                                <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 500 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-img">
                    <div style={{
                        width: 440,
                        height: 360,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'float 4s ease-in-out infinite',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))',
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="440" height="360">
                            {/* Background blob */}
                            <ellipse cx="200" cy="130" rx="165" ry="120" fill="#d6eaf8" opacity="0.85" />

                            {/* ===== CALENDAR ===== */}
                            <rect x="120" y="155" width="160" height="110" rx="6" fill="white" stroke="#c0d6e8" strokeWidth="1.5" />
                            <rect x="120" y="155" width="160" height="28" rx="6" fill="#2196F3" />
                            <rect x="120" y="170" width="160" height="13" fill="#2196F3" />
                            {/* Spiral rings */}
                            {[150, 173, 196, 219, 242].map(cx => (
                                <circle key={cx} cx={cx} cy="155" r="5" fill="none" stroke="#1565C0" strokeWidth="2.5" />
                            ))}
                            {/* Calendar grid rows */}
                            {[188, 209, 230].map((y, ri) => (
                                [128, 153, 178, 203, 228].map((x, ci) => {
                                    const blue = (ri === 0) || (ri === 1 && (ci === 1 || ci === 4)) || (ri === 2 && ci === 2);
                                    return <rect key={`${y}-${x}`} x={x} y={y} width="20" height="16" rx="3" fill={blue ? "#64B5F6" : "#E3F2FD"} />;
                                })
                            ))}
                            {/* Checkmarks in blue cells */}
                            {[128, 153, 178, 203, 228].map(x => (
                                <polyline key={x} points={`${x + 3},196 ${x + 8},200 ${x + 15},192`} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            ))}
                            <polyline points="156,217 161,221 168,213" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="231,217 236,221 243,213" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="181,238 186,242 193,234" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                            {/* ===== HEART with ECG ===== */}
                            <path d="M200 125 C200 125 180 108 168 112 C155 116 150 130 162 140 L200 168 L238 140 C250 130 245 116 232 112 C220 108 200 125 200 125 Z" fill="#E53935" />
                            <polyline points="174,132 182,132 186,120 190,144 194,126 198,132 226,132" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                            {/* ===== DOCTOR (left) ===== */}
                            <ellipse cx="91" cy="267" rx="12" ry="5" fill="#1565C0" />
                            <ellipse cx="109" cy="268" rx="10" ry="4" fill="#1565C0" />
                            <rect x="86" y="230" width="14" height="37" rx="5" fill="#1E88E5" />
                            <rect x="102" y="230" width="13" height="37" rx="5" fill="#1E88E5" />
                            <rect x="78" y="175" width="48" height="65" rx="8" fill="white" stroke="#e0e0e0" strokeWidth="1" />
                            <path d="M102 175 L90 195 L102 185 Z" fill="#e0e0e0" />
                            <path d="M102 175 L114 195 L102 185 Z" fill="#e0e0e0" />
                            <rect x="95" y="175" width="14" height="30" rx="3" fill="#1E88E5" />
                            {/* Right arm + clipboard */}
                            <rect x="126" y="180" width="12" height="50" rx="6" fill="white" stroke="#e0e0e0" strokeWidth="1" />
                            <rect x="132" y="185" width="28" height="38" rx="4" fill="#F5F5F5" stroke="#bdbdbd" strokeWidth="1.2" />
                            <rect x="140" y="181" width="12" height="8" rx="2" fill="#bdbdbd" />
                            <line x1="137" y1="198" x2="155" y2="198" stroke="#90caf9" strokeWidth="1.5" />
                            <line x1="137" y1="205" x2="155" y2="205" stroke="#90caf9" strokeWidth="1.5" />
                            <line x1="137" y1="212" x2="150" y2="212" stroke="#90caf9" strokeWidth="1.5" />
                            {/* Left arm */}
                            <rect x="66" y="180" width="12" height="45" rx="6" fill="white" stroke="#e0e0e0" strokeWidth="1" />
                            {/* Stethoscope */}
                            <path d="M88 190 Q78 205 80 220 Q82 230 90 230" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="90" cy="232" r="5" fill="#555" />
                            <circle cx="90" cy="232" r="2.5" fill="#888" />
                            {/* Head & neck */}
                            <rect x="96" y="158" width="12" height="18" rx="5" fill="#FFCCBC" />
                            <ellipse cx="102" cy="150" rx="18" ry="20" fill="#FFCCBC" />
                            <ellipse cx="102" cy="132" rx="18" ry="10" fill="#5D4037" />
                            <rect x="84" y="132" width="36" height="10" rx="4" fill="#5D4037" />
                            <circle cx="96" cy="150" r="2" fill="#795548" />
                            <circle cx="108" cy="150" r="2" fill="#795548" />
                            <path d="M97 159 Q102 163 107 159" fill="none" stroke="#795548" strokeWidth="1.5" strokeLinecap="round" />

                            {/* ===== PATIENT (right) ===== */}
                            <ellipse cx="295" cy="267" rx="10" ry="4" fill="#2E7D32" />
                            <ellipse cx="311" cy="267" rx="12" ry="5" fill="#2E7D32" />
                            <rect x="290" y="230" width="13" height="37" rx="5" fill="#1565C0" />
                            <rect x="306" y="230" width="14" height="37" rx="5" fill="#1565C0" />
                            <rect x="282" y="175" width="48" height="65" rx="8" fill="#43A047" />
                            {/* Pointing arm */}
                            <rect x="262" y="178" width="12" height="45" rx="6" fill="#43A047" />
                            <ellipse cx="263" cy="223" rx="7" ry="6" fill="#FFCCBC" />
                            {/* Right arm down */}
                            <rect x="330" y="185" width="12" height="40" rx="6" fill="#43A047" />
                            {/* Head & neck */}
                            <rect x="296" y="158" width="12" height="18" rx="5" fill="#FFCCBC" />
                            <ellipse cx="302" cy="150" rx="18" ry="20" fill="#FFCCBC" />
                            <ellipse cx="302" cy="132" rx="18" ry="10" fill="#4A148C" />
                            <rect x="284" y="132" width="36" height="10" rx="4" fill="#4A148C" />
                            <circle cx="296" cy="150" r="2" fill="#795548" />
                            <circle cx="308" cy="150" r="2" fill="#795548" />
                            <path d="M297 159 Q302 163 307 159" fill="none" stroke="#795548" strokeWidth="1.5" strokeLinecap="round" />

                            {/* Decoration X marks */}
                            <text x="220" y="90" fontSize="18" fill="#90CAF9" opacity="0.6" fontWeight="bold">×</text>
                            <text x="150" y="85" fontSize="14" fill="#90CAF9" opacity="0.5" fontWeight="bold">×</text>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h2 style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', letterSpacing: '-1px' }}>
                        Why Choose DocSpot?
                    </h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginTop: 12 }}>
                        A complete healthcare platform designed for your convenience
                    </p>
                </div>
                <div className="features-grid">
                    {[
                        { icon: '📅', title: 'Easy Booking', desc: 'Schedule appointments with just a few clicks. Choose your preferred date, time, and doctor.' },
                        { icon: '👨‍⚕️', title: 'Expert Doctors', desc: 'Access a curated list of verified and experienced specialists across all medical fields.' },
                        { icon: '🔔', title: 'Real-time Updates', desc: 'Get instant notifications about your appointment status, approvals, and reminders.' },
                        { icon: '📋', title: 'Medical Records', desc: 'Upload and manage your medical documents securely in one centralized location.' },
                        { icon: '🛡️', title: 'Secure & Private', desc: 'Your health data is encrypted and protected with the highest security standards.' },
                        { icon: '⭐', title: 'Quality Care', desc: 'All doctors are verified and approved by our admin team to ensure quality care.' },
                    ].map((f) => (
                        <div className="feature-card" key={f.title}>
                            <div className="feature-icon">{f.icon}</div>
                            <div className="feature-title">{f.title}</div>
                            <div className="feature-desc">{f.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{
                background: 'linear-gradient(135deg, var(--dark) 0%, #0d2427 100%)',
                padding: '80px 60px',
                textAlign: 'center',
                color: 'white',
            }}>
                <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>
                    Ready to get started?
                </h2>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
                    Join thousands of patients who trust DocSpot for their healthcare needs.
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
                        Create Free Account
                    </button>
                    <button
                        className="btn btn-lg"
                        style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Home;
