const Parroquia = require('../models/Parroquia');

exports.createParroquia = async (req, res) => {
  try {
    const newParroquia = await Parroquia.create(req.body);
    console.log(req.body);
    res.status(201).json(newParroquia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllParroquias = async (req, res) => {
  try {
    const parroquias = await Parroquia.findAll();
    res.status(200).json(parroquias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getParroquiaById = async (req, res) => {
  try {
    const id = req.params.id;
    const parroquia = await Parroquia.findOne({ where: { id_parroquia: id } });
    res.status(200).json(parroquia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateParroquiaById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const parroquia = await Parroquia.update(payload, { where: { id_parroquia: id } });
    res.status(200).json(parroquia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteParroquiaById = async (req, res) => {
  try {
    const id = req.params.id;
    await Parroquia.destroy({ where: { id_parroquia: id } });
    res.status(200).json({ message: 'Parroquia deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
