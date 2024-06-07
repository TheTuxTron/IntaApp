const Presentacion = require('../models/Presentacion');

exports.createPresentacion = async (req, res) => {
  try {
    const newPresentacion = await Presentacion.create(req.body);
    res.status(201).json(newPresentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPresentaciones = async (req, res) => {
  try {
    const presentaciones = await Presentacion.findAll();
    res.status(200).json(presentaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPresentacionById = async (req, res) => {
  try {
    const id = req.params.id;
    const presentacion = await Presentacion.findOne({ where: { id_presentacion: id } });
    res.status(200).json(presentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePresentacionById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const presentacion = await Presentacion.update(payload, { where: { id_presentacion: id } });
    res.status(200).json(presentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePresentacionById = async (req, res) => {
  try {
    const id = req.params.id;
    await Presentacion.destroy({ where: { id_presentacion: id } });
    res.status(200).json({ message: 'Presentacion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
