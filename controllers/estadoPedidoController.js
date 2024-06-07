const EstadoPedido = require('../models/EstadoPedido');

exports.createEstadoPedido = async (req, res) => {
  try {
    const newEstadoPedido = await EstadoPedido.create(req.body);
    res.status(201).json(newEstadoPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEstadoPedidos = async (req, res) => {
  try {
    const estadoPedidos = await EstadoPedido.findAll();
    res.status(200).json(estadoPedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEstadoPedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    const estadoPedido = await EstadoPedido.findOne({ where: { id_estadopedido: id } });
    res.status(200).json(estadoPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEstadoPedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const estadoPedido = await EstadoPedido.update(payload, { where: { id_estadopedido: id } });
    res.status(200).json(estadoPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEstadoPedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    await EstadoPedido.destroy({ where: { id_estadopedido: id } });
    res.status(200).json({ message: 'EstadoPedido deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
