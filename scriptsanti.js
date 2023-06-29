// Obtén referencias al botón y al formulario por su ID
var boton = document.getElementById('mostrarFormulario');
var formulario = document.getElementById('formularioA');

// Agrega un evento de clic al botón
boton.addEventListener('click', function() {
  // Verifica el estado actual del formulario
  if (formulario.style.display === 'none') {
    formulario.style.display = 'block'; // Muestra el formulario
  } else {
    formulario.style.display = 'none'; // Oculta el formulario
  }
});
// esto ahora es para modificar los  datos//
var boton1 = document.getElementById('mostrarFormularioB');
var formulario1 = document.getElementById('formularioB');

// Agrega un evento de clic al botón
boton1.addEventListener('click', function() {
  // Verifica el estado actual del formulario
  if (formulario1.style.display === 'none') {
    formulario1.style.display = 'block'; // Muestra el formulario
  } else {
    formulario1.style.display = 'none'; // Oculta el formulario
  }
});