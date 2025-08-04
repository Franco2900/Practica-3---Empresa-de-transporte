// URL base: http://DOMINIO/layout

// ================== MÓDULOS ==================
const router = require('express').Router();

// ================== RUTAS DE NAVEGACIÓN DEL USUARIO ==================
router.get ( '/cambiarLenguaje/:lenguaje', require('../controllers/layoutController.js').getCambiarLenguaje );
router.post( '/aceptarCookies',            require('../controllers/layoutController.js').postAceptarCookies );

module.exports = router;