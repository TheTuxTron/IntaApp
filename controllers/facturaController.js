const DetallePedido = require('../models/DetallePedido');
const Factura = require('../models/Factura');
const Pedido = require('../models/Pedido');
const ProductoDistribuidor = require('../models/ProductoDistribuidor');
const ProductoPresentacion = require('../models/ProductoPresentacion');
const Producto = require('../models/Producto');
const Presentacion = require('../models/Presentacion');

exports.createFactura = async (req, res) => {
  try {
    const idPedido = req.params.id;
    console.log("iva", req.body);
    const pedido = await Pedido.findByPk(idPedido);
    const detalles = await DetallePedido.findAll({
      where: { id_pedido: idPedido },
      include: [{
        model: ProductoDistribuidor,
        include: [{
          model: ProductoPresentacion,
          include: [Producto, Presentacion]
        }]
      }]
    });

    let subtotal = 0;
    detalles.forEach(detalle => {
      subtotal += parseFloat(detalle.total);
    });
    // Suponiendo que req.body tiene el objeto pedido recibido


    // Accediendo al valor de IVA
    const iva1 = req.body.iva;

    console.log("El valor de IVA es:", iva1);
    subtotal = parseFloat(subtotal);
    console.log("subtotal", subtotal);
    const iva = subtotal * iva1; // Suponiendo un 12% de IVA
    console.log("iva", iva);
    const valortotal = subtotal + iva;
    console.log("itotalva", valortotal);

    // Obtener la última factura
    const ultimaFactura = await Factura.findOne({
      order: [['id_factura', 'DESC']]
    });

    let siguienteNumero = 1; // Valor predeterminado si no hay facturas previas

    if (ultimaFactura && typeof ultimaFactura.numfactura === 'number') {
      siguienteNumero = ultimaFactura.numfactura + 1;
    }


    const newFactura = ({
      id_pedido: idPedido,
      fecha: new Date(),
      iva: iva,
      numfactura: siguienteNumero,
      subtotal: subtotal,
      valortotal: valortotal,
      metodo_pago: 1 // Asumiendo efectivo como método de pago
    });
    await Factura.create(newFactura);
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
