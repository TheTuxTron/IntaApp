const sequelize = require('./config/database');
const Admin = require('./models/Admin');
const AnalisisDatos = require('./models/AnalisisDatos');
const Barrio = require('./models/Barrio');
const Cliente = require('./models/Cliente');
const DetallePedido = require('./models/DetallePedido');
const Distribuidor = require('./models/Distribuidor');
const EstadoPedido = require('./models/EstadoPedido');
const EstadoSolicitud = require('./models/EstadoSolicitud');
const Factura = require('./models/Factura');
const MetodoPagoEfectivo = require('./models/MetodoPagoEfectivo');
const MetodoPagoPaypal = require('./models/MetodoPagoPaypal');
const Parroquia = require('./models/Parroquia');
const Pedido = require('./models/Pedido');
const Presentacion = require('./models/Presentacion');
const Producto = require('./models/Producto');
const Ruta = require('./models/Ruta');

// Aquí no es necesario definir las relaciones nuevamente, ya que están en los modelos

const syncDatabase = async () => {
  try {
    // Eliminar y volver a crear las tablas (Útil para desarrollo, no recomendado en producción)
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};
  syncDatabase();