const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');

router.post('/', rutaController.createRuta);
router.get('/', rutaController.getAllRutas);
router.get('/:id', rutaController.getRutaById);
router.put('/:id', rutaController.updateRutaById);
router.delete('/:id', rutaController.deleteRutaById);

module.exports = router;
