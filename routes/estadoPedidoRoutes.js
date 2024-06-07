const express = require('express');
const router = express.Router();
const estadoPedidoController = require('../controllers/estadoPedidoController');

router.post('/', estadoPedidoController.createEstadoPedido);
router.get('/', estadoPedidoController.getAllEstadoPedidos);
router.get('/:id', estadoPedidoController.getEstadoPedidoById);
router.put('/:id', estadoPedidoController.updateEstadoPedidoById);
router.delete('/:id', estadoPedidoController.deleteEstadoPedidoById);

module.exports = router;
