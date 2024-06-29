const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('../models/Producto');
const ProductoPresentacion  = require('../models/ProductoPresentacion');
const Presentacion= require('../models/Presentacion');
//const Distribuidor = require('../models/Distribuidor');

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

exports.verificarProductoPorNombre = async (req, res) => {
  try {
    const producto = await Producto.findOne({ where: { nombre: req.params.nombre } });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProductosConPresentaciones = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        {
          model: ProductoPresentacion,
          include: [Presentacion]
        }
      ]
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPresentacionesPorProducto = async (req, res) => {
  try {
    const id_producto = req.params.id;
    const presentaciones = await ProductoPresentacion.findAll({
      where: { id_producto },
      include: [Presentacion]
    });
    res.status(200).json(presentaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

