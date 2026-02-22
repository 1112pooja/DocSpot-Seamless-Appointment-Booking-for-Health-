// @ts-nocheck
const Doctor = require('../schemas/docModel');
const User = require('../schemas/userModel');
const Appointment = require('../schemas/appointmentModel');

// Get doctor profile
const getDoctorProfileController = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.userId });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor profile not found' });
        }
        return res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.error('Get doctor profile error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update doctor profile
const updateDoctorProfileController = async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate({ userId: req.userId }, req.body, { new: true });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        return res.status(200).json({ success: true, message: 'Profile updated', data: doctor });
    } catch (error) {
        console.error('Update doctor profile error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get doctor appointments
const getDoctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.userId });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        const appointments = await Appointment.find({ doctorId: doctor._id }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error('Get doctor appointments error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update appointment status
const updateAppointmentStatusController = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Notify patient
        const user = await User.findById(appointment.userId);
        if (user) {
            const notification = user.notification || [];
            notification.push({
                type: 'appointment-status-updated',
                message: `Your appointment has been ${status} by Dr. ${appointment.doctorInfo.fullname}`,
                data: { onClickPath: '/appointments' },
            });
            await User.findByIdAndUpdate(user._id, { notification });
        }

        return res.status(200).json({ success: true, message: `Appointment ${status}`, data: appointment });
    } catch (error) {
        console.error('Update appointment status error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get doctor by ID
const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        return res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.error('Get doctor by id error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getDoctorProfileController,
    updateDoctorProfileController,
    getDoctorAppointmentsController,
    updateAppointmentStatusController,
    getDoctorByIdController,
};
