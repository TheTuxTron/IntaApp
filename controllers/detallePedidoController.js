const DetallePedido = require('../models/DetallePedido');

exports.createDetallePedido = async (req, res) => {
  try {
    const newDetallePedido = await DetallePedido.create(req.body);
    res.status(201).json(newDetallePedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDetallePedidos = async (req, res) => {
  try {
    const detallePedidos = await DetallePedido.findAll();
    res.status(200).json(detallePedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDetallePedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    const detallePedido = await DetallePedido.findOne({ where: { id_detalle: id } });
    res.status(200).json(detallePedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDetallePedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const detallePedido = await DetallePedido.update(payload, { where: { id_detalle: id } });
    res.status(200).json(detallePedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDetallePedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    await DetallePedido.destroy({ where: { id_detalle: id } });
    res.status(200).json({ message: 'DetallePedido deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
