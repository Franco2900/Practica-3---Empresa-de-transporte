// URL base: http://DOMINIO/logistica

// Modulos
const router = require('express').Router(); // Permite definir rutas

// Defino las rutas de navegación del usuario
router.get( '/', require('../controllers/logisticaController.js').getLogistica );

module.exports = router;