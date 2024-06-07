const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./Admin');
const Barrio = require('./Barrio');
const Distribuidor = require('./Distribuidor');
const Parroquia = require('./Parroquia');

const Ruta = sequelize.define('Ruta', {
  id_ruta: {
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
  id_barrio: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Barrio,
      key: 'id_barrio'
    }
  },
  id_distribuidor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Distribuidor,
      key: 'id_distribuidor'
    }
  },
  id_parroquia: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: 'Ruta',
  timestamps: false
});

Ruta.belongsTo(Admin, { foreignKey: 'id_admin' });
Ruta.belongsTo(Barrio, { foreignKey: 'id_barrio' });
Ruta.belongsTo(Distribuidor, { foreignKey: 'id_distribuidor' });
Ruta.belongsTo(Parroquia, { foreignKey: 'id_parroquia' });

module.exports = Ruta;
