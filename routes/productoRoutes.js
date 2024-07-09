const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.post('/', productoController.createProducto);
router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.put('/:id', productoController.updateProductoById);
router.delete('/:id', productoController.deleteProductoById);
router.get('/nombre/:nombre', productoController.verificarProductoPorNombre);
router.get('/:id/presentaciones', productoController.getPresentacionesPorProducto);

module.exports = router;
