const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

exports.createAdmin = async (req, res) => {
  try {
    const { nombre, apellido, direccion, telefono, email, username, password } = req.body;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      username,
      password: hashedPassword
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOne({ where: { id_admin: id } });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const admin = await Admin.update(payload, { where: { id_admin: id } });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    await Admin.destroy({ where: { id_admin: id } });
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIva = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (admin) {
      res.status(200).json({ iva: admin.iva });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};