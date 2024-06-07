const MetodoPagoPaypal = require('../models/MetodoPagoPaypal');

exports.createMetodoPagoPaypal = async (req, res) => {
  try {
    const newMetodoPagoPaypal = await MetodoPagoPaypal.create(req.body);
    res.status(201).json(newMetodoPagoPaypal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMetodoPagoPaypals = async (req, res) => {
  try {
    const metodoPagoPaypals = await MetodoPagoPaypal.findAll();
    res.status(200).json(metodoPagoPaypals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMetodoPagoPaypalById = async (req, res) => {
  try {
    const id = req.params.id;
    const metodoPagoPaypal = await MetodoPagoPaypal.findOne({ where: { id_metodopago2: id } });
    res.status(200).json(metodoPagoPaypal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMetodoPagoPaypalById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const metodoPagoPaypal = await MetodoPagoPaypal.update(payload, { where: { id_metodopago2: id } });
    res.status(200).json(metodoPagoPaypal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMetodoPagoPaypalById = async (req, res) => {
  try {
    const id = req.params.id;
    await MetodoPagoPaypal.destroy({ where: { id_metodopago2: id } });
    res.status(200).json({ message: 'MetodoPagoPaypal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
