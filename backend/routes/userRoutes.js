const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
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
