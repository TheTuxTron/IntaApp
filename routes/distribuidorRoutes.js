const express = require('express');
const router = express.Router();
const distribuidorController = require('../controllers/distribuidorController');

router.post('/', distribuidorController.createDistribuidor);
router.get('/', distribuidorController.getAllDistribuidores);
router.get('/:id', distribuidorController.getDistribuidorById);
router.put('/:id', distribuidorController.updateDistribuidorById);
router.delete('/:id', distribuidorController.deleteDistribuidorById);
router.post('/disponibles', distribuidorController.getDistribuidoresConStock);

module.exports = router;
