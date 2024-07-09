// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create-order', paymentController.createOrder);
router.post('/capture-order', paymentController.captureOrder);
router.post('/cancel-order', paymentController.cancelOrder);

module.exports = router;
