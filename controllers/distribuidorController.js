const bcrypt = require('bcrypt');
const Distribuidor = require('../models/Distribuidor');

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
