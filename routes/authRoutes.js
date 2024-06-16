const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para la autenticación  
router.post('/cliente/login', authController.loginCliente);
router.post('/distribuidor/login', authController.loginDistribuidor);
router.post('/admin/login', authController.loginAdmin);

module.exports = router;
