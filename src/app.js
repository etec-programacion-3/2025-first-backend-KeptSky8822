// Importamos las dependencias necesarias
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { initDB } = require('./models'); // Asumo que initDB sincroniza la base de datos

// Inicialización de la app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routes);

// Manejo de errores
app.use(errorHandler);

// Función para iniciar el servidor después de inicializar la base de datos
async function startServer() {
  try {
    await initDB(); // Sincroniza la base de datos (o inicializa modelos)
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

// Exportamos la app para poder usarla en tests u otros módulos
module.exports = app;

// Iniciamos el servidor
startServer();
