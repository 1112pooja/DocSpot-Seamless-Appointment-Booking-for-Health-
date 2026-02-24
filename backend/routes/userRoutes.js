// @ts-nocheck
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const authMiddleware = require('../middlewares/authMiddleware');
const {
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
} = require('../controllers/userC');

// Cloudinary storage config — files go directly to Cloudinary, never touch disk
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'docspot/documents',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        resource_type: 'auto',
    },
});
const upload = multer({ storage });

// Public routes
router.post('/register', registerController);
router.post('/login', loginController);

// Protected routes
router.get('/getUserData', authMiddleware, authController);
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.get('/get-all-notification', authMiddleware, getAllNotificationController);
router.delete('/delete-all-notification', authMiddleware, deleteAllNotificationController);
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);
router.post('/book-appointment', authMiddleware, upload.single('document'), bookAppointmentController);
router.get('/get-user-appointments', authMiddleware, getUserAppointmentsController);
router.delete('/cancel-appointment/:id', authMiddleware, cancelAppointmentController);

module.exports = router;
