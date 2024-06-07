const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');
const EstadoSolicitud = require('./EstadoSolicitud');

const Distribuidor = sequelize.define('Distribuidor', {
  id_distribuidor: {
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
  id_estadosolicitud: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: EstadoSolicitud,
      key: 'id_estadosolicitud'
    }
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
  fechasolicitud: {
    type: DataTypes.DATE,
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
  tableName: 'Distribuidor',
  timestamps: false
});

Distribuidor.belongsTo(Admin, { foreignKey: 'id_admin' });
Distribuidor.belongsTo(EstadoSolicitud, { foreignKey: 'id_estadosolicitud' });

module.exports = Distribuidor;
