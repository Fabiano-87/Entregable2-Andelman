// Constante que define los productos disponibles
const productos = [
    { id: 1, nombre: "NeoRhythm", precio: 250, imagen: "img/neorhythm2.jpg" },
    { id: 2, nombre: "Neurovizr", precio: 499, imagen: "img/neurovizr1.jpg" },
    { id: 3, nombre: "Biohacker's Redlight Panel", precio: 396, imagen: "img/redpanel2.jpg" },
    { id: 4, nombre: "Sensate 2", precio: 260, imagen: "img/sensate23.png" }
];

// Array para almacenar los productos agregados al carrito
let carrito = [];

// Función para mostrar los productos en el DOM
function mostrarProductos() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = ""; 
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        actualizarCarrito();
    }
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = ""; 
    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.precio;
        carritoDiv.innerHTML += `
            <div>
                ${producto.nombre} - $${producto.precio} 
                <button class="btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
    });
    document.getElementById("total").textContent = `Total: $${total}`;
}

// Mostrar los productos al cargar la página
mostrarProductos();