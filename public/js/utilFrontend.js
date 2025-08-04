// ==================================== IMAGENES ====================================

// Agranda el tamaño de la imagen
function hacerZoomImagen(imagen)
{
    if (imagen.style.transform === 'scale(1.5)') imagen.style.transform = 'scale(1)'; // Si ya está agrandada, la restauramos
    else                                         imagen.style.transform = 'scale(1.5)';

}

// Muestra la imagen por encima de todo lo que haya en mi sitio web
function mostrarImagenEnOverlay(imagen)
{
    const overlay    = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');

    // Mostrar overlay en modo flex y cargar la imagen
    overlay.style.display = 'flex';
    overlayImg.src        = imagen.src;

    // Agregar el event listener sólo la primera vez
    if (!overlay.dataset.listenerAdded) 
    {
        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
            overlayImg.src        = '';
        });

        overlay.dataset.listenerAdded = 'true';
    }
        
}


// Abro la imagen en una ventana nueva (se usa cuando la imagen tiene cosas chicas que hay que hacerle zoom)
function mostrarImagenEnNuevaVentana(imagen)
{
    window.open(imagen.src, '_blank', 'noopener');
}


// ==================================== IDIOMA ====================================

// Cambia el lenguaje que aparece en el navbar por lo que eligío el usuario
function cambiarLenguaje(link, event)
{
    event.preventDefault();

    const nuevoTexto = link.firstChild.textContent.trim(); // Texto del enlace en que se hizo click
    const nuevaClaseBandera = link.querySelector('.fi').getAttribute('class'); // Clase del icono de bandera dentro del enlace

    document.getElementById('lenguajeActual').textContent = nuevoTexto; // Nuevo texto al <span id="lenguajeActual">
    document.getElementById('lenguajeActualBandera').className = nuevaClaseBandera; // Nueva clase del <span id="lenguajeActualBandera">

    window.location.href = link.href; // Redirige para que el servidor procese el cambio de idioma
}

// ==================================== COOKIES ====================================

// El usuario acepta las cookies
function aceptarCookies()
{
    fetch('/layout/aceptarCookies', { method: 'POST' }) // Solicitud a una ruta para que haga la lógica del lado del servidor
    .then(() => {
        document.getElementById('cookie-banner').style.display = 'none'; // Dejo de mostrar el cookie banner
    });
}