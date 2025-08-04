// URL base: http://DOMINIO/despacho

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/', require('../controllers/despachoController.js').getDespacho );

module.exports = router;