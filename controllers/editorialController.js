// Metodos importados de 'utilBackend.js'
const { logURL } = require('./utilController.js');

async function getEditorial(req, res)
{
    logURL(`GET`, `/editorial`);
    res.render('layout', {body: 'editorialView'} ); 
}

module.exports = { getEditorial };