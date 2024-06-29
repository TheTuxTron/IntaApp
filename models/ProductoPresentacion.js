const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./Producto');
//const Pedido = require('./Distribuidor');
const Presentacion = require('./Presentacion');

const ProductoPresentacion = sequelize.define('ProductoPresentacion', {
  id_productopresentacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id_producto'
    }
  },
  id_presentacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Presentacion,
      key: 'id_presentacion'
    }
  }
}, {
  tableName: 'ProductoPresentacion',
  timestamps: false
});

ProductoPresentacion.belongsTo(Producto, { foreignKey: 'id_producto' });
ProductoPresentacion.belongsTo(Presentacion, { foreignKey: 'id_presentacion' });

module.exports = ProductoPresentacion;
