const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductoDistribuidor = require('./ProductoDistribuidor');
const Pedido = require('./Pedido');

const DetallePedido = sequelize.define('DetallePedido', {
  id_detalle: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_productodistribuidor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductoDistribuidor,
      key: 'id_productodistribuidor'
    }
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pedido,
      key: 'id_pedido'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: true
  }
}, {
  tableName: 'DetallePedido',
  timestamps: false
});

DetallePedido.belongsTo(ProductoDistribuidor, { foreignKey: 'id_productodistribuidor' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });

module.exports = DetallePedido;
