// Constante que define los productos disponibles
const productos = [
    { id: 1, nombre: "NeoRhythm", precio: 250 },
    { id: 2, nombre: "Neurovizr", precio: 499 },
    { id: 3, nombre: "Biohacker's Redlight Panel", precio: 396 },
    { id: 4, nombre: "Sensate 2", precio: 260 }
];

// Array para almacenar los productos agregados al carrito
let carrito = [];

function mostrarProductos() {
    let mensaje = "Productos disponibles:\n";
    productos.forEach(producto => {
        mensaje += `${producto.id}: ${producto.nombre} - $${producto.precio}\n`;
    });
    alert(mensaje);
}

function agregarAlCarrito() {
    mostrarProductos();
    let idProducto = parseInt(prompt("Ingresa el ID del producto que deseas agregar al carrito:"));

    // Buscar el producto por su ID
    let productoSeleccionado = productos.find(producto => producto.id === idProducto);

    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        alert(`Has agregado ${productoSeleccionado.nombre} al carrito.`);
    } else {
        alert("Producto no encontrado.");
    }
}

function verCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let mensaje = "Productos en tu carrito:\n";
        carrito.forEach((producto, index) => {
            mensaje += `${index + 1}: ${producto.nombre} - $${producto.precio}\n`;
        });
        alert(mensaje);
    }
}

function calcularTotal() {
    let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    alert(`El total a pagar es: $${total}`);
}

function mostrarMenu() {
    let opcion;
    do {
        opcion = parseInt(prompt("Elige una opción:\n1. Ver productos\n2. Agregar al carrito\n3. Ver carrito\n4. Calcular total\n5. Salir"));

        switch(opcion) {
            case 1:
                mostrarProductos();
                break;
            case 2:
                agregarAlCarrito();
                break;
            case 3:
                verCarrito();
                break;
            case 4:
                calcularTotal();
                break;
            case 5:
                alert("Gracias por utilizar el simulador.");
                break;
            default:
                alert("Opción no válida.");
        }
    } while (opcion !== 5);
}

// Invoca la función para iniciar el simulador
mostrarMenu();