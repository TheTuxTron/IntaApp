const Pedido = require('../models/Pedido');

exports.createPedido = async (req, res) => {
  try {
    const { id_cliente, ubicacion, detalles } = req.body;

    const newPedido = await Pedido.create({
      id_cliente,
      id_estadopedido: 1, // Estado inicial del pedido (Pendiente)
      fecha: new Date(),
      ubicacion
    });

    for (const detalle of detalles) {
      await DetallePedido.create({
        id_pedido: newPedido.id_pedido,
        id_producto: detalle.producto.id_producto,
        cantidad: detalle.cantidad,
        total: detalle.cantidad * detalle.producto.precio
      });

      // Actualizar stock del producto
      const producto = await Producto.findByPk(detalle.producto.id_producto);
      producto.stock -= detalle.cantidad;
      await producto.save();
    }

    res.status(201).json(newPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
