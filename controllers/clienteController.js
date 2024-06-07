const Cliente = require('../models/Cliente');

exports.createCliente = async (req, res) => {
  try {
    const newCliente = await Cliente.create(req.body);
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
