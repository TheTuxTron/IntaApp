const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');
//const Distribuidor = require('./Distribuidor');
const Presentacion = require('./Presentacion');

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Admin,
      key: 'id_admin'
    }
  },/*
  id_distribuidor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Distribuidor,
      key: 'id_distribuidor'
    }
  },*/
  id_presentacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Presentacion,
      key: 'id_presentacion'
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },/*
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  }*/
}, {
  tableName: 'Producto',
  timestamps: false
});

Producto.belongsTo(Admin, { foreignKey: 'id_admin' });
//Producto.belongsTo(Distribuidor, { foreignKey: 'id_distribuidor' });
Producto.belongsTo(Presentacion, { foreignKey: 'id_presentacion' });

module.exports = Producto;
