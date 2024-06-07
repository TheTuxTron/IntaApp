const express = require('express');
const router = express.Router();
const barrioController = require('../controllers/barrioController');

router.post('/', barrioController.createBarrio);
router.get('/', barrioController.getAllBarrios);
router.get('/:id', barrioController.getBarrioById);
router.put('/:id', barrioController.updateBarrioById);
router.delete('/:id', barrioController.deleteBarrioById);

module.exports = router;
