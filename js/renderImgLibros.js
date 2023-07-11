
// Variables
const baseDeDatos = [
    {
        id: 1,
        titulo: '1,000 Places to See Before You Die',
        precio: 8720,
        Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/7611/9780761156864.jpg'
    },
    {
        id: 2,
        titulo: '1st to Die',
        precio: 3925,
        Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/4466/9780446610032.jpg'
    },
    {
        id: 3,
        titulo: '2001',
        precio: 3800,
        Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/4514/9780451457998.jpg'
    },
    {
        id: 4,
        titulo: '300',
        precio: 10975,
        Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5697/9781569714027.jpg'
    },
    {
        id: 5,
        titulo: '4 Months to A 4 Hour Marathon',
        precio: 6215,
        Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/3995/9780399532597.jpg'
    }
    ,
    {
        id: 6,
        titulo: '501 Spanish Verbs',
        precio: 8055,
        Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4380/9781438009162.jpg'
    }
    ,
    {
        id: 7,
        titulo: 'A Brief History of Time',
        precio: 4810,
        Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/8575/9780857501004.jpg'
    }
    // {
    //     id: 8,
    //     titulo: 'A Briefer History of Time',
    //     precio: 5785,
    //     Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/5930/9780593056974.jpg'
    // }
    // {
    //     id: 9,
    //     titulo: 'A Course in Miracles',
    //     precio: 11130,
    //     Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/8833/9781883360269.jpg'
    // }
    // {
    //     id: 10,
    //     titulo: 'A Course in Phonetics',
    //     precio: 29200,
    //     Image_URL_L: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/2854/9781285463407.jpg'
    // }
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
        miNodoBoton.textContent = 'Agregar al carrito';
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