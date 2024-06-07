const express = require('express');
const router = express.Router();
const parroquiaController = require('../controllers/parroquiaController');

router.post('/', parroquiaController.createParroquia);
router.get('/', parroquiaController.getAllParroquias);
router.get('/:id', parroquiaController.getParroquiaById);
router.put('/:id', parroquiaController.updateParroquiaById);
router.delete('/:id', parroquiaController.deleteParroquiaById);

module.exports = router;
