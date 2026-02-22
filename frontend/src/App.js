// @ts-nocheck
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './components/common/Home';
import Login from './components/common/Login';
import Register from './components/common/Register';
import Notifications from './components/common/Notifications';

// User pages
import UserHome from './components/user/UserHome';
import ApplyDoctor from './components/user/ApplyDoctor';
import UserAppointments from './components/user/UserAppointments';
import DoctorList from './components/user/DoctorList';

// Doctor pages
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DoctorProfile from './components/doctor/DoctorProfile';
import DoctorAppointments from './components/doctor/DoctorAppointments';

// Admin pages
import AdminDashboard from './components/admin/AdminDashboard';
import AdminDoctors from './components/admin/AdminDoctors';
import AdminUsers from './components/admin/AdminUsers';
import AdminAppointments from './components/admin/AdminAppointments';

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// Public Route (redirect if logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protected - User */}
      <Route path="/" element={<ProtectedRoute><DoctorList /></ProtectedRoute>} />
      <Route path="/userhome" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
      <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute><UserAppointments /></ProtectedRoute>} />
      <Route path="/notification" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

      {/* Protected - Doctor */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/profile" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />
      <Route path="/doctor/appointments" element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />

      {/* Protected - Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute><AdminDoctors /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute><AdminAppointments /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
