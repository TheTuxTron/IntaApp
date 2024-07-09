const Barrio = require('../models/Barrio');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

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
    const [results, metadata] = await sequelize.query(`
      SELECT 
  "Barrio".id_barrio, 
  "Barrio".nombre AS barrioNombre, 
  "Barrio".descripcion, 
  "Barrio".ubicacion, 
  "Parroquia".nombre AS parroquiaNombre
FROM "Barrio"
INNER JOIN "Parroquia" ON "Barrio".id_parroquia = "Parroquia".id_parroquia;

    `);
    res.status(200).json(results);
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
