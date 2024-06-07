const Ruta = require('../models/Ruta');

exports.createRuta = async (req, res) => {
  try {
    const newRuta = await Ruta.create(req.body);
    res.status(201).json(newRuta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRutas = async (req, res) => {
  try {
    const rutas = await Ruta.findAll();
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRutaById = async (req, res) => {
  try {
    const id = req.params.id;
    const ruta = await Ruta.findOne({ where: { id_ruta: id } });
    res.status(200).json(ruta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRutaById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const ruta = await Ruta.update(payload, { where: { id_ruta: id } });
    res.status(200).json(ruta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRutaById = async (req, res) => {
  try {
    const id = req.params.id;
    await Ruta.destroy({ where: { id_ruta: id } });
    res.status(200).json({ message: 'Ruta deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
