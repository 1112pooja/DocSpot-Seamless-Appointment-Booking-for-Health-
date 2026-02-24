// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react'; // eslint-disable-line no-unused-vars
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../utils/API';

const Layout = ({ children, title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const res = await API.get('/user/getUserData');
            if (res.data.success) setUser(res.data.data);
        } catch (err) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/home');
    };

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    const getUserNavItems = () => [
        { icon: '🏠', label: 'Dashboard', path: '/' },
        { icon: '📅', label: 'My Appointments', path: '/appointments' },
        { icon: '🩺', label: 'Apply as Doctor', path: '/apply-doctor' },
        { icon: '🔔', label: 'Notifications', path: '/notification' },
    ];

    const getDoctorNavItems = () => [
        { icon: '📊', label: 'Dashboard', path: '/doctor/dashboard' },
        { icon: '📅', label: 'Appointments', path: '/doctor/appointments' },
        { icon: '👤', label: 'My Profile', path: '/doctor/profile' },
        { icon: '🔔', label: 'Notifications', path: '/notification' },
    ];

    const getAdminNavItems = () => [
        { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
        { icon: '👨‍⚕️', label: 'Manage Doctors', path: '/admin/doctors' },
        { icon: '👥', label: 'Manage Users', path: '/admin/users' },
        { icon: '📅', label: 'Appointments', path: '/admin/appointments' },
        { icon: '🔔', label: 'Notifications', path: '/notification' },
    ];

    const getNavItems = () => {
        if (!user) return [];
        if (user.type === 'admin') return getAdminNavItems();
        if (user.isdoctor) return getDoctorNavItems();
        return getUserNavItems();
    };

    const getRoleLabel = () => {
        if (!user) return '';
        if (user.type === 'admin') return 'Administrator';
        if (user.isdoctor) return 'Doctor';
        return 'Patient';
    };

    const notifCount = user?.notification?.length || 0;

    return (
        <div className="layout-wrapper">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="sidebar-brand-icon">🏥</div>
                    <div>
                        <div className="sidebar-brand-text">DocSpot</div>
                        <div className="sidebar-brand-sub">Healthcare Platform</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section-title">Navigation</div>
                    {getNavItems().map((item) => (
                        <button
                            key={item.path}
                            className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                            {item.path === '/notification' && notifCount > 0 && (
                                <span className="badge badge-pending" style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 7px' }}>
                                    {notifCount}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">
                            {user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="sidebar-user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {user?.name || 'Loading...'}
                            </div>
                            <div className="sidebar-user-role">{getRoleLabel()}</div>
                        </div>
                    </div>
                    <button
                        className="sidebar-nav-item"
                        style={{ marginTop: 8, color: '#f87171' }}
                        onClick={handleLogout}
                    >
                        <span className="nav-icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="main-content">
                <header className="topbar">
                    <h1 className="topbar-title">{title || 'Dashboard'}</h1>
                    <div className="topbar-actions">
                        <button
                            className="topbar-btn"
                            onClick={() => navigate('/notification')}
                            title="Notifications"
                        >
                            🔔
                            {notifCount > 0 && (
                                <span className="notif-badge">{notifCount > 9 ? '9+' : notifCount}</span>
                            )}
                        </button>
                        <button
                            className="topbar-btn"
                            onClick={handleLogout}
                            title="Logout"
                        >
                            🚪
                        </button>
                    </div>
                </header>

                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
