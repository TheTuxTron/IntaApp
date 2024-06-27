const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('../models/Producto');
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
    const productos = await Producto.findAll({
      include: [
        { model: Presentacion, as: 'Presentacion', attributes: ['nombre', 'precio'] }
        //{ model: Distribuidor, as: 'Distribuidor', attributes: ['nombre'] }
      ]
    });
    
    const productosConPresentacion = productos.map(producto => ({
      ...producto.toJSON(),
      presentacionNombre: producto.Presentacion ? producto.Presentacion.nombre : 'N/A',
      precio: producto.Presentacion ? producto.Presentacion.precio : 'N/A',
      //distribuidorNombre: producto.Distribuidor ? producto.Distribuidor.nombre: 'N/A'
    }));
    res.status(200).json(productosConPresentacion);
    //res.status(200).json(productosConDistribuidor);
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

exports.obtenerPresentacionPorProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;

    // Consulta SQL cruda
    const result = await sequelize.query(
      `SELECT "Presentacion".nombre, "Presentacion".precio 
       FROM "Producto"
       INNER JOIN "Presentacion" ON "Producto".id_presentacion = "Presentacion".id_presentacion
       WHERE "Producto".id_producto = :id_producto`,
      {
        replacements: { id_producto: id_producto },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPresentacionesPorNombreProducto = async (req, res) => {
  try {
    const nombre_producto = req.params.nombre_producto;

    const result = await sequelize.query(
      `SELECT "Presentacion".id_presentacion, "Presentacion".nombre, "Presentacion".precio 
       FROM "Presentacion"
       INNER JOIN "Producto" ON "Producto".id_presentacion = "Presentacion".id_presentacion
       WHERE "Producto".nombre = :nombre_producto`,
      {
        replacements: { nombre_producto: nombre_producto },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Presentaciones no encontradas para el producto' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
