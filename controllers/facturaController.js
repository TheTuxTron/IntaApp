const Factura = require('../models/Factura');

exports.createFactura = async (req, res) => {
  try {
    const newFactura = await Factura.create(req.body);
    res.status(201).json(newFactura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll();
    res.status(200).json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFacturaById = async (req, res) => {
  try {
    const id = req.params.id;
    const factura = await Factura.findOne({ where: { id_factura: id } });
    res.status(200).json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFacturaById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const factura = await Factura.update(payload, { where: { id_factura: id } });
    res.status(200).json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFacturaById = async (req, res) => {
  try {
    const id = req.params.id;
    await Factura.destroy({ where: { id_factura: id } });
    res.status(200).json({ message: 'Factura deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
