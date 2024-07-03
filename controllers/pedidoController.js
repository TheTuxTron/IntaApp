const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('../models/Pedido');
const DetallePedido = require('../models/DetallePedido');
const ProductoDistribuidor = require('../models/ProductoDistribuidor');
const ProductoPresentacion = require('../models/ProductoPresentacion');
const Producto = require('../models/Producto');
const Presentacion = require('../models/Presentacion')

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

      // // Actualizar stock del producto
      // productoDistribuidor.stock -= detalle.cantidad;
      // await productoDistribuidor.save();
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
    console.log("estado pedido recibido", payload.id_estadopedido);

    const pedido = await Pedido.update(payload, { where: { id_pedido: id } });
    console.log("pedido actualizado", pedido);

    if (payload.id_estadopedido == 3) { // entregado, se actualiza el stock
      console.log("entra en el if de estado entregado");

      const query = `
        SELECT dp.id_detalle, dp.cantidad, pd.id_productodistribuidor, pd.stock, pp.id_productopresentacion, pr.id_producto, pt.id_presentacion
        FROM "DetallePedido" dp
        JOIN "ProductoDistribuidor" pd ON dp.id_productodistribuidor = pd.id_productodistribuidor
        JOIN "ProductoPresentacion" pp ON pd.id_productopresentacion = pp.id_productopresentacion
        JOIN "Producto" pr ON pp.id_producto = pr.id_producto
        JOIN "Presentacion" pt ON pp.id_presentacion = pt.id_presentacion
        WHERE dp.id_pedido = :id_pedido;
      `;

      const detalles = await sequelize.query(query, {
        replacements: { id_pedido: id },
        type: QueryTypes.SELECT
      });

      if (!pedido) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
      console.log("pedido encontrado", pedido);
      console.log("Detalles del pedido", detalles);

      // Actualizar el stock y el distribuidor en los detalles del pedido
      for (const detalle of detalles) {
        console.log("Detalle actual", detalle);
        const productoDistribuidor = await ProductoDistribuidor.findByPk(detalle.id_productodistribuidor);
        if (!productoDistribuidor) {
          console.error('ProductoDistribuidor no encontrado', detalle.id_productodistribuidor);
          throw new Error('ProductoDistribuidor no encontrado');
        }
        console.log("ProductoDistribuidor antes de actualizar", productoDistribuidor);
        productoDistribuidor.stock -= detalle.cantidad;
        await productoDistribuidor.save();
        console.log("ProductoDistribuidor después de actualizar", productoDistribuidor);
      }
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.error("Error en updatePedidoById:", error);
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

exports.reasignarDistribuidor = async (req, res) => {
  const { id_pedido } = req.params;
  const { id_distribuidor_actual } = req.body;

  try {
    // Obtener el pedido y sus detalles
    const pedido = await Pedido.findOne({
      where: { id_pedido },
      include: [
        {
          model: DetallePedido,
          include: [
            {
              model: ProductoDistribuidor,
              include: [
                {
                  model: ProductoPresentacion,
                  include: [Producto, Presentacion]
                }
              ]
            }
          ]
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Verificar disponibilidad de otros distribuidores
    const detalles = pedido.DetallePedidos.map(detalle => ({
      id_producto: detalle.ProductoDistribuidor.ProductoPresentacion.id_producto,
      id_presentacion: detalle.ProductoDistribuidor.ProductoPresentacion.id_presentacion,
      cantidad: detalle.cantidad
    }));

    const distribuidoresDisponibles = await sequelize.query(
      `SELECT d.id_distribuidor, d.nombre, COUNT(pd.id_productodistribuidor) AS disponibles
       FROM "Distribuidor" d
       JOIN "ProductoDistribuidor" pd ON d.id_distribuidor = pd.id_distribuidor
       WHERE d.id_distribuidor != :id_distribuidor_actual
       AND pd.id_productopresentacion IN (:productopresentaciones)
       AND pd.stock >= :cantidad
       GROUP BY d.id_distribuidor
       HAVING COUNT(pd.id_productodistribuidor) = :detallesCount`,
      {
        replacements: {
          id_distribuidor_actual,
          productopresentaciones: detalles.map(d => d.id_productopresentacion),
          cantidad: Math.max(...detalles.map(d => d.cantidad)),
          detallesCount: detalles.length
        },
        type: QueryTypes.SELECT
      }
    );

    if (distribuidoresDisponibles.length === 0) {
      return res.status(404).json({ error: 'No hay otros distribuidores disponibles' });
    }

    // Asignar nuevo distribuidor
    const nuevoDistribuidor = distribuidoresDisponibles[0].id_distribuidor;
    await Pedido.update({ id_distribuidor: nuevoDistribuidor }, { where: { id_pedido } });

    res.status(200).json({ message: 'Distribuidor reasignado exitosamente', nuevoDistribuidor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


async function notificarCliente(id_cliente, mensaje) {
  // Implementar la lógica de notificación, ya sea por correo electrónico o en la interfaz de usuario
  console.log(`Notificación al cliente ${id_cliente}: ${mensaje}`);
}



exports.updateEstadoPedido = async (req, res) => {
  const { id_pedido } = req.params;
  const { id_estadopedido, id_cliente } = req.body;
  console.log("idpedido", req.params.id_pedido);
  try {
    await Pedido.update({ id_estadopedido }, { where: { id_pedido } });

    if (id_estadopedido === 6) { // Rechazado
      await reasignarPedido(id_pedido, id_cliente);
    }

    if (id_estadopedido === 3) {//entregado  se actualiza el stock
      const pedido = await Pedido.findByPk(id_pedido);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      // Actualizar el stock y el distribuidor en los detalles del pedido
      for (const detalle of detalles) {
        const productoDistribuidor = await ProductoDistribuidor.findOne({
          where: {
            id_productopresentacion: detalle.id_presentacion,
            id_distribuidor: id_distribuidor
          }
        });

        if (!productoDistribuidor) {
          throw new Error('ProductoDistribuidor no encontrado para el nuevo distribuidor');
        }



        //Actualizar el stock del nuevo distribuidor
        productoDistribuidor.stock -= detalle.cantidad;
        await productoDistribuidor.save();
      }

    }


    res.status(200).json({ message: 'Estado del pedido actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPedidosCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const resultados = await sequelize.query(
      `SELECT 
        p.id_pedido, 
        p.id_estadopedido, 
        p.id_cliente, 
        p.fecha, 
        p.ubicacion,
        dp.id_detalle, 
        dp.cantidad, 
        dp.total,
        pd.id_productodistribuidor, 
        pd.stock, 
        pd.precio,
        pp.id_productopresentacion, 
        pp.id_producto, 
        pp.id_presentacion,
        pr.nombre AS producto_nombre, 
        pr.descripcion AS producto_descripcion,
        pt.nombre AS presentacion_nombre, 
        pt.descripcion AS presentacion_descripcion
      FROM "Pedido" p
      JOIN "DetallePedido" dp ON dp.id_pedido = p.id_pedido
      JOIN "ProductoDistribuidor" pd ON pd.id_productodistribuidor = dp.id_productodistribuidor
      JOIN "ProductoPresentacion" pp ON pp.id_productopresentacion = pd.id_productopresentacion
      JOIN "Producto" pr ON pr.id_producto = pp.id_producto
      JOIN "Presentacion" pt ON pt.id_presentacion = pp.id_presentacion
      WHERE p.id_cliente = :id_cliente`,
      {
        replacements: { id_cliente },
        type: QueryTypes.SELECT
      }
    );

    // Reorganizar los resultados en un formato adecuado
    const pedidosMap = new Map();

    resultados.forEach(row => {
      if (!pedidosMap.has(row.id_pedido)) {
        pedidosMap.set(row.id_pedido, {
          id_pedido: row.id_pedido,
          id_estadopedido: row.id_estadopedido,
          id_cliente: row.id_cliente,
          fecha: row.fecha,
          ubicacion: row.ubicacion,
          detalles: []
        });
      }

      pedidosMap.get(row.id_pedido).detalles.push({
        id_detalle: row.id_detalle,
        cantidad: row.cantidad,
        total: row.total,
        id_productodistribuidor: row.id_productodistribuidor,
        stock: row.stock,
        precio: row.precio,
        id_productopresentacion: row.id_productopresentacion,
        id_producto: row.id_producto,
        id_presentacion: row.id_presentacion,
        producto_nombre: row.producto_nombre,
        producto_descripcion: row.producto_descripcion,
        presentacion_nombre: row.presentacion_nombre,
        presentacion_descripcion: row.presentacion_descripcion
      });
    });

    const pedidos = Array.from(pedidosMap.values());

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDistribuidorPedido = async (req, res) => {
  const { id_pedido } = req.params;
  const { id_distribuidor, detalles } = req.body;

  try {
    // Obtener el pedido existente
    const pedido = await Pedido.findByPk(id_pedido);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Actualizar el distribuidor del pedido
    pedido.id_distribuidor = id_distribuidor;
    pedido.id_estadopedido = 1;
    await pedido.save();

    // Actualizar el stock y el distribuidor en los detalles del pedido
    for (const detalle of detalles) {
      const productoDistribuidor = await ProductoDistribuidor.findOne({
        where: {
          id_productopresentacion: detalle.id_presentacion,
          id_distribuidor: id_distribuidor
        }
      });

      if (!productoDistribuidor) {
        throw new Error('ProductoDistribuidor no encontrado para el nuevo distribuidor');
      }

      // Actualizar el detalle del pedido con el nuevo id_productodistribuidor
      await DetallePedido.update(
        { id_productodistribuidor: productoDistribuidor.id_productodistribuidor },
        { where: { id_detalle: detalle.id_detalle } }
      );

      // Actualizar el stock del nuevo distribuidor
      // productoDistribuidor.stock -= detalle.cantidad;
      // await productoDistribuidor.save();
    }

    res.status(200).json({ message: 'Distribuidor del pedido actualizado' });
  } catch (error) {
    console.error('Error al actualizar el distribuidor del pedido:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener pedidos en camino para un distribuidor específico
exports.getPedidosEnCamino = async (req, res) => {
  const { id_distribuidor } = req.params;

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
      WHERE p.id_estadopedido = 2;`, // Estado 'En camino'
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

// Obtener pedidos entregados para un distribuidor específico
exports.getPedidosEntregados = async (req, res) => {
  const { id_distribuidor } = req.params;

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
      WHERE p.id_estadopedido = 3 or p.id_estadopedido = 8;`, // Estado 'Entregado'
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

// Actualizar estado del pedido a Finalizado (7)
exports.finalizarPedido = async (req, res) => {
  const { id_pedido } = req.params;
  const { id_estadopedido } = req.body;

  try {
    await Pedido.update({ id_estadopedido: id_estadopedido }, { where: { id_pedido } });
    res.status(200).json({ message: 'Pedido finalizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.pagarPedido = async (req, res) => {
  const { id_pedido } = req.params;
  const { metodo } = req.body;

  try {
    // Aquí iría la lógica para procesar el pago según el método elegido
    // Por simplicidad, asumiremos que el pago siempre es exitoso

    res.status(200).json({ message: `Pago procesado exitosamente con ${metodo}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

