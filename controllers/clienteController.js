const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');

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
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClienteById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const cliente = await Cliente.update(payload, { where: { id_cliente: id } });
    res.status(200).json(cliente);
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