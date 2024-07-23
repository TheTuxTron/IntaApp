const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/info/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdminById);
router.delete('/:id', adminController.deleteAdminById);

router.get('/iva', adminController.getIva); // Nueva ruta para obtener el IVA

module.exports = router;
