const express = require('express');
const router = express.Router();

const libroRoutes = require('./libroRoutes');

router.use('/libros', libroRoutes);

module.exports = router;
