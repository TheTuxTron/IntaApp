const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.createCliente);
router.get('/', clienteController.getAllClientes);
router.get('/:id', clienteController.getClienteById);
router.put('/:id', clienteController.updateClienteById);
router.delete('/:id', clienteController.deleteClienteById);

router.get('/check-username/:username', clienteController.checkUsername);

router.get('/location', clienteController.getClientLocation);

module.exports = router;
