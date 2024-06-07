const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./Producto');
const Pedido = require('./Pedido');

const DetallePedido = sequelize.define('DetallePedido', {
  id_detalle: {
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

DetallePedido.belongsTo(Producto, { foreignKey: 'id_producto' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });

module.exports = DetallePedido;
