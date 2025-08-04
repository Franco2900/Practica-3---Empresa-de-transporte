// Metodos importados de 'utilBackend.js'
const { logURL } = require('./utilController.js');

async function getProyectos(req, res)
{
    logURL(`GET`, `/proyectos`);
    res.render('layout', {body: 'proyectosView'} ); 
}

module.exports = { getProyectos };