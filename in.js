// Variables globales
let inventario = [];
let totalProductos = 0;
let productosEliminados = 0;
let totalPrecio = 0; // Nueva variable para la suma de los precios

// Obtener elementos del DOM
const formProducto = document.getElementById("formProducto");
const tablaInventario = document.querySelector("#tablaInventario tbody");
const totalProductosElem = document.getElementById("totalProductos");
const productosEliminadosElem = document.getElementById("productosEliminados");
const totalPrecioElem = document.getElementById("totalPrecio"); // Elemento para mostrar la suma total de precios
const listaEliminados = document.getElementById("listaEliminados");

// Evento para agregar un producto
formProducto.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById("nombre").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);

    // Validar datos
    if (!nombre || isNaN(cantidad) || isNaN(precio)) {
        alert("Por favor, ingrese datos válidos.");
        return;
    }

    // Crear objeto producto
    const producto = { nombre, cantidad, precio };

    // Agregar al inventario
    inventario.push(producto);
    totalProductos++;
    totalPrecio += precio; // Sumar el precio al total
    
    // Actualizar la tabla y los contadores
    actualizarInventario();
    actualizarResumen();

    // Limpiar el formulario
    formProducto.reset();
});

// Función para actualizar la tabla de inventario
function actualizarInventario() {
    tablaInventario.innerHTML = ""; // Limpiar la tabla

    inventario.forEach((producto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>
                <button onclick="editarProducto(${index})">✏️ Editar</button>
                <button onclick="eliminarProducto(${index})">🗑️ Eliminar</button>
            </td>
        `;
        tablaInventario.appendChild(fila);
    });
}

// Función para eliminar un producto
function eliminarProducto(index) {
    const productoEliminado = inventario[index].nombre; // Guardar nombre del producto
    totalPrecio -= inventario[index].precio; // Restar el precio del total
    inventario.splice(index, 1); // Eliminar del array
    totalProductos--;
    productosEliminados++;

    // Agregar a la lista de eliminados
    const itemEliminado = document.createElement("li");
    itemEliminado.textContent = productoEliminado;
    listaEliminados.appendChild(itemEliminado);

    // Actualizar la tabla y los contadores
    actualizarInventario();
    actualizarResumen();
}

// Función para editar un producto
function editarProducto(index) {
    const nuevoNombre = prompt("Nuevo nombre:", inventario[index].nombre);
    const nuevaCantidad = prompt("Nueva cantidad:", inventario[index].cantidad);
    const nuevoPrecio = prompt("Nuevo precio:", inventario[index].precio);

    // Validar entrada
    if (nuevoNombre && !isNaN(nuevaCantidad) && !isNaN(nuevoPrecio)) {
        totalPrecio -= inventario[index].precio; // Restar el precio anterior
        inventario[index].nombre = nuevoNombre;
        inventario[index].cantidad = parseInt(nuevaCantidad);
        inventario[index].precio = parseFloat(nuevoPrecio);
        totalPrecio += inventario[index].precio; // Sumar el nuevo precio

        actualizarInventario();
        actualizarResumen();
    } else {
        alert("Entrada no válida. Inténtelo de nuevo.");
    }
}

// Función para actualizar los contadores
function actualizarResumen() {
    totalProductosElem.textContent = `Total de productos: ${totalProductos}`;
    productosEliminadosElem.textContent = `Productos eliminados: ${productosEliminados}`;
    totalPrecioElem.textContent = `Total en precio: $${totalPrecio.toFixed(2)}`; // Mostrar la suma total de los precios
}
