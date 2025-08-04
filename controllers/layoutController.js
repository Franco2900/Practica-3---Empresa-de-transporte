// Metodos importados
const { logURL } = require('./utilController.js');

async function getCambiarLenguaje(req, res)
{
    const nuevoLenguaje = req.params.lenguaje;
    logURL(`GET`, `/cambiarLenguaje/${nuevoLenguaje}`);
  
    res.cookie( 'lang', nuevoLenguaje, {maxAge: 24*3600*1000} ); // Creo o modifico la cookie. Duración de la cookie: 24 horas
    req.setLocale(nuevoLenguaje); // Seteo el nuevo lenguaje

    const ultimaURL = req.get('Referer') || '/'; // Leo la URL de la ruta anterior (Referer) o voy a "/" si no lo encuentro
    return res.redirect(ultimaURL);              // Vuelve a la página anterior
}


async function postAceptarCookies(req, res)
{
    logURL(`POST`, `/aceptarCookies`);

    res.cookie('cookiesAceptadas', 'true', { maxAge: 24*3600*1000 }); // Guarda la cookie por 24 horas
    
    res.sendStatus(200);
};


module.exports = { 
    getCambiarLenguaje, 
    postAceptarCookies
};