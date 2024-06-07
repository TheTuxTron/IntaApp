const express = require('express');
const router = express.Router();
const presentacionController = require('../controllers/presentacionController');

router.post('/', presentacionController.createPresentacion);
router.get('/', presentacionController.getAllPresentaciones);
router.get('/:id', presentacionController.getPresentacionById);
router.put('/:id', presentacionController.updatePresentacionById);
router.delete('/:id', presentacionController.deletePresentacionById);

module.exports = router;
