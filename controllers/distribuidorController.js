const bcrypt = require('bcrypt');
const Distribuidor = require('../models/Distribuidor');
const sendEmail = require('../services/sendEmail.service');
const sequelize = require('../config/database');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize'); // Asegúrate de importar QueryTypes

exports.createDistribuidor = async (req, res) => {
  try {
    const newDistribuidor = await Distribuidor.create(req.body);    
    res.status(201).json(newDistribuidor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDistribuidores = async (req, res) => {
  try {
    const distribuidores = await Distribuidor.findAll();
    res.status(200).json(distribuidores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistribuidorById = async (req, res) => {
  try {
    const id = req.params.id;
    const distribuidor = await Distribuidor.findOne({ where: { id_distribuidor: id } });
    res.status(200).json(distribuidor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDistribuidorById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id",id);
    const payload = req.body;
    console.log("payload",payload);
    const distribuidor = await Distribuidor.update(payload, { where: { id_distribuidor: id } });
    
    if (payload.id_estadosolicitud) {

      const distribuidorData = await Distribuidor.findOne({ where: { id_distribuidor: id } });
      console.log("distribuidor",distribuidorData);
      console.log("correo",distribuidorData.email);
      let subject = '';
      let text = '';

      switch (payload.id_estadosolicitud) {
        case 3: // Aprobada
          subject = 'Solicitud de Distribuidor Aprobada';
          text = 'Felicidades, su solicitud para ser distribuidor ha sido aprobada. Bienvenido, ya es parte de nosotros.';
          break;
        case 4: // Rechazada
          subject = 'Solicitud de Distribuidor Rechazada';
          text = 'Lamentamos informarle que su solicitud para ser distribuidor ha sido rechazada.';
          break;
        case 5: // Más información requerida
          subject = 'Más Información Requerida para su Solicitud de Distribuidor';
          text = 'Necesitamos más información para procesar su solicitud para ser distribuidor. Por favor, contáctenos.';
          break;
        default:
          subject = 'Actualización de Estado de Solicitud de Distribuidor';
          text = 'El estado de su solicitud para ser distribuidor ha sido actualizado.';
          break;
      }

      sendEmail(distribuidorData.email, subject, text);
    }

    res.status(200).json(distribuidor);

  } catch (error) {
    res.status({ error: error.message });
  }
};

exports.deleteDistribuidorById = async (req, res) => {
  try {
    const id = req.params.id;
    await Distribuidor.destroy({ where: { id_distribuidor: id } });
    res.status(200).json({ message: 'Distribuidor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistribuidoresDisponibles = async (req, res) => {
  try {
    const pedidoDetalles = req.body; // Detalles del pedido

    // Crear una subconsulta para obtener los distribuidores con suficiente stock para cada detalle del pedido
    const subQueries = pedidoDetalles.map(detalle => `
      SELECT pd.id_distribuidor
      FROM ProductoDistribuidor pd
      WHERE pd.id_productopresentacion = ${detalle.presentacion.id_presentacion}
      AND pd.stock >= ${detalle.cantidad}
    `);

    // Unir las subconsultas en una consulta principal
    const query = `
      SELECT d.*
      FROM Distribuidor d
      WHERE d.disponibilidad = 'Libre'
      AND d.id_distribuidor IN (${subQueries.join(' INTERSECT ')})
    `;

    // Ejecutar la consulta
    const [results, metadata] = await sequelize.query(query);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistribuidoresConStock = async (req, res) => {
  try {
    const pedidoDetalles = req.body; // Detalles del pedido

    // Crear una subconsulta para obtener los distribuidores con suficiente stock para cada detalle del pedido
    const subQueries = pedidoDetalles.map(detalle => `
      SELECT pd.id_distribuidor
      FROM "ProductoDistribuidor" pd
      WHERE pd.id_productopresentacion = ${detalle.presentacion.id_presentacion}
      AND pd.stock >= ${detalle.cantidad}
    `);

    // Unir las subconsultas en una consulta principal
    const query = `
      SELECT d.*
      FROM "Distribuidor" d
      WHERE d.disponibilidad = 'Libre'
      AND d.id_distribuidor IN (${subQueries.join(' INTERSECT ')})
    `;

    // Ejecutar la consulta
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
