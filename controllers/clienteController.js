const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

exports.createCliente = async (req, res) => {
  try {
    const { id_barrio, cedula, nombre, apellido, direccion, telefono, email, username, password } = req.body;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCliente = await Cliente.create({
      id_barrio,
      cedula,
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      username,
      password: hashedPassword
    });

    res.status(201).json(newCliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Cliente.findOne({ where: { id_cliente: id } });

    if (cliente) {
      const { password, ...clienteSinPassword } = cliente.toJSON();
      res.status(200).json(clienteSinPassword);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClienteById = async (req, res) => {
  try {
    const id = req.params.id;
    let payload = req.body;

    if (payload.password) {
      const cliente = await Cliente.findOne({ where: { id_cliente: id } });
      if (cliente) {
        const passwordMatches = bcrypt.compareSync(payload.password, cliente.password);
        if (!passwordMatches) {
          payload.password = await bcrypt.hash(payload.password, 10);
        }
      }
    }

    await Cliente.update(payload, { where: { id_cliente: id } });
    res.status(200).json({ message: 'Cliente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClienteById = async (req, res) => {
  try {
    const id = req.params.id;
    await Cliente.destroy({ where: { id_cliente: id } });
    res.status(200).json({ message: 'Cliente deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.params; // Obtener el username desde los parámetros de la solicitud
    const cliente = await Cliente.findOne({ where: { username } });

    if (cliente) {
      res.status(200).json(true); // Devolver true si el username existe
    } else {
      res.status(200).json(false); // Devolver false si el username no existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkUsernameForUpdate = async (req, res) => {
  try {
    const { username, id } = req.params;
    const cliente = await Cliente.findOne({
      where: {
        username,
        id_cliente: {
          [Sequelize.Op.ne]: id // Asegurarse de que el cliente encontrado no sea el mismo que está realizando la actualización
        }
      }
    });

    if (cliente) {
      res.status(200).json(true); // Devolver true si el username está en uso por otro cliente
    } else {
      res.status(200).json(false); // Devolver false si el username no está en uso
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkCedula = async (req, res) => {
  try {
    const { cedula } = req.params; // Obtener la cédula desde los parámetros de la solicitud
    const cliente = await Cliente.findOne({ where: { cedula } });

    if (cliente) {
      res.status(200).json(true); // Devolver true si la cédula existe
    } else {
      res.status(200).json(false); // Devolver false si la cédula no existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getClientLocation = (req, res) => {
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

exports.getFacturaByClienteId = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const results = await sequelize.query(`
      SELECT
        f.id_factura,
        f.fecha AS fechaFactura,
        f.numfactura,
        f.iva,
        f.subtotal,
        f.valortotal,
        p.id_pedido,
        p.fecha AS fechaPedido,
        p.ubicacion,
        c.id_cliente,
        c.nombre AS nombreCliente,
        c.direccion AS direccionCliente,
        dp.id_detalle,
        dp.cantidad,
        dp.total AS totalDetalle
      FROM "Factura" AS f
      INNER JOIN "Pedido" AS p ON f.id_pedido = p.id_pedido
      INNER JOIN "Cliente" AS c ON p.id_cliente = c.id_cliente
      LEFT JOIN "DetallePedido" AS dp ON p.id_pedido = dp.id_pedido
      WHERE c.id_cliente = :id_cliente;
    `, {
      replacements: { id_cliente: id_cliente },
      type: sequelize.QueryTypes.SELECT
    });
    console.log(results)
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFacturaDetalleById = async (req, res) => {
  const { id_factura } = req.params;

  try {
    const results = await sequelize.query(`
      SELECT
        f.id_factura,
        f.fecha AS fechaFactura,
        f.numfactura,
        f.iva,
        f.subtotal,
        f.valortotal,
        p.id_pedido,
        p.fecha AS fechaPedido,
        p.ubicacion,
        c.id_cliente,
        c.nombre AS nombreCliente,
        c.apellido AS apellidoCliente,
        c.cedula AS cedulaCliente,
        c.direccion AS direccionCliente,
        c.telefono AS telefonoCliente,
        c.email AS emailCliente,
        dp.id_detalle,
        dp.cantidad,
        dp.total AS totalDetalle,
        pr.nombre AS producto,
        prp.nombre AS presentacion,
        pd.precio
      FROM "Factura" AS f
      INNER JOIN "Pedido" AS p ON f.id_pedido = p.id_pedido
      INNER JOIN "Cliente" AS c ON p.id_cliente = c.id_cliente
      LEFT JOIN "DetallePedido" AS dp ON p.id_pedido = dp.id_pedido
      LEFT JOIN "ProductoDistribuidor" AS pd ON dp.id_productodistribuidor = pd.id_productodistribuidor
      LEFT JOIN "ProductoPresentacion" AS pp ON pd.id_productopresentacion = pp.id_productopresentacion
      LEFT JOIN "Producto" AS pr ON pp.id_producto = pr.id_producto
      LEFT JOIN "Presentacion" AS prp ON pp.id_presentacion = prp.id_presentacion
      WHERE f.id_factura = :id_factura;
    `, {
      replacements: { id_factura: id_factura },
      type: sequelize.QueryTypes.SELECT
    });
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
