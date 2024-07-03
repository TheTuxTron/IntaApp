// app.js
const express = require('express');
const cors = require('cors');

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
const authRoutes = require('./routes/authRoutes');
const productoDistribuidorRoutes = require('./routes/productoDistribuidorRoutes');
const productoPresentacionRoutes = require('./routes/productoPresentacionRoutes')
const paymentRoutes = require('./routes/paymentRoutes');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors({
      origin: function (origin, callback) {
        const allowedOrigins = [
          'http://localhost:4200',
          // Agregar otros orígenes permitidos aquí
        ];

        // Permitir solicitudes sin un origen (como las realizadas desde herramientas de pruebas)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
          // Si el origen está en la lista de permitidos
          callback(null, true);
        } else {
          // Si el origen no está en la lista de permitidos
          callback(new Error('No permitido por CORS'));
        }
      }
    }));
  }

  routes() {
    this.app.use('/api/admin', adminRoutes);
    this.app.use('/api/analisisdatos', analisisdatosRoutes);
    this.app.use('/api/barrio', barrioRoutes);
    this.app.use('/api/cliente', clienteRoutes);
    this.app.use('/api/detalle-pedido', detallePedidoRoutes);
    this.app.use('/api/distribuidor', distribuidorRoutes);
    this.app.use('/api/estado-pedido', estadoPedidoRoutes);
    this.app.use('/api/estado-solicitud', estadoSolicitudRoutes);
    this.app.use('/api/factura', facturaRoutes);
    this.app.use('/api/metodo-pago-efectivo', metodoPagoEfectivoRoutes);
    this.app.use('/api/metodo-pago-paypal', metodoPagoPaypalRoutes);
    this.app.use('/api/parroquia', parroquiaRoutes);
    this.app.use('/api/pedido', pedidoRoutes);
    this.app.use('/api/presentacion', presentacionRoutes);
    this.app.use('/api/producto', productoRoutes);
    this.app.use('/api/ruta', rutaRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/productodistribuidor', productoDistribuidorRoutes);
    this.app.use('/api/productopresentacion', productoPresentacionRoutes);
    this.app.use('/api/payments', paymentRoutes);
    // Añadir otras rutas...
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

const server = new Server();
server.listen();
