const EstadoSolicitud = require('../models/EstadoSolicitud');

exports.createEstadoSolicitud = async (req, res) => {
  try {
    console.log(req.body);
    const newEstadoSolicitud = await EstadoSolicitud.create(req.body);
    console.log("devuelve",newEstadoSolicitud);
    res.status(201).json(newEstadoSolicitud);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEstadoSolicitudes = async (req, res) => {
  try {
    const estadoSolicitudes = await EstadoSolicitud.findAll();
    res.status(200).json(estadoSolicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEstadoSolicitudById = async (req, res) => {
  try {
    const id = req.params.id;
    const estadoSolicitud = await EstadoSolicitud.findOne({ where: { id_estadosolicitud: id } });
    res.status(200).json(estadoSolicitud);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEstadoSolicitudById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const estadoSolicitud = await EstadoSolicitud.update(payload, { where: { id_estadosolicitud: id } });
    res.status(200).json(estadoSolicitud);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEstadoSolicitudById = async (req, res) => {
  try {
    const id = req.params.id;
    await EstadoSolicitud.destroy({ where: { id_estadosolicitud: id } });
    res.status(200).json({ message: 'EstadoSolicitud deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 