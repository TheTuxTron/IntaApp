// controllers/paymentController.js
const paymentService = require('../services/paymentService');

async function createOrder(req, res) {
    try {
        console.log("recibo", req.body);
        const order = await paymentService.createOrder();
        const approveLink = order.links.find(link => link.rel === 'approve');
        res.json({ id: order.id, approveLink: approveLink.href });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function captureOrder(req, res) {
    const { orderId } = req.body;

    try {
        const capture = await paymentService.captureOrder(orderId);
        res.json(capture);
    } catch (error) {
        console.error('Error en captureOrder:', error);
        res.status(500).json({ error: error.message });
    }
}

async function cancelOrder(req, res) {
    const { orderId } = req.body;

    try {
        const cancel = await paymentService.cancelOrder(orderId);
        res.json(cancel);
    } catch (error) {
        console.error('Error en cancelOrder:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createOrder, captureOrder, cancelOrder };
