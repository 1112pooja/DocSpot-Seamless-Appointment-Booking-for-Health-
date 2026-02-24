// @ts-nocheck
const User = require('../schemas/userModel');
const Doctor = require('../schemas/docModel');
const Appointment = require('../schemas/appointmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, type } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            type: type || 'user',
        });

        await newUser.save();
        return res.status(201).json({ success: true, message: 'Registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                type: user.type,
                isdoctor: user.isdoctor,
                notification: user.notification,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Auth (get current user)
const authController = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Apply for Doctor
const applyDoctorController = async (req, res) => {
    try {
        const existingDoctor = await Doctor.findOne({ userId: req.userId });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: 'Doctor application already submitted' });
        }

        const newDoctor = new Doctor({ ...req.body, userId: req.userId, status: 'pending' });
        await newDoctor.save();

        // Notify admin
        const adminUser = await User.findOne({ type: 'admin' });
        if (adminUser) {
            const notification = adminUser.notification || [];
            notification.push({
                type: 'apply-doctor-request',
                message: `${req.body.fullname} has applied for a doctor account`,
                data: { doctorId: newDoctor._id, name: req.body.fullname, onClickPath: '/admin/doctors' },
            });
            await User.findByIdAndUpdate(adminUser._id, { notification });
        }

        return res.status(201).json({ success: true, message: 'Doctor application submitted successfully' });
    } catch (error) {
        console.error('Apply doctor error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get all notifications
const getAllNotificationController = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const seennotification = user.seennotification || [];
        const notification = user.notification || [];
        seennotification.push(...notification);
        await User.findByIdAndUpdate(req.userId, { notification: [], seennotification });
        const updatedUser = await User.findById(req.userId).select('-password');
        return res.status(200).json({ success: true, message: 'All notifications marked', data: updatedUser });
    } catch (error) {
        console.error('Notification error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete notifications
const deleteAllNotificationController = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, { notification: [], seennotification: [] });
        const updatedUser = await User.findById(req.userId).select('-password');
        return res.status(200).json({ success: true, message: 'Notifications cleared', data: updatedUser });
    } catch (error) {
        console.error('Delete notification error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all approved doctors
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: 'approved' });
        return res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        console.error('Get doctors error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Book appointment
const bookAppointmentController = async (req, res) => {
    try {
        const { doctorId, doctorInfo, userInfo, date, time } = req.body;
        // req.file.path is the full Cloudinary URL when using multer-storage-cloudinary
        const document = req.file ? req.file.path : '';

        const newAppointment = new Appointment({
            userId: req.userId,
            doctorId,
            doctorInfo,
            userInfo,
            date,
            time,
            document,
            status: 'pending',
        });

        await newAppointment.save();

        // Notify doctor
        const doctorUser = await User.findById(doctorInfo.userId);
        if (doctorUser) {
            const notification = doctorUser.notification || [];
            notification.push({
                type: 'new-appointment-request',
                message: `New appointment request from ${userInfo.name}`,
                data: { appointmentId: newAppointment._id, name: userInfo.name, onClickPath: '/doctor/appointments' },
            });
            await User.findByIdAndUpdate(doctorUser._id, { notification });
        }

        return res.status(201).json({ success: true, message: 'Appointment booked successfully' });
    } catch (error) {
        console.error('Book appointment error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get user appointments
const getUserAppointmentsController = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.userId }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error('Get appointments error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Cancel appointment
const cancelAppointmentController = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        if (appointment.userId.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        await Appointment.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: 'Appointment cancelled' });
    } catch (error) {
        console.error('Cancel appointment error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    registerController,
    loginController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    getUserAppointmentsController,
    cancelAppointmentController,
};
