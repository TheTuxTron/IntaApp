const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');
const MetodoPagoEfectivo = require('./MetodoPagoEfectivo');
const MetodoPagoPaypal = require('./MetodoPagoPaypal');

const Factura = sequelize.define('Factura', {
  id_factura: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Pedido,
      key: 'id_pedido'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true
  },
  numfactura: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  iva: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  subtotal: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  valortotal: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  metodo_pago: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: MetodoPagoEfectivo,
      key: 'id_pagoefectivo'
    },
    references: {
      model: MetodoPagoPaypal,
      key: 'id_metodopago2'
    }
  }
}, {
  tableName: 'Factura',
  timestamps: false
});

Factura.belongsTo(Pedido, { foreignKey: 'id_pedido' });
Factura.belongsTo(MetodoPagoEfectivo, { foreignKey: 'metodo_pago' });
Factura.belongsTo(MetodoPagoPaypal, { foreignKey: 'metodo_pago' });

module.exports = Factura;
