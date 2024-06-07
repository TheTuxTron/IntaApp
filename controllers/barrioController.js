const Barrio = require('../models/Barrio');

exports.createBarrio = async (req, res) => {
  try {
    const newBarrio = await Barrio.create(req.body);
    res.status(201).json(newBarrio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBarrios = async (req, res) => {
  try {
    const barrios = await Barrio.findAll();
    res.status(200).json(barrios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBarrioById = async (req, res) => {
  try {
    const id = req.params.id;
    const barrio = await Barrio.findOne({ where: { id_barrio: id } });
    res.status(200).json(barrio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBarrioById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const barrio = await Barrio.update(payload, { where: { id_barrio: id } });
    res.status(200).json(barrio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBarrioById = async (req, res) => {
  try {
    const id = req.params.id;
    await Barrio.destroy({ where: { id_barrio: id } });
    res.status(200).json({ message: 'Barrio deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
