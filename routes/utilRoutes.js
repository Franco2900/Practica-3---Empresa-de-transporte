// URL base: http://DOMINIO/util

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/cambiarLenguaje/:lenguaje', require('../controllers/utilController.js').getCambiarLenguaje );
router.post( '/aceptarCookies', require('../controllers/utilController.js').postAceptarCookies );

module.exports = router;