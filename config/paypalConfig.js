// config/paypalConfig.js
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

let environment = new paypal.core.SandboxEnvironment(process.env.CLIENT, process.env.SECRET);
let client = new paypal.core.PayPalHttpClient(environment);

module.exports = { client };