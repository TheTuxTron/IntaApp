const Cliente = require('../models/Cliente');
const Distribuidor = require('../models/Distribuidor');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');
const cCliente = require('../controllers/clienteController');


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

    if (password != user.password) {
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

exports.recoverAccount = async (req, res) => {
  try {
    const { email } = req.body;
    const cliente = await Cliente.findOne({ where: { email } });

    if (!cliente) {
      return res.status(404).json({ error: 'Correo no registrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    cliente.resetPasswordToken = token;
    cliente.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await cliente.save();

    const resetLink = `http://localhost:4200/reset-password/${token}`;
    sendEmail(email, 'Recuperar Cuenta', 'recover', { resetLink });

    res.status(200).json({ message: 'Correo enviado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const cliente = await Cliente.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!cliente) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    cliente.password = hashedPassword;
    cliente.resetPasswordToken = null;
    cliente.resetPasswordExpires = null;
    await cliente.save();

    res.status(200).json({ message: 'Contraseña actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

