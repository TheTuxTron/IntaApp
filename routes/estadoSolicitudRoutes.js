const express = require('express');
const router = express.Router();
const estadoSolicitudController = require('../controllers/estadoSolicitudController');

router.post('/', estadoSolicitudController.createEstadoSolicitud);
router.get('/', estadoSolicitudController.getAllEstadoSolicitudes);
router.get('/:id', estadoSolicitudController.getEstadoSolicitudById);
router.put('/:id', estadoSolicitudController.updateEstadoSolicitudById);
router.delete('/:id', estadoSolicitudController.deleteEstadoSolicitudById);

module.exports = router;
