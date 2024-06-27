const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.post('/', productoController.createProducto);
router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.put('/:id', productoController.updateProductoById);
router.delete('/:id', productoController.deleteProductoById);
router.get('/:id_producto/presentacion', productoController.obtenerPresentacionPorProducto);
router.get('/:nombre_producto/presentaciones', productoController.obtenerPresentacionesPorNombreProducto);


module.exports = router;
