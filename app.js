// ================== MÓDULOS Y DEPENDENCIAS ==================
const express      = require('express');         // Modulo para la navegación web y creación del servidor
const session      = require('express-session'); // Modulo para usar variables de sesion
const bodyParser   = require('body-parser');     // Modulo para parsear los cuerpos de las solicitudes HTTP
const path         = require('path');            // Modulo para trabajar con direcciones
const randomstring = require('randomstring');    // Modulo para generar string al azar
const i18n         = require('i18n');            // Modulo para trabajar con el mismo texto en varios idiomas
const cookieParser = require('cookie-parser');   // Modulo para usar cookies (variables que se guardan en la pc del usuario)

// ================== CONFIGURACIÓN DE LA APP ==================
const app = express(); // Inicialización de la aplicación Express

// Variables de entorno
require('dotenv').config(); // Carga las variables del archivo .env en process.env
const puerto  = process.env.PUERTO;
const dominio = process.env.DOMINIO;


// ================== CONFIGURACIÓN DEL MOTOR DE PLANTILLAS ==================
app.set('views', path.join(__dirname, 'views')); // Indico que las vistas estan en la carpeta 'views'
app.set('view engine', 'ejs');                   // Indico que motor de plantillas uso



// ================== CONFIGURACIÓN DE LOS LENGUAJES DEL TEXTO ==================
i18n.configure({
    locales: ['es', 'en', 'pt'],  // Idiomas que soporta la app
    defaultLocale: 'es',    // Idioma por defecto
    directory: path.join(__dirname, 'locales'), // Carperta donde esta los archivos de traducción .json 
    cookie: 'lang',         // Nombre de la cookie que almacena el idioma preferido del usuario
    queryParameter: 'lang', // Para cambiar el idioma usando el párametro de URL: ?lang=en
    autoReload: true,       // Aplica cambios en los archivos .json sin reiniciar el servidor
    //syncFiles: true,        // Los archivos .json usan pares clave:valor. Si usamos en la vista una clave que no existe, la crea en el .json con valor ""
    objectNotation: true,   // Permite estructuras anidadas en los archivos .json
})
// NOTA: Hay que usar el modulo cookie-parser junto a este para que el usuario pueda cambiar el idioma mediante una cookie

// ================== MIDDLEWARES GLOBALES ================== 
// Los middlewares en Express son funciones que se ejecutan antes de que una solicitud 
// llegue a una ruta específica. Estos se aplican a **todas** las solicitudes de la aplicación

app.use(bodyParser.urlencoded({ extended: true })); // Permite parsear formularios
app.use(express.json());                            // Permite parsear JSON
app.use(cookieParser());                            // Permite usar cookies


// Defino la sesión
app.use(session({                    
    secret: randomstring.generate(), // Clave secreta usada para firmar y validar la cookie de sesión.
    resave: false,                   // Evita que la sesión se guarde de nuevo en el servidor si no ha sido modificada.
    saveUninitialized: false,        // No guarda sesiones de usuarios no autenticados
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  // Duración de la cookie de sesión: 1 dia
    }
}));


// Inicializa i18n para que agregue req.__() y demás utilidades al request
app.use(i18n.init);

// Info sobre los lenguajes que maneja la app
const languageMap = {
  es: { name: 'Español',    flagClass: 'fi fi-es' },
  en: { name: 'English',    flagClass: 'fi fi-us' },
  pt: { name: 'Português',  flagClass: 'fi fi-pt' }
};

// Asigno distintos datos para que esten disponible en todas las vistas EJS 
app.use((req, res, next) => {

    res.locals.usuario = req.session;    // Datos del usuario
    
    res.locals.t = req.__;               // Función para llamar a archivos de localización de idioma
    res.locals.idioma = req.getLocale(); // Idioma que esta usando el usuario actualmente
    res.locals.idiomaInfo = languageMap[res.locals.idioma] || languageMap['es']; // Info sobre el idioma usado actualmente
    
    res.locals.mostrarCookieBanner = !req.cookies.cookiesAceptadas; // En caso de que no se aceptó las cookies todavia, muestra el banner de cookies
    
    res.locals.pathActual = req.path; // Ruta actual

    next(); // Se continúa al siguiente middleware o ruta
});


// ================== MIDDLEWARES PARA RUTAS ESPECÍFICAS ==================
// Algunos middlewares solo se aplican a ciertas rutas, permitiendo modificar 
// su comportamiento sin afectar a toda la aplicación. 

// ================== ARCHIVOS ESTÁTICOS ==================
// Express envia los archivos en estas rutas directamente sin pasar por lógica adicional del servidor.
app.use('/images',          express.static('./public/images'));
app.use('/css',             express.static('./public/css'));
app.use('/js',              express.static('./public/js'));
app.use('/bootstrapCSS',    express.static('./node_modules/bootstrap/dist/css')); 
app.use('/bootstrapJS',     express.static('./node_modules/bootstrap/dist/js'));
app.use('/bootstrapICONS',  express.static('./node_modules/bootstrap-icons/font'));
app.use('/fontAwesome',     express.static('./node_modules/font-awesome'));
app.use('/flag-icons',      express.static('./node_modules/flag-icons'));

// ================== RUTAS DE NAVEGACIÓN DEL USUARIO ==================
app.use('/',                   require('./routes/homeRoutes.js') );
app.use('/cargaInternacional', require('./routes/cargaInternacionalRoutes.js') );
app.use('/logistica',          require('./routes/logisticaRoutes.js'));
app.use('/despacho',           require('./routes/despachoRoutes.js'));
app.use('/contacto',           require('./routes/contactoRoutes.js'));
app.use('/editorial',          require('./routes/editorialRoutes.js'));
app.use('/proyectos',          require('./routes/proyectosRoutes.js'));

// ================== RUTAS DE NAVEGACIÓN PARA EJECUTAR FUNCIONES DEL LAYOUT ==================
app.use('/layout', require('./routes/layoutRoutes.js'));


// ================== INICIO DEL SERVIDOR ==================
const servidor = app.listen(puerto, () => {

    console.info(`Aplicación iniciada en el puerto: ${puerto}`);
    console.info(`Servidor corriendo en el dominio: ${dominio}`);
});


module.exports = app;