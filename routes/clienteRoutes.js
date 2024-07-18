const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.createCliente);
router.get('/', clienteController.getAllClientes);
router.get('/info/:id', clienteController.getClienteById);
router.put('/:id', clienteController.updateClienteById);
router.delete('/:id', clienteController.deleteClienteById);

router.get('/check-username/:username', clienteController.checkUsername);
router.get('/check-cedula/:cedula', clienteController.checkCedula);

router.get('/location', clienteController.getClientLocation);


router.get('/factura/:id_cliente', clienteController.getFacturaByClienteId);

module.exports = router;
