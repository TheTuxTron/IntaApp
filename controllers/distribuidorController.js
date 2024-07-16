const bcrypt = require('bcrypt');
const Distribuidor = require('../models/Distribuidor');
const Cliente = require('../models/Cliente');
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
    const payload = req.body;
    const distribuidor = await Distribuidor.update(payload, { where: { id_distribuidor: id } });

    if (payload.id_estadosolicitud) {
      const distribuidorData = await Distribuidor.findOne({ where: { id_distribuidor: id } });
      let subject = '';
      let mensaje = '';
      let link = '';  // Aquí deberías agregar el enlace de inicio de sesión
      let botonTexto = 'Iniciar Sesión';

      switch (payload.id_estadosolicitud) {
        case 3: // Aprobada
          let username, password, hashedPassword;
          do {
            username = generateUsername();
          } while (await isUsernameTaken(username));

          password = generatePassword();
          hashedPassword = await bcrypt.hash(password, 10);

          await Distribuidor.update({ username, password: hashedPassword }, { where: { id_distribuidor: id } });
          subject = 'Solicitud de Distribuidor Aprobada';
          mensaje = `Felicidades, su solicitud para ser distribuidor ha sido aprobada. 
                      Sus credenciales son: 
                      Username: ${username}
                      Password: ${password}
                      Bienvenido, ya es parte de nosotros.`;
          link = 'http://tusitio.com/login';  // Cambia esto por el enlace real de inicio de sesión
          break;
        case 4: // Rechazada
          subject = 'Solicitud de Distribuidor Rechazada';
          mensaje = 'Lamentamos informarle que su solicitud para ser distribuidor ha sido rechazada.';
          link = 'http://tusitio.com/solicitar';  // Cambia esto por el enlace real para solicitar nuevamente
          break;
        case 5: // Más información requerida
          subject = 'Más Información Requerida para su Solicitud de Distribuidor';
          mensaje = 'Necesitamos más información para procesar su solicitud para ser distribuidor. Por favor, contáctenos.';
          link = 'http://tusitio.com/contacto';  // Cambia esto por el enlace real de contacto
          break;
        default:
          subject = 'Actualización de Estado de Solicitud de Distribuidor';
          mensaje = 'El estado de su solicitud para ser distribuidor ha sido actualizado.';
          link = 'http://tusitio.com/estado-solicitud';  // Cambia esto por el enlace real para ver el estado de la solicitud
          break;
      }

      sendEmail(distribuidorData.email, subject, 'emailTemplate', { subject, mensaje, link, botonTexto });
    }

    res.status(200).json(distribuidor);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    console.log(pedidoDetalles);
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
    console.log(pedidoDetalles);
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

exports.getDistribuidoresConStockReasignar = async (req, res) => {
  try {
    const pedidoDetalles = req.body; // Detalles del pedido
    console.log(pedidoDetalles);
    // Crear una subconsulta para obtener los distribuidores con suficiente stock para cada detalle del pedido
    const subQueries = pedidoDetalles.map(detalle => `
      SELECT pd.id_distribuidor
      FROM "ProductoDistribuidor" pd
      WHERE pd.id_productopresentacion = ${detalle.id_presentacion}
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

exports.getDistribuidoresCombinados = async (req, res) => {
  try {
    const pedidoDetalles = req.body; // Detalles del pedido
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    const combinaciones = [];
    const distribuidoresSeleccionados = [];

    // Iterar sobre cada detalle del pedido
    for (const detalle of pedidoDetalles) {
      console.log('Processing detail:', JSON.stringify(detalle, null, 2));

      // Validar que detalle.presentacion y detalle.cantidad existan y sean válidos
      if (!detalle.presentacion || !detalle.cantidad) {
        return res.status(400).json({ error: 'Datos faltantes en los detalles del pedido' });
      }

      const id_presentacion = parseInt(detalle.presentacion.id_presentacion, 10);
      const cantidad = parseInt(detalle.cantidad, 10);

      console.log('id_presentacion:', id_presentacion, 'cantidad:', cantidad);

      // Validar que id_presentacion y cantidad sean números válidos
      if (isNaN(id_presentacion) || isNaN(cantidad)) {
        return res.status(400).json({ error: 'Datos inválidos en los detalles del pedido' });
      }

      // Consulta para obtener distribuidores con suficiente stock del producto
      const query = `
        SELECT pd.id_distribuidor, pd.stock, d.*
        FROM "ProductoDistribuidor" pd
        JOIN "Distribuidor" d ON pd.id_distribuidor = d.id_distribuidor
        WHERE pd.id_productopresentacion = :id_presentacion
        AND d.disponibilidad = 'Libre'
        ORDER BY pd.stock DESC
      `;

      console.log('Executing query with id_presentacion:', id_presentacion);

      // Ejecutar la consulta con parámetros
      const distribuidores = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { id_presentacion }
      });

      console.log('Distribuidores encontrados:', JSON.stringify(distribuidores, null, 2));

      let totalStock = 0;

      // Iterar sobre los distribuidores y acumular el stock hasta cumplir la cantidad requerida
      for (const distribuidor of distribuidores) {
        if (totalStock >= cantidad) break;
        distribuidoresSeleccionados.push(distribuidor);
        totalStock += distribuidor.stock;
      }

      // Si el total del stock acumulado es menor a la cantidad requerida, no es posible cumplir el pedido
      if (totalStock < cantidad) {
        return res.status(200).json({
          mensaje: 'No hay suficientes distribuidores para cumplir con este pedido',
          combinaciones: any
        });
      }

      // Agregar la combinación de distribuidores seleccionados a la lista de combinaciones
      //combinaciones.push(distribuidoresSeleccionados);
    }

    console.log('COMBINACIONES:', distribuidoresSeleccionados);
    // Devolver las combinaciones de distribuidores
    res.status(200).json(distribuidoresSeleccionados);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};



exports.getDistributorLocation = (req, res) => {
  // Simulación de obtención de ubicación del distribuidor
  // En una aplicación real, podrías utilizar una IP geolocation API u obtener la ubicación del navegador
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        res.status(200).json({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        res.status(500).json({ error: "Geolocation error: " + error.message });
      }
    );
  } else {
    res.status(500).json({ error: "Geolocation not supported by this browser." });
  }
};

function generateUsername(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  for (let i = 0; i < length; i++) {
    username += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return username;
}

function generatePassword(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

async function isUsernameTaken(username) {
  const distribuidor = await Distribuidor.findOne({ where: { username } });
  const cliente = await Cliente.findOne({ where: { username } });
  return distribuidor || cliente;
}
