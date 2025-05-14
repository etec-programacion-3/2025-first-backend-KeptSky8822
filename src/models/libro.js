const { DataTypes } = require('sequelize'); // Estamos definiendo que tipo de variables vamos a definir las columnas
const sequelize = require('../config/database'); // Nos conectaremos con Sequelize en la base de datos dentro /config

/**
 * Definición del modelo 'Libro' que representa la tabla 'libros' en la base de datos.
 * Cada propiedad corresponde a una columna con sus características y restricciones.
 */
const Libro = sequelize.define('Libro', {
  // Identificador único del libro, clave primaria autoincremental
  id: {
    type: DataTypes.INTEGER,      // Tipo entero
    primaryKey: true,             // Clave primaria
    autoIncrement: true,          // Se incrementa automáticamente con cada nuevo registro
  },

  // Título del libro, campo obligatorio de texto con máximo 255 caracteres
  titulo: {
    type: DataTypes.STRING(255), // Cadena de texto con longitud máxima 255
    allowNull: false,            // No puede ser nulo (es obligatorio)
  },

  // Autor del libro, campo obligatorio de texto con máximo 255 caracteres
  autor: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  // ISBN del libro, campo obligatorio, único, texto de máximo 13 caracteres
  isbn: {
    type: DataTypes.STRING(13),
    unique: true,                // No se permiten valores duplicados
    allowNull: false,
  },

  // Categoría o género del libro, campo obligatorio de texto con máximo 100 caracteres
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  // Estado del libro (por ejemplo: disponible, prestado), campo obligatorio con valor por defecto
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'disponible', // Valor por defecto si no se especifica
  },

  // Fecha y hora en que se creó el registro, asignada automáticamente al crear el registro
  fecha_creacion: {
    type: DataTypes.DATE,        // Tipo fecha y hora
    allowNull: false,
    defaultValue: DataTypes.NOW, // Se asigna la fecha y hora actual automáticamente
  },
}, {
  // Opciones del modelo

  timestamps: false,             // Desactiva los campos automáticos 'createdAt' y 'updatedAt'
  tableName: 'libros',           // Nombre explícito de la tabla en la base de datos
}); 

// Exportamos el modelo para usarlo en otras partes de la aplicación
module.exports = Libro;