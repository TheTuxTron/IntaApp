const ProductoPresentacion = require('../models/ProductoPresentacion');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

exports.createProductoPresentacion = async (req, res) => {
  try {
    console.log(req.body);
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
    console.log("producto", req.params.id_producto);
    console.log("presentacion", req.params.id_presentacion);
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

exports.getAllProductosPresentaciones = async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query(`
      SELECT 
        p.nombre as nombreP, p.descripcion as descripcionP,pr.nombre as presentacion, pp.imagen as imagen
      FROM public."Producto" AS p 
      INNER JOIN public."ProductoPresentacion" AS pp ON p.id_producto = pp.id_producto 
      INNER JOIN public."Presentacion" AS pr ON pp.id_presentacion = pr.id_presentacion;
    `);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};