// URL base: http://DOMINIO/proyectos/

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/', require('../controllers/proyectosController.js').getProyectos );

module.exports = router;