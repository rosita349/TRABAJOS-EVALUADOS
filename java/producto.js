// Obtenemos todos los botones de "Comprar"
const botonesComprar = document.querySelectorAll('.btn-comprar');

// Seleccionamos el cuerpo de la tabla del carrito
const tbody = document.getElementById('tbody');
const totalElement = document.getElementById('total');

// Creamos un objeto para almacenar los productos del carrito
let carrito = [];

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
  // Limpiamos la tabla antes de agregar los nuevos productos
  tbody.innerHTML = '';

  let total = 0;

  // Iteramos sobre los productos en el carrito
  carrito.forEach((producto, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${producto.nombre}</td>
      <td>
        <input type="number" class="cantidad" value="${producto.cantidad}" data-index="${index}" min="1">
      </td>
      <td>${producto.precio}</td>
      <td>${producto.precio * producto.cantidad}</td>
      <td><button class="eliminar" data-index="${index}">Eliminar</button></td>
    `;

    tbody.appendChild(tr);

    // Sumamos al total
    total += producto.precio * producto.cantidad;
  });

  // Actualizamos el total en la tabla
  totalElement.textContent = total.toFixed(2);
}

// Función para manejar el clic en los botones "Comprar"
botonesComprar.forEach(boton => {
  boton.addEventListener('click', () => {
    // Obtenemos el nombre y el precio del producto desde los atributos data
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseFloat(boton.getAttribute('data-precio'));

    // Verificamos si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
      // Si el producto ya existe, aumentamos la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Actualizamos la vista del carrito
    actualizarCarrito();
  });
});
// Función para eliminar productos del carrito
tbody.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar')) {
      // Evitamos que el modal se cierre automáticamente al eliminar un producto
      event.stopPropagation(); // Evita que el evento de cierre del modal se propague
  
      const index = event.target.getAttribute('data-index');
      carrito.splice(index, 1); // Eliminamos el producto del carrito
  
      // Actualizamos la vista del carrito
      actualizarCarrito();
    }
  });
  


// Función para actualizar la cantidad de un producto
tbody.addEventListener('input', (event) => {
  if (event.target.classList.contains('cantidad')) {
    const index = event.target.getAttribute('data-index');
    const nuevaCantidad = parseInt(event.target.value);

    if (nuevaCantidad >= 1) {
      carrito[index].cantidad = nuevaCantidad;
      actualizarCarrito();
    }
  }
});
