const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MetodoPagoEfectivo = sequelize.define('MetodoPagoEfectivo', {
  id_pagoefectivo: {
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
  tableName: 'MetodoPagoEfectivo',
  timestamps: false
});

module.exports = MetodoPagoEfectivo;