// src/config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',               // Indicamos que usamos SQLite
  storage: './database.sqlite',    // Archivo donde se guardarán los datos
  logging: false,                  // Para no mostrar consultas SQL en consola
  define: {
    freezeTableName: true,         // Evita que Sequelize pluralice los nombres de tablas
    timestamps: false              // No crea automáticamente campos createdAt y updatedAt
  }
});

module.exports = sequelize;
