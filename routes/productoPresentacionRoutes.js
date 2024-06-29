const express = require('express');
const router = express.Router();
const productoPresentacionController = require('../controllers/productopresentacionController');


router.post('/', productoPresentacionController.createProductoPresentacion);
router.get('/', productoPresentacionController.getAllProductoPresentaciones);
router.get('/:id', productoPresentacionController.getProductoPresentacionById);
router.put('/:id', productoPresentacionController.updateProductoPresentacionById);
router.delete('/:id', productoPresentacionController.deleteProductoPresentacionById);
router.get('/:id_producto/:id_presentacion', productoPresentacionController.verificarProductoPresentacion);

module.exports = router;
