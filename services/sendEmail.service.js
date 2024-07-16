require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
});

// Configurar el uso de plantillas con Handlebars
transporter.use('compile', hbs({
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./templates'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./templates'),
  extName: '.hbs',
}));

const sendEmail = (to, subject, template, context) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to,
    subject,
    template,
    context,
    attachments: [{
      filename: 'logo.png',
      path: path.resolve('logo.png'),
      cid: 'logo' // CID necesario para referenciar la imagen en la plantilla
    }]
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
