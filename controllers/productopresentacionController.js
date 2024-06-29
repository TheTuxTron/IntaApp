const ProductoPresentacion = require('../models/ProductoPresentacion');

exports.createProductoPresentacion = async (req, res) => {
  try {
    const newProductoPresentacion = await ProductoPresentacion.create(req.body);
    res.status(201).json(newProductoPresentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProductoPresentaciones = async (req, res) => {
  try {
    const productoPresentaciones = await ProductoPresentacion.findAll();
    res.status(200).json(productoPresentaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductoPresentacionById = async (req, res) => {
  try {
    const id = req.params.id;
    const productoPresentacion = await ProductoPresentacion.findOne({ where: { id_productopresentacion: id } });
    res.status(200).json(productoPresentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductoPresentacionById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const productoPresentacion = await ProductoPresentacion.update(payload, { where: { id_productopresentacion: id } });
    res.status(200).json(productoPresentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductoPresentacionById = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductoPresentacion.destroy({ where: { id_productopresentacion: id } });
    res.status(200).json({ message: 'ProductoPresentacion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verificarProductoPresentacion = async (req, res) => {
  try {
    console.log("producto",req.params.id_producto);
    console.log("presentacion",req.params.id_presentacion);
    const productoPresentacion = await ProductoPresentacion.findOne({
      where: {
        id_producto: req.params.id_producto,
        id_presentacion: req.params.id_presentacion
      }
    });
    res.json(productoPresentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};