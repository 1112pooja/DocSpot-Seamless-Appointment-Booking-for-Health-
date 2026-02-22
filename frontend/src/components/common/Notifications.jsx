// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import API from '../../utils/API';

const Notifications = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await API.get('/user/getUserData');
            if (res.data.success) setUser(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const markAllRead = async () => {
        try {
            const res = await API.get('/user/get-all-notification');
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const clearAll = async () => {
        try {
            const res = await API.delete('/user/delete-all-notification');
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const allNotifications = [
        ...(user?.notification || []).map(n => ({ ...n, read: false })),
        ...(user?.seennotification || []).map(n => ({ ...n, read: true })),
    ];

    return (
        <Layout title="Notifications">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2 className="page-title">Notifications</h2>
                        <p className="page-subtitle">
                            {user?.notification?.length || 0} unread notifications
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {user?.notification?.length > 0 && (
                            <button className="btn btn-primary btn-sm" onClick={markAllRead}>
                                ✓ Mark All Read
                            </button>
                        )}
                        {allNotifications.length > 0 && (
                            <button className="btn btn-danger btn-sm" onClick={clearAll}>
                                🗑️ Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading notifications...</p>
                </div>
            ) : allNotifications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🔔</div>
                    <div className="empty-state-title">No notifications</div>
                    <div className="empty-state-sub">You're all caught up!</div>
                </div>
            ) : (
                <div className="notif-list">
                    {allNotifications.map((notif, idx) => (
                        <div
                            key={idx}
                            className="notif-item"
                            style={!notif.read ? { borderColor: 'var(--primary)', background: 'var(--primary-light)' } : {}}
                        >
                            <div className="notif-icon">
                                {notif.type === 'apply-doctor-request' ? '👨‍⚕️' :
                                    notif.type === 'doctor-account-request-updated' ? '✅' :
                                        notif.type === 'new-appointment-request' ? '📅' :
                                            '🔔'}
                            </div>
                            <div className="notif-content">
                                <div className="notif-message">{notif.message}</div>
                                {notif.data?.name && (
                                    <div className="notif-time">From: {notif.data.name}</div>
                                )}
                            </div>
                            {!notif.read && (
                                <span className="badge badge-pending">New</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Notifications;
