// services/paymentService.js
const { client } = require('../config/paypalConfig');
const paypal = require('@paypal/checkout-server-sdk');

async function createOrder() {
    let request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '100.00'
            }
        }],

        application_context: {
            return_url: 'http://localhost:4200/cliente-pedidos', // URL de éxito en tu aplicación Angular
            cancel_url: 'http://localhost:4200/cliente-pedidos' // URL de cancelación en tu aplicación Angular
        }
    });



    try {
        const order = await client.execute(request);
        return order.result;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating PayPal order');
    }
}

async function captureOrder(orderId) {
    let request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        return capture.result;
    } catch (error) {
        console.error(error);
        throw new Error('Error capturing PayPal order: ' + error.message);
    }
}

async function cancelOrder(orderId) {
    let request = new paypal.orders.OrdersVoidRequest(orderId);

    try {
        const cancel = await client.execute(request);
        return cancel.result;
    } catch (error) {
        console.error(error);
        throw new Error('Error canceling PayPal order');
    }
}

module.exports = { createOrder, captureOrder, cancelOrder };