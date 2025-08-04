// Metodos importados de 'utilBackend.js'
const { logURL } = require('./utilController.js');

async function getDespacho(req, res)
{
    logURL(`GET`, `/despacho`);
    res.render('layout', {body: 'despachoView'} ); 
}

module.exports = { getDespacho };