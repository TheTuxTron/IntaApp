const ProductoDistribuidor = require('../models/ProductoDistribuidor');

exports.createProductoDistribuidor = async (req, res) => {
  try {
    console.log(req.body);
    const newProductoDsitribuidor = await ProductoDistribuidor.create(req.body);
    res.status(201).json(newProductoDsitribuidor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProductoDistribuidores = async (req, res) => {
  try {
    const productoDistribuidoress = await ProductoDistribuidor.findAll();
    res.status(200).json(productoDistribuidoress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductoDistribuidorById = async (req, res) => {
  try {
    const id = req.params.id;
    const productoDistribuidor = await ProductoDistribuidor.findOne({ where: { id_productodistribuidor: id } });
    res.status(200).json(productoDistribuidor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductoDistribuidorById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const productoDistribuidor = await ProductoDistribuidor.update(payload, { where: { id_productodistribuidor: id } });
    res.status(200).json(productoDistribuidor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductoDistribuidorById = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductoDistribuidor.destroy({ where: { id_productodistribuidor: id } });
    res.status(200).json({ message: 'ProductoDistribuidor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
