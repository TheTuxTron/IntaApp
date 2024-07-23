const sequelize = require('./config/database');
const bcrypt = require('bcrypt');


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
const ProductoDistribuidor = require('./models/ProductoDistribuidor');
const ProductoPresentacion = require('./models/ProductoPresentacion');
const Ruta = require('./models/Ruta');

// Aquí no es necesario definir las relaciones nuevamente, ya que están en los modelos

const syncDatabase = async () => {
  try {
    if (process.env.DB_USE_SQLITE === 'true') {
      await sequelize.sync({ force: true }); // force: true elimina las tablas si existen y las vuelve a crear
      console.log('Base de datos SQLite sincronizada');

      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash('password', 10); // Ajusta el número de salt rounds según tus necesidades

      // Insertar administrador por defecto
      await Admin.create({
        nombre: 'Admin',
        apellido: 'Default',
        direccion: 'Direccion de ejemplo',
        telefono: '1234567890',
        email: 'admin@example.com',
        username: 'admin',
        password: hashedPassword
      });
      console.log('Administrador por defecto insertado en SQLite');
    } else {
      console.log('Uso de PostgreSQL configurado, sin sincronización');
    }
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();