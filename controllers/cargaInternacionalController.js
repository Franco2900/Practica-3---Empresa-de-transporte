// Metodos importados de 'utilBackend.js'
const { logURL } = require('./utilController.js');

async function getCargaInternacional(req, res)
{
    logURL(`GET`, `/cargaInternacional`);
    res.render('layout', {body: 'cargaInternacionalView'} ); 
}

module.exports = { getCargaInternacional };