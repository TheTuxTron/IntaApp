// app.js
const express = require('express');
const app = express();


// Importar las rutas
const adminRoutes = require('./routes/adminRoutes');
const analisisdatosRoutes = require('./routes/analisisdatosRoutes');
const barrioRoutes = require('./routes/barrioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const distribuidorRoutes = require('./routes/distribuidorRoutes');
const estadoPedidoRoutes = require('./routes/estadoPedidoRoutes');
const estadoSolicitudRoutes = require('./routes/estadoSolicitudRoutes');
const facturaRoutes = require('./routes/facturaRoutes');
const metodoPagoEfectivoRoutes = require('./routes/metodoPagoEfectivoRoutes');
const metodoPagoPaypalRoutes = require('./routes/metodoPagoPaypalRoutes');
const parroquiaRoutes = require('./routes/parroquiaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const presentacionRoutes = require('./routes/presentacionRoutes');
const productoRoutes = require('./routes/productoRoutes');
const rutaRoutes = require('./routes/rutaRoutes');


app.use(express.json());

// Usar las rutas
app.use('/admin', adminRoutes);
app.use('/analisisdatos', analisisdatosRoutes);
app.use('/barrio', barrioRoutes);
app.use('/cliente', clienteRoutes);
app.use('/detalle-pedido', detallePedidoRoutes);
app.use('/distribuidor', distribuidorRoutes);
app.use('/estado-pedido', estadoPedidoRoutes);
app.use('/estado-solicitud', estadoSolicitudRoutes);
app.use('/factura', facturaRoutes);
app.use('/metodo-pago-efectivo', metodoPagoEfectivoRoutes);
app.use('/metodo-pago-paypal', metodoPagoPaypalRoutes);
app.use('/parroquia', parroquiaRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/presentacion', presentacionRoutes);
app.use('/producto', productoRoutes);
app.use('/ruta', rutaRoutes);

// Añadir otras rutas...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
