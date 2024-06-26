const express = require('express');
const router = express.Router();
const productoDistribuidorController = require('../controllers/productodistribuidorController');


router.post('/', productoDistribuidorController.createProductoDistribuidor);
router.get('/', productoDistribuidorController.getAllProductoDistribuidores);
router.get('/:id', productoDistribuidorController.getProductoDistribuidorById);
router.put('/:id', productoDistribuidorController.updateProductoDistribuidorById);
router.delete('/:id', productoDistribuidorController.deleteProductoDistribuidorById);

module.exports = router;
