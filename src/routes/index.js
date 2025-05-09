const express = require('express');
const router = express.Router();

// Ruta base para verificar que la API está funcionando
router.get('/', (req, res) => {
  res.json({ message: 'API de Biblioteca Escolar funcionando correctamente' });
});

module.exports = router;