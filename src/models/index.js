const sequelize = require('./database');
const Libro = require('./libro');

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ alter: true }); // Sincroniza modelos con la base de datos
    console.log('Modelos sincronizados correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

module.exports = {
  Libro,
  initDB,
};
