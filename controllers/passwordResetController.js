const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Cliente = require('../models/Cliente');
const PasswordResetToken = require('../models/PasswordResetToken');

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const cliente = await Cliente.findOne({ where: { email } });
    
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expireTime = Date.now() + 3600000; // 1 hour

    await PasswordResetToken.create({
      clienteId: cliente.id_cliente,
      token,
      expireTime
    });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'tuemail@gmail.com',
        pass: 'tupassword'
      }
    });

    const mailOptions = {
      to: email,
      from: 'tuemail@gmail.com',
      subject: 'Recuperación de Contraseña',
      text: `Has recibido este correo porque tú (o alguien más) ha solicitado la recuperación de la contraseña de tu cuenta.\n\n` +
            `Por favor, haz clic en el siguiente enlace, o copia y pega en tu navegador para completar el proceso:\n\n` +
            `http://localhost:4200/reset-password/${token}\n\n` +
            `Si no solicitaste esto, ignora este correo y tu contraseña no cambiará.\n`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
