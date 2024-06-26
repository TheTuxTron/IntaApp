const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./Producto');
//const Pedido = require('./Distribuidor');
const Distribuidor = require('./Distribuidor');

const ProductoDistribuidor = sequelize.define('ProductoDistribuidor', {
  id_productodistribuidor: {
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
  id_distribuidor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Distribuidor,
      key: 'id_distribuidor'
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: true
  }
}, {
  tableName: 'ProductoDistribuidor',
  timestamps: false
});

ProductoDistribuidor.belongsTo(Producto, { foreignKey: 'id_producto' });
ProductoDistribuidor.belongsTo(Distribuidor, { foreignKey: 'id_distribuidor' });

module.exports = ProductoDistribuidor;
