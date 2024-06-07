const MetodoPagoEfectivo = require('../models/MetodoPagoEfectivo');

exports.createMetodoPagoEfectivo = async (req, res) => {
  try {
    const newMetodoPagoEfectivo = await MetodoPagoEfectivo.create(req.body);
    res.status(201).json(newMetodoPagoEfectivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMetodoPagoEfectivos = async (req, res) => {
  try {
    const metodoPagoEfectivos = await MetodoPagoEfectivo.findAll();
    res.status(200).json(metodoPagoEfectivos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMetodoPagoEfectivoById = async (req, res) => {
  try {
    const id = req.params.id;
    const metodoPagoEfectivo = await MetodoPagoEfectivo.findOne({ where: { id_pagoefectivo: id } });
    res.status(200).json(metodoPagoEfectivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMetodoPagoEfectivoById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const metodoPagoEfectivo = await MetodoPagoEfectivo.update(payload, { where: { id_pagoefectivo: id } });
    res.status(200).json(metodoPagoEfectivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMetodoPagoEfectivoById = async (req, res) => {
  try {
    const id = req.params.id;
    await MetodoPagoEfectivo.destroy({ where: { id_pagoefectivo: id } });
    res.status(200).json({ message: 'MetodoPagoEfectivo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
