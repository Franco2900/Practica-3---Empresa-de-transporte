// URL base: http://DOMINIO/editorial/

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/', require('../controllers/editorialController.js').getEditorial );

module.exports = router;