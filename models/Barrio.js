const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Parroquia = require('./Parroquia');
const Admin = require('./Admin');

const Barrio = sequelize.define('Barrio', {
  id_barrio: {
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
  id_parroquia: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Parroquia,
      key: 'id_parroquia'
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ubicacion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Barrio',
  timestamps: false
});

Barrio.belongsTo(Admin, { foreignKey: 'id_admin' });
Barrio.belongsTo(Parroquia, { foreignKey: 'id_parroquia' });

module.exports = Barrio;
