const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstadoPedido = sequelize.define('EstadoPedido', {
  id_estadopedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'EstadoPedido',
  timestamps: false
});

module.exports = EstadoPedido;
