const express = require('express');
const router = express.Router();
const analisisdatosController = require('../controllers/analisisdatosController');

router.post('/', analisisdatosController.createAnalisisDatos);
router.get('/', analisisdatosController.getAllAnalisisDatos);
router.get('/:id', analisisdatosController.getAnalisisDatosById);
router.put('/:id', analisisdatosController.updateAnalisisDatosById);
router.delete('/:id', analisisdatosController.deleteAnalisisDatosById);

module.exports = router;
