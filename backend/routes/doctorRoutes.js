const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getDoctorProfileController,
    updateDoctorProfileController,
    getDoctorAppointmentsController,
    updateAppointmentStatusController,
    getDoctorByIdController,
} = require('../controllers/doctorC');

router.get('/getDoctorProfile', authMiddleware, getDoctorProfileController);
router.put('/updateDoctorProfile', authMiddleware, updateDoctorProfileController);
router.get('/getDoctorAppointments', authMiddleware, getDoctorAppointmentsController);
router.post('/updateAppointmentStatus', authMiddleware, updateAppointmentStatusController);
router.get('/getDoctorById/:id', authMiddleware, getDoctorByIdController);

module.exports = router;
