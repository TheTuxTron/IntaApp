const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_USE_SQLITE === 'true') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Ruta al archivo SQLite
    logging: false // habilitar para hacer consultas sql en la consola
  });
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false // habilitar para hacer consultas sql en la consola
  });
}

module.exports = sequelize;
