const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedidoController');

router.post('/', detallePedidoController.createDetallePedido);
router.get('/', detallePedidoController.getAllDetallePedidos);
router.get('/:id', detallePedidoController.getDetallePedidoById);
router.put('/:id', detallePedidoController.updateDetallePedidoById);
router.delete('/:id', detallePedidoController.deleteDetallePedidoById);

module.exports = router;
