const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.createPedido);
router.get('/', pedidoController.getAllPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.put('/:id', pedidoController.updatePedidoById);
router.delete('/:id', pedidoController.deletePedidoById);

router.get('/pendientes/:id_distribuidor', pedidoController.getPedidosPendientes); //cargar los pedidos pendientes de un distribuidor
router.get('/en_camino/:id_distribuidor', pedidoController.getPedidosEnCamino); //cargar los pedidos en camino de un distribuidor
router.get('/entregados/:id_distribuidor', pedidoController.getPedidosEntregados); //cargar los pedidos entregados de un distribuidor

router.post('/pagar/:id_pedido', pedidoController.pagarPedido);


router.put('/finalizar/:id_pedido', pedidoController.finalizarPedido);



router.put('/:id_pedido', pedidoController.updateEstadoPedido);

router.get('/cliente/:id_cliente', pedidoController.getPedidosCliente);
router.post('/reasignar/:id_pedido', pedidoController.reasignarDistribuidor);

router.put('/:id_pedido/distribuidor', pedidoController.updateDistribuidorPedido);//actualizar el pedido con otro distribuidor

module.exports = router;
