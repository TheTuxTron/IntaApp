const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const EstadoPedido = require('./EstadoPedido');

const Pedido = sequelize.define('Pedido', {
  id_pedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_estadopedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EstadoPedido,
      key: 'id_estadopedido'
    }
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Cliente,
      key: 'id_cliente'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ubicacion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Pedido',
  timestamps: false
});

Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Pedido.belongsTo(EstadoPedido, { foreignKey: 'id_estadopedido' });

module.exports = Pedido;
