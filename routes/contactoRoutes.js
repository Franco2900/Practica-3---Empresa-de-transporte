// URL base: http://DOMINIO/contacto/

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/', require('../controllers/contactoController.js').getContacto );
router.post( '/', require('../controllers/contactoController.js').postContacto );

module.exports = router;