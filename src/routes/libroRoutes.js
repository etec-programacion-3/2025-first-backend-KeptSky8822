const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Libro } = require('../models/libro'); // Ajusta la ruta según tu estructura

// 1. Listar todos los libros - GET /libros
router.get('/', async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    console.error('Error al listar libros:', error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

// 2. Obtener un libro específico por ID - GET /libros/:id
router.get('/:id', async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    console.error('Error al obtener libro:', error);
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
});

// 3. Crear un nuevo libro - POST /libros
router.post('/', async (req, res) => {
  try {
    const { titulo, autor, categoria, anio_publicacion } = req.body;

    // Validación básica
    if (!titulo || !autor || !categoria || !anio_publicacion) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const nuevoLibro = await Libro.create({ titulo, autor, categoria, anio_publicacion });
    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
});

// 4. Actualizar un libro - PUT /libros/:id
router.put('/:id', async (req, res) => {
  try {
    const { titulo, autor, categoria, anio_publicacion } = req.body;
    const libro = await Libro.findByPk(req.params.id);

    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    // Validación básica
    if (!titulo || !autor || !categoria || !anio_publicacion) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    await libro.update({ titulo, autor, categoria, anio_publicacion });
    res.json(libro);
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

// 5. Eliminar un libro - DELETE /libros/:id
router.delete('/:id', async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);

    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await libro.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

// 6. Buscar libros - GET /libros/buscar?titulo=...&autor=...&categoria=...
router.get('/buscar', async (req, res) => {
  try {
    const { titulo, autor, categoria } = req.query;

    const condiciones = {};
    if (titulo) condiciones.titulo = { [Op.iLike]: `%${titulo}%` };
    if (autor) condiciones.autor = { [Op.iLike]: `%${autor}%` };
    if (categoria) condiciones.categoria = { [Op.iLike]: `%${categoria}%` };

    const libros = await Libro.findAll({ where: condiciones });
    res.json(libros);
  } catch (error) {
    console.error('Error al buscar libros:', error);
    res.status(500).json({ error: 'Error al buscar los libros' });
  }
});

module.exports = router;
