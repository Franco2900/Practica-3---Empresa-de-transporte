// Metodos importados de 'utilBackend.js'
const { logURL } = require('./utilController.js');

async function getLogistica(req, res)
{
    logURL(`GET`, `/logistica`);
    res.render('layout', {body: 'logisticaView'} ); 
}

module.exports = { getLogistica };