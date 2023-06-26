
// Variables
const baseDeDatos = [
    {
        id: 1,
        titulo: '1,000 Places to See Before You Die',
        precio: 1000,
        Image_URL_L: 'http://images.amazon.com/images/P/0716733897.01.LZZZZZZZ.jpg'
    },
    {
        id: 2,
        titulo: 'Cebolla',
        precio: 1200,
        Image_URL_L: 'http://images.amazon.com/images/P/0155001736.01.LZZZZZZZ.jpg'
    },
    {
        id: 3,
        titulo: 'Calabacin',
        precio: 2100,
        Image_URL_L: 'http://images.amazon.com/images/P/0375703764.01.LZZZZZZZ.jpg'
    },
    {
        id: 4,
        titulo: 'Fresas',
        precio: 1600,
        Image_URL_L: 'http://images.amazon.com/images/P/1841955485.01.LZZZZZZZ.jpg'
    },
    {
        id: 5,
        titulo: 'Fresas',
        precio: 1600,
        Image_URL_L: 'http://images.amazon.com/images/P/3596222206.01.LZZZZZZZ.jpg'
    }
    ,
    {
        id: 6,
        titulo: 'Fresas',
        precio: 1600,
        Image_URL_L: 'http://images.amazon.com/images/P/0915132370.01.LZZZZZZZ.jpg'
    }
    ,
    {
        id: 7,
        titulo: 'Fresas',
        precio: 1600,
        Image_URL_L: 'http://images.amazon.com/images/P/0801839262.01.LZZZZZZZ.jpg'
    }

];

const DOMul = document.querySelector('#items');
const divisa = '$';
/**
 * Dibuja todos los productos a partir de la base de datos. 
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura de tag
        const miNodo = document.createElement('li');

        // CONTEN IMG
        const miNodoContenImg = document.createElement('div')

        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.setAttribute('src', info.Image_URL_L);
        miNodoImagen.classList.add('zoom');

        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('body');
        miNodoCardBody.classList.add('cta');

        // Titulo
        const miNodoTitle = document.createElement('p');
        miNodoTitle.textContent = info.titulo;

        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;

        // div boton
        const miNodoCta = document.createElement('div');
        miNodoCta.setAttribute('id', 'btnAddCarrito');
        miNodoCta.classList.add('cta');
        miNodoCta.classList.add('justificarContnido')

        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.textContent = 'cargar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        // miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        
        // Insertamos
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoContenImg.appendChild(miNodoImagen)
        miNodoCta.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoContenImg)
        //miNodo.appendChild(miNodoImagen);
        miNodo.appendChild(miNodoCardBody);
        miNodo.appendChild(miNodoCta);
        DOMul.appendChild(miNodo);
    });
}


// Inicio
renderizarProductos();