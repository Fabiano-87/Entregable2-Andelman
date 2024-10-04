const productos = [
    { id: 1, nombre: "NeoRhythm", precio: 250, imagen: "../img/neorhythm2.jpg" },
    { id: 2, nombre: "Neurovizr", precio: 499, imagen: "../img/neurovizr1.jpg" },
    { id: 3, nombre: "Biohacker's Redlight Panel", precio: 396, imagen: "../img/redpanel2.jpg" },
    { id: 4, nombre: "Sensate 2", precio: 260, imagen: "../img/sensate23.png" }
];

let carrito = [];

// Function to display products
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

// Function to add product to cart and update cart count
function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);
    const productoEnCarrito = carrito.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    actualizarCarrito();
    actualizarIconoCarrito();
}

// Update cart icon with item count
function actualizarIconoCarrito() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);

    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden'); // Make sure the count is visible
    } else {
        cartCount.classList.add('hidden'); // Hide the count when the cart is empty
    }
}

// Function to update cart and mini-cart content
function actualizarCarrito() {
    const miniCartItemsDiv = document.getElementById('cart-items');
    miniCartItemsDiv.innerHTML = "";

    if (carrito.length === 0) {
        miniCartItemsDiv.innerHTML = `<p class="text-center text-gray-500">Tu carrito está vacío</p>`;
        document.getElementById('checkout-btn').classList.add('hidden');
    } else {
        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
            miniCartItemsDiv.innerHTML += `
                <div class="flex justify-between items-center">
                    <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                    <button class="text-white px-3" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                </div>
            `;
        });

        document.getElementById('total-modal').textContent = `Total: $${total}`;
        document.getElementById('checkout-btn').classList.remove('hidden');
    }
}

// Function to open 'finalizar compra' modal and show cart summary
function abrirFinalizarCompra() {
    document.getElementById('mini-cart').classList.add('hidden'); // Close mini cart
    const modal = document.getElementById("modal-finalizar");
    modal.classList.remove("hidden"); 

    const resumenDiv = document.getElementById("resumen-carrito");
    resumenDiv.innerHTML = ""; 

    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad; 
        resumenDiv.innerHTML += `
            <div class="flex justify-between items-center bg-gray-800 p-2 rounded-lg">
                <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
            </div>
        `;
    });

    document.getElementById("total-modal").textContent = `Total: $${total}`;
}

// Function to close the 'finalizar compra' modal
function cerrarModal() {
    const modal = document.getElementById('modal-finalizar');
    modal.classList.add('hidden'); 
}

// Function to remove item from cart
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(producto => producto.id !== idProducto);
    actualizarCarrito(); 
}

// Checkout processing and saving user data
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

// Thank you window after completing the purchase
function abrirModalGracias() {
    document.getElementById("modal-gracias").classList.remove("hidden");
}

// Close the 'Thank you' modal
function cerrarModalGracias() {
    document.getElementById("modal-gracias").classList.add("hidden");
}

// Show/hide mini-cart modal
document.addEventListener("DOMContentLoaded", function() {
    mostrarProductos(); 

    const cartIcon = document.getElementById('cart-icon');
    const miniCart = document.getElementById('mini-cart');

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        miniCart.classList.toggle('hidden'); // Toggle visibility
    });

    // Load stored user data on page load
    const nombre = localStorage.getItem("nombre");
    const email = localStorage.getItem("email");
    const direccion = localStorage.getItem("direccion");

    if (nombre) document.getElementById("nombre").value = nombre;
    if (email) document.getElementById("email").value = email;
    if (direccion) document.getElementById("direccion").value = direccion;

    // Button event listeners
    const finalizarBtn = document.querySelector('.finalizar-btn');
    const cancelarBtn = document.querySelector('.cancelar-btn');
    const cerrarGraciasBtn = document.querySelector('.cerrar-gracias-btn');

    if (finalizarBtn) finalizarBtn.addEventListener('click', abrirFinalizarCompra);
    if (cancelarBtn) cancelarBtn.addEventListener('click', cerrarModal);
    if (cerrarGraciasBtn) cerrarGraciasBtn.addEventListener('click', cerrarModalGracias);
});