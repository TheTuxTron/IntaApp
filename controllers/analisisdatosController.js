const AnalisisDatos = require('../models/AnalisisDatos');

exports.createAnalisisDatos = async (req, res) => {
  try {
    const newAnalisisDatos = await AnalisisDatos.create(req.body);
    res.status(201).json(newAnalisisDatos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAnalisisDatos = async (req, res) => {
  try {
    const analisisDatos = await AnalisisDatos.findAll();
    res.status(200).json(analisisDatos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalisisDatosById = async (req, res) => {
  try {
    const id = req.params.id;
    const analisisDatos = await AnalisisDatos.findOne({ where: { id_analisis: id } });
    res.status(200).json(analisisDatos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnalisisDatosById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const analisisDatos = await AnalisisDatos.update(payload, { where: { id_analisis: id } });
    res.status(200).json(analisisDatos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnalisisDatosById = async (req, res) => {
  try {
    const id = req.params.id;
    await AnalisisDatos.destroy({ where: { id_analisis: id } });
    res.status(200).json({ message: 'AnalisisDatos deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
