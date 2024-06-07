const express = require('express');
const router = express.Router();
const metodoPagoEfectivoController = require('../controllers/metodoPagoEfectivoController');

router.post('/', metodoPagoEfectivoController.createMetodoPagoEfectivo);
router.get('/', metodoPagoEfectivoController.getAllMetodoPagoEfectivos);
router.get('/:id', metodoPagoEfectivoController.getMetodoPagoEfectivoById);
router.put('/:id', metodoPagoEfectivoController.updateMetodoPagoEfectivoById);
router.delete('/:id', metodoPagoEfectivoController.deleteMetodoPagoEfectivoById);

module.exports = router;
