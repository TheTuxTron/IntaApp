const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');

const AnalisisDatos = sequelize.define('AnalisisDatos', {
  id_analisis: {
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
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'AnalisisDatos',
  timestamps: false
});

AnalisisDatos.belongsTo(Admin, { foreignKey: 'id_admin' });

module.exports = AnalisisDatos;
