const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstadoSolicitud = sequelize.define('EstadoSolicitud', {
  id_estadosolicitud: {
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
  tableName: 'EstadoSolicitud',
  timestamps: false
});

module.exports = EstadoSolicitud;
