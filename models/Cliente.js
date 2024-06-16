const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Barrio = require('./Barrio');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_barrio: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Barrio,
      key: 'id_barrio'
    }
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: true
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Cliente',
  timestamps: false
});

Cliente.belongsTo(Barrio, { foreignKey: 'id_barrio' });

module.exports = Cliente;
