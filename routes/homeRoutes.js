// URL base: http://DOMINIO/

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/', require('../controllers/homeController.js').getHome );

module.exports = router;