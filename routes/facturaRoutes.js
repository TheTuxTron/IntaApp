const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.post('/:id', facturaController.createFactura);
router.get('/', facturaController.getAllFacturas);
router.get('/:id', facturaController.getFacturaById);
router.put('/:id', facturaController.updateFacturaById);
router.delete('/:id', facturaController.deleteFacturaById);

module.exports = router;
