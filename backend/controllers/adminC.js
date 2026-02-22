// @ts-nocheck
const Doctor = require('../schemas/docModel');
const User = require('../schemas/userModel');
const Appointment = require('../schemas/appointmentModel');

// Get all doctors (admin)
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        return res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        console.error('Admin get doctors error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all users (admin)
const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Admin get users error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all appointments (admin)
const getAllAppointmentsController = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error('Admin get appointments error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Approve or reject doctor
const changeDoctorStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { status }, { new: true });

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Update user isdoctor flag
        if (status === 'approved') {
            await User.findByIdAndUpdate(doctor.userId, { isdoctor: true });
        } else if (status === 'rejected') {
            await User.findByIdAndUpdate(doctor.userId, { isdoctor: false });
        }

        // Notify doctor user
        const doctorUser = await User.findById(doctor.userId);
        if (doctorUser) {
            const notification = doctorUser.notification || [];
            notification.push({
                type: 'doctor-account-request-updated',
                message: `Your doctor account has been ${status}`,
                data: { onClickPath: '/notification' },
            });
            await User.findByIdAndUpdate(doctorUser._id, { notification });
        }

        return res.status(200).json({ success: true, message: `Doctor ${status} successfully`, data: doctor });
    } catch (error) {
        console.error('Change doctor status error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Delete user (admin)
const deleteUserController = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getAllDoctorsController,
    getAllUsersController,
    getAllAppointmentsController,
    changeDoctorStatusController,
    deleteUserController,
};
