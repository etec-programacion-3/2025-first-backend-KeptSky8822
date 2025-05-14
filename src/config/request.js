const request = require('request');

// Listar todos los libros
request('http://localhost:3000/api/libros', (error, response, body) => {
  if (error) return console.error('Error:', error);
  console.log('Lista de libros:', body);
});

// Crear un libro
request.post({
  url: 'http://localhost:3000/api/libros',
  json: {
    titulo: 'El Principito',
    autor: 'Antoine de Saint-Exupéry',
    categoria: 'Infantil',
    anio_publicacion: 1943
  }
}, (error, response, body) => {
  if (error) return console.error('Error:', error);
  console.log('Libro creado:', body);
});
