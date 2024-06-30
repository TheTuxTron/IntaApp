const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.createPedido);
router.get('/', pedidoController.getAllPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.put('/:id', pedidoController.updatePedidoById);
router.delete('/:id', pedidoController.deletePedidoById);

router.get('/pendientes/:id_distribuidor', pedidoController.getPedidosPendientes);
router.put('/:id_pedido/estado', pedidoController.updateEstadoPedido);

module.exports = router;
