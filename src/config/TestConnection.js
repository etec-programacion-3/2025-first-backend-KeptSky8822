const sequelize = require('./database');// Es para decir que donde esta base de datos en js para sequeliz haga el trabajo de transformarlo


async function testConnection() {
  try {
    await sequelize.authenticate(); // Es el que establece la conexion con la base de datos
    console.log('Conexión a la base de datos establecida correctamente.'); // La conexion es exitosa dira correctamente
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error); // Sino error
  } finally {
    await sequelize.close();
  }
}

testConnection();
