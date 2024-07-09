require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

module.exports = sendEmail;
