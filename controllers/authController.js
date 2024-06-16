const Cliente = require('../models/Cliente');
const Distribuidor = require('../models/Distribuidor');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');
const cCliente=require('../controllers/clienteController');


const secretKey = 'secret_key'; // Debe ser una clave segura y almacenada en un entorno seguro

// Autenticación de Cliente
exports.loginCliente = async (req, res) => {
  try {
    const { username, password } = req.body;
    //console.log(req.body);
    const user = await Cliente.findOne({ where: { username } });
    //console.log("datos del cliente",user);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id_cliente, role: 'cliente' }, secretKey, { expiresIn: '1h' });

    const cliente = {
      id: user.id_cliente,
      username: user.username
    };

    res.status(200).json({ cliente, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Autenticación de Distribuidor
exports.loginDistribuidor = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await Distribuidor.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Distribuidor no encontrado' });
    }

    //const isMatch = await bcrypt.compare(password, user.password);
   
    if (password!=user.password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id_distribuidor, role: 'distribuidor' }, secretKey, { expiresIn: '1h' });

    const distribuidor = {
      id: user.id_distribuidor,
      username: user.username
    };

    res.status(200).json({ distribuidor, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Autenticación de Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Administrador no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id_admin, role: 'admin' }, secretKey, { expiresIn: '1h' });

    const admin = {
      id: user.id_admin,
      username: user.username
    };

    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
