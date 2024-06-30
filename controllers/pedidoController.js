const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('../models/Pedido');
const DetallePedido = require('../models/DetallePedido');
const ProductoDistribuidor = require('../models/ProductoDistribuidor');
const ProductoPresentacion = require('../models/ProductoPresentacion');
const Producto = require('../models/Producto');

exports.createPedido = async (req, res) => {
  try {
    const { id_cliente, id_distribuidor, ubicacion, detalles } = req.body;

    const newPedido = await Pedido.create({
      id_cliente,
      id_estadopedido: 1, // Estado inicial del pedido (Pendiente)
      fecha: new Date(),
      ubicacion,
      id_distribuidor
    });

    for (const detalle of detalles) {
      console.log("Detalles recibidos:", detalle);

      // Obtener el id_productopresentacion basado en id_producto y id_presentacion
      const productoPresentacion = await ProductoPresentacion.findOne({
        where: {
          id_producto: detalle.id_producto,
          id_presentacion: detalle.id_presentacion
        }
      });

      if (!productoPresentacion) {
        console.error('Producto y presentación no coinciden', detalle);
        throw new Error('Producto y presentación no coinciden');
      }

      console.log("ProductoPresentacion encontrado:", productoPresentacion);

      const productoDistribuidor = await ProductoDistribuidor.findOne({
        where: {
          id_productopresentacion: productoPresentacion.id_productopresentacion,
          id_distribuidor: id_distribuidor
        }
      });

      if (!productoDistribuidor) {
        console.error('ProductoDistribuidor no encontrado', productoPresentacion.id_productopresentacion, id_distribuidor);
        throw new Error('ProductoDistribuidor no encontrado');
      }

      console.log("ProductoDistribuidor encontrado:", productoDistribuidor);

      await DetallePedido.create({
        id_pedido: newPedido.id_pedido,
        id_productodistribuidor: productoDistribuidor.id_productodistribuidor,
        cantidad: detalle.cantidad,
        total: detalle.cantidad * productoDistribuidor.precio
      });

      // Actualizar stock del producto
      productoDistribuidor.stock -= detalle.cantidad;
      await productoDistribuidor.save();
    }

    res.status(201).json(newPedido);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: error.message });
  }
};




/*
exports.createPedido = async (req, res) => {
  try {


    const { id_cliente, ubicacion, detalles, distribuidor } = req.body;

    const newPedido = await Pedido.create({
      id_cliente,
      id_estadopedido: 1, // Estado inicial del pedido (Pendiente)
      fecha: new Date(),
      ubicacion
    });

    console.log("producto presentacion", detalles);
    console.log("producto", detalles.producto.id_producto);
    console.log("presentacion", detalles.presentacion.id_presentacion);
    console.log("distribuidor", distribuidor.id_distribuidor);
    detalles.forEach(async element => {
      console.log(element);
      const detail = await DetallePedido.create({
        id_pedido: newPedido.id_pedido,
        id_productodistribuidor: element.producto.id_producto,
        cantidad: element.cantidad,
        total: element.cantidad * element.precio
      });
      /* PARA RESTAR EL STOCK *//*
console.log("detalle", detail);
// const producto = await ProductoDistribuidor.findByPk(detail.id_productodistribuidor);
// console.log("producto", producto);
// producto.stock -= detail.cantidad;
// await producto.save();
});


res.status(201).json(newPedido);
} catch (error) {
res.status(500).json({ error: error.message });
}
};
*/
exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = await Pedido.findOne({ where: { id_pedido: id } });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const pedido = await Pedido.update(payload, { where: { id_pedido: id } });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePedidoById = async (req, res) => {
  try {
    const id = req.params.id;
    await Pedido.destroy({ where: { id_pedido: id } });
    res.status(200).json({ message: 'Pedido deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//pedidios con el id del distribuidor  , pedidos con estadon 1
exports.getPedidosPendientes = async (req, res) => {
  const { id_distribuidor } = req.params;

  console.log("distribuidor", req.params);
  try {
    const pedidos = await sequelize.query(
      `SELECT DISTINCT p.id_pedido, p.id_estadopedido, p.id_cliente, p.fecha, p.ubicacion
FROM "Pedido" p
JOIN (
  SELECT dp.id_pedido
  FROM "DetallePedido" dp
  JOIN "ProductoDistribuidor" pd ON pd.id_productodistribuidor = dp.id_productodistribuidor
  WHERE pd.id_distribuidor = :id_distribuidor
) subquery ON subquery.id_pedido = p.id_pedido
WHERE p.id_estadopedido = 1;`, // Estado 'Pendiente'
      {
        replacements: { id_distribuidor },
        type: QueryTypes.SELECT
      }
    );

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
exports.getPedidosPendientes = async (req, res) => {
  const { id_distribuidor } = req.params;

  try {
    const pedidos = await Pedido.findAll({
      where: {
        id_distribuidor,
        id_estadopedido: 1 // Pendiente
      },
      include: [
        { model: DetallePedido, include: [{ model: Producto, include: [Producto] }] }
      ]
    });

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/
exports.updateEstadoPedido = async (req, res) => {
  const { id_pedido } = req.params;
  const { id_estadopedido } = req.body;

  try {
    await Pedido.update({ id_estadopedido }, { where: { id_pedido } });
    res.status(200).json({ message: 'Estado del pedido actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


