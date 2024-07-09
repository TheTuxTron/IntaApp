const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const Producto = require('./ProductoPresentacion');
//const Pedido = require('./Distribuidor');
const Distribuidor = require('./Distribuidor');
const ProductoPresentacion = require('./ProductoPresentacion');

const ProductoDistribuidor = sequelize.define('ProductoDistribuidor', {
  id_productodistribuidor: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_productopresentacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductoPresentacion,
      key: 'id_productopresentacion'
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

ProductoDistribuidor.belongsTo(ProductoPresentacion, { foreignKey: 'id_productopresentacion' });
ProductoDistribuidor.belongsTo(Distribuidor, { foreignKey: 'id_distribuidor' });

module.exports = ProductoDistribuidor;
