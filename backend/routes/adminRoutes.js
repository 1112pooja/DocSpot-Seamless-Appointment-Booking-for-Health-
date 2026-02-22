const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getAllDoctorsController,
    getAllUsersController,
    getAllAppointmentsController,
    changeDoctorStatusController,
    deleteUserController,
} = require('../controllers/adminC');

router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);
router.get('/getAllUsers', authMiddleware, getAllUsersController);
router.get('/getAllAppointments', authMiddleware, getAllAppointmentsController);
router.post('/changeDoctorStatus', authMiddleware, changeDoctorStatusController);
router.delete('/deleteUser/:id', authMiddleware, deleteUserController);

module.exports = router;
