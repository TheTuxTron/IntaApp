const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para la autenticación  
router.post('/cliente/login', authController.loginCliente);
router.post('/distribuidor/login', authController.loginDistribuidor);
router.post('/admin/login', authController.loginAdmin);

// Rutas para la recuperación de cuenta y restablecimiento de contraseña
router.post('/recover-account', authController.recoverAccount);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
