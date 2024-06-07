const Producto = require('../models/Producto');

exports.createProducto = async (req, res) => {
  try {
    const newProducto = await Producto.create(req.body);
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Producto.findOne({ where: { id_producto: id } });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductoById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const producto = await Producto.update(payload, { where: { id_producto: id } });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductoById = async (req, res) => {
  try {
    const id = req.params.id;
    await Producto.destroy({ where: { id_producto: id } });
    res.status(200).json({ message: 'Producto deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
