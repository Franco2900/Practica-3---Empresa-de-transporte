// Modulos
const nodemailer = require('nodemailer'); // Modulo para enviar emails

// Variables de entorno
require('dotenv').config(); // Carga las variables del archivo .env en process.env
const emailEmisorio = process.env.EMAIL_EMISORIO;
const passwordEmail = process.env.PASSWORD_EMAIL;
const emailDestinatario = process.env.EMAIL_DESTINATARIO;

// Metodos importados de 'utilBackend.js'
const { logURL } = require('./utilController.js');

async function getContacto(req, res)
{
    logURL(`GET`, `/contacto`);

    const formularioEnviado = Boolean(req.query.enviado); // Variable para saber si el usuario viene de POST contacto

    res.render('layout', {body: 'contactoView', formularioEnviado} ); 
}


async function postContacto(req, res)
{
    logURL(`POST`, `/contacto`);

    // Variables del formulario
    const empresa    = (req.body.empresa   || '').trim() || '-';
    const persona    = (req.body.persona   || '').trim() || '-';
    const direccion  = (req.body.direccion || '').trim() || '-';
    const telefono   = (req.body.telefono  || '').trim() || '-';
    const email      = (req.body.email     || '').trim() || '-';
    const fax        = (req.body.fax       || '').trim() || '-';
    const mercaderia = (req.body.mercaderia|| '').trim() || '-';
    const transporte = (req.body.transporte|| '').trim() || '-';
    const contenedor = (req.body.contenedor|| '').trim() || '-';
    const peso       = (req.body.peso      || '').trim() || '-';
    const volumen    = (req.body.volumen   || '').trim() || '-';
    const destino    = (req.body.destino   || '').trim() || '-';

    // Mensaje HTML a enviar
    const htmlBody = `
        <h2>Mensaje</h2>
        <ul>
            <li>Empresa: ${empresa}</li>
            <li>Persona: ${persona}</li>
            <li>Dirección: ${direccion}</li>
            <li>Teléfono: ${telefono}</li>
            <li>Email: ${email}</li>
            <li>Fax: ${fax}</li>
            <li>Mercadería: ${mercaderia}</li>
            <li>Transporte: ${transporte}</li>
            <li>Contenedor: ${contenedor}</li>
            <li>Peso: ${peso}</li>
            <li>Volumen: ${volumen}</li>
            <li>Destino: ${destino}</li>
        </ul>
    `;
    
    // Configuración del SMTP (Simple Mail Transfer Protocol), protocolo usado para enviar los emails.
    let transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com', // Dirección del servidor SMTP de Gmail que recibe y procesa el envio
        port: 587,              // Puerto TCP en el que el servidor SMTP de Gmail escucha peticiones
        secure: false,          // Indico si la conexión esta cifrada
        auth: {                 // Datos de autentificación de la cuenta de email desde el que se envia el correo
            user: emailEmisorio,
            pass: passwordEmail
        }

    });

    // Mensaje a enviar
    let info = await transporter.sendMail({

        from: {
            name: 'App TransLogix Global', // Nombre  del emisor
            address: emailEmisorio         // Email del emisor
        },
        to: emailDestinatario,             // Email (o emails - separados por coma) del destinatario

        subject: 'Nuevo mensaje de un cliente', // Asunto del correo

        // Versión en HTML del cuerpo. Permite etiquetas, estilos y formatos enriquecidos.
        html: htmlBody
    });

    console.log('Mensaje enviado. ID: %s', info.messageId);
    
    res.redirect('/contacto?enviado=1');
}

module.exports = { getContacto, postContacto };