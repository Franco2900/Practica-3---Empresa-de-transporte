// URL base: http://DOMINIO/cargaInternacional

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/', require('../controllers/cargaInternacionalController.js').getCargaInternacional );

module.exports = router;