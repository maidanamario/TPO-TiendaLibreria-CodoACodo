
// Variables
const baseDeDatos = [
    {
        id: 1,
        titulo: 'Patata',
        precio: 1000,
        imagen: 'img/descarga1.jpg'
    },
    {
        id: 2,
        titulo: 'Cebolla',
        precio: 1200,
        imagen: 'img/descarga2.jpg'
    },
    {
        id: 3,
        titulo: 'Calabacin',
        precio: 2100,
        imagen: 'img/descarga1.jpg'
    },
    {
        id: 4,
        titulo: 'Fresas',
        precio: 1600,
        imagen: 'img/descarga2.jpg'
    },
    {
        id: 5,
        titulo: 'Fresas',
        precio: 1600,
        imagen: 'img/descarga2.jpg'
    }
    ,
    {
        id: 6,
        titulo: 'Fresas',
        precio: 1600,
        imagen: 'img/descarga2.jpg'
    }
    ,
    {
        id: 7,
        titulo: 'Fresas',
        precio: 1600,
        imagen: 'img/descarga2.jpg'
    }

];

const DOMul = document.querySelector('#items');
const divisa = '$';
/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('li');

        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.setAttribute('src', info.imagen);

        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('body');

        // Titulo
        const miNodoTitle = document.createElement('p');
        miNodoTitle.textContent = info.titulo;

        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;

        // div boton
        const miNodoCta = document.createElement('div');
        miNodoCardBody.classList.add('cta');

        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.textContent = 'cargar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        // miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        
        // Insertamos
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCta.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoImagen);
        miNodo.appendChild(miNodoCardBody);
        miNodo.appendChild(miNodoCta);
        DOMul.appendChild(miNodo);
    });
}


// Inicio
renderizarProductos();