const productos = [
    { id: 1, nombre: "NeoRhythm", precio: 250, imagen: "../img/neorhythm2.jpg" },
    { id: 2, nombre: "Neurovizr", precio: 499, imagen: "../img/neurovizr1.jpg" },
    { id: 3, nombre: "Biohacker's Redlight Panel", precio: 396, imagen: "../img/redpanel2.jpg" },
    { id: 4, nombre: "Sensate 2", precio: 260, imagen: "../img/sensate23.png" }
];


let carrito = [];

// Card de productos
function mostrarProductos() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = ""; 
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("border", "border-gray-700", "p-4", "text-center", "rounded-lg", "bg-black", "text-white", "w-full", "max-w-xs", "mx-auto");

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="w-32 h-32 mx-auto rounded-lg object-cover mb-4">
            <h3 class="text-lg font-bold">${producto.nombre}</h3>
            <p class="mb-2">Precio: $${producto.precio}</p>
            <button class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 mt-2 rounded-lg text-lg font-semibold" onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

// Funciones de agregar al carrito, eliminar, y actualizar
function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);
    const productoEnCarrito = carrito.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    actualizarCarrito();
}

function eliminarDelCarrito(idProducto) {
    const producto = carrito.find(producto => producto.id === idProducto);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito = carrito.filter(producto => producto.id !== idProducto);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = ""; 
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        carritoDiv.innerHTML += `
            <div class="bg-black p-4 rounded-lg text-white flex justify-between items-center">
                <div>
                    ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                </div>
                <div class="flex items-center">
                    <button class="text-white px-3" onclick="agregarAlCarrito(${producto.id})">+</button>
                    <button class="text-white px-3" onclick="eliminarDelCarrito(${producto.id})">-</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total").textContent = `Total: $${total}`;
}

// Ventana de finalizar compra
function abrirFinalizarCompra() {
    const modal = document.getElementById("modal-finalizar");
    modal.classList.remove("hidden"); 

    const resumenDiv = document.getElementById("resumen-carrito");
    resumenDiv.innerHTML = ""; 

    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad; 
        resumenDiv.innerHTML += `
            <div class="flex justify-between items-center bg-gray-800 p-2 rounded-lg">
                <div>
                    <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                </div>
                <div class="flex items-center">
                    <button class="text-white px-3 bg-red-600 rounded-full" onclick="cambiarCantidad(${producto.id}, 'restar')">-</button>
                    <button class="text-white px-3 bg-red-600 rounded-full" onclick="cambiarCantidad(${producto.id}, 'sumar')">+</button>
                </div>
            </div>
        `;
    });

    
    document.getElementById("total-modal").textContent = `Total: $${total}`;
}

function cambiarCantidad(idProducto, accion) {
    const producto = carrito.find(producto => producto.id === idProducto);

    if (accion === 'sumar') {
        producto.cantidad++;
    } else if (accion === 'restar' && producto.cantidad > 1) {
        producto.cantidad--;
    } else if (accion === 'restar' && producto.cantidad === 1) {
        carrito = carrito.filter(producto => producto.id !== idProducto);
    }

    
    abrirFinalizarCompra();
}


function cerrarModal() {
    const modal = document.getElementById("modal-finalizar");
    modal.classList.add("hidden"); 
}


function eliminarDelCarrito(idProducto) {
    const producto = carrito.find(producto => producto.id === idProducto);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito = carrito.filter(producto => producto.id !== idProducto);
    }
    actualizarCarrito(); 
}

function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);
    const productoEnCarrito = carrito.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    actualizarCarrito(); 
}

// Funcion para procesar la compra
document.getElementById("datos-usuario").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;

    if (nombre && email && direccion) {
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("email", email);
        localStorage.setItem("direccion", direccion);

        
        carrito = [];  
        actualizarCarrito(); 
        cerrarModal();  
        abrirModalGracias();  
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Ventana de agradecimiento
function abrirModalGracias() {
    document.getElementById("modal-gracias").classList.remove("hidden");
}

function cerrarModalGracias() {
    document.getElementById("modal-gracias").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
    const nombre = localStorage.getItem("nombre");
    const email = localStorage.getItem("email");
    const direccion = localStorage.getItem("direccion");

    if (nombre) document.getElementById("nombre").value = nombre;
    if (email) document.getElementById("email").value = email;
    if (direccion) document.getElementById("direccion").value = direccion;
});

mostrarProductos();