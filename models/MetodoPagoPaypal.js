const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MetodoPagoPaypal = sequelize.define('MetodoPagoPaypal', {
  id_metodopago2: {
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
  tableName: 'MetodoPagoPaypal',
  timestamps: false
});

module.exports = MetodoPagoPaypal;
