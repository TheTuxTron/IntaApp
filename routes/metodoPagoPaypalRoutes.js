const express = require('express');
const router = express.Router();
const metodoPagoPaypalController = require('../controllers/metodoPagoPaypalController');

router.post('/', metodoPagoPaypalController.createMetodoPagoPaypal);
router.get('/', metodoPagoPaypalController.getAllMetodoPagoPaypals);
router.get('/:id', metodoPagoPaypalController.getMetodoPagoPaypalById);
router.put('/:id', metodoPagoPaypalController.updateMetodoPagoPaypalById);
router.delete('/:id', metodoPagoPaypalController.deleteMetodoPagoPaypalById);

module.exports = router;
