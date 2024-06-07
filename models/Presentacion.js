const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Presentacion = sequelize.define('Presentacion', {
  id_presentacion: {
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
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: true
  }
}, {
  tableName: 'Presentacion',
  timestamps: false
});

module.exports = Presentacion;
