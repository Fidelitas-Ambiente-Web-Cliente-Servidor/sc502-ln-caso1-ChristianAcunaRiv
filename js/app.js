const menu = [
  { nombre: 'Bruschetta Clásica', descripcion: 'Pan tostado con tomate y albahaca fresca', precio: 4500, categoria: 'Entrada' },
  { nombre: 'Tabla de Quesos', descripcion: 'Selección de quesos importados con mermelada', precio: 7800, categoria: 'Entrada' },
  { nombre: 'Lomo al Vino Tinto', descripcion: 'Lomo de res en reducción de vino tinto', precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara', descripcion: 'Pasta con tocino, huevo y queso parmesano', precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha', descripcion: 'Filete de salmón con vegetales al vapor', precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y mascarpone', precio: 5200, categoria: 'Postre' },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá', precio: 4800, categoria: 'Postre' }
];

const reservas = [];

function renderMenu(platos = menu) {

    const contenedor = document.getElementById("contenedor-menu");

    contenedor.innerHTML = "";

    platos.forEach(function(plato) {

        const card = document.createElement("div");

        card.classList.add("col-md-4");

        card.innerHTML =
        '<div class="card-plato border p-3 mb-3">' +
        '<h4>' + plato.nombre + '</h4>' +
        '<p>' + plato.descripcion + '</p>' +
        '<p><strong>₡' + plato.precio.toLocaleString() + '</strong></p>' +
        '<p>' + plato.categoria + '</p>' +
        '</div>';

        contenedor.appendChild(card);

    });

}

function filtrarCategoria(categoria) {

    if (categoria === "Todos") {
        renderMenu(menu);
        return;
    }

    const filtrados = menu.filter(function(plato) {
        return plato.categoria === categoria;
    });

    renderMenu(filtrados);

}

function validarFormulario() {

    let valido = true;

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const personas = document.getElementById("personas").value;

    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorFecha").textContent = "";
    document.getElementById("errorPersonas").textContent = "";

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    if (nombre.length < 5 || !regexNombre.test(nombre)) {
        document.getElementById("errorNombre").textContent = "Nombre inválido";
        valido = false;
    }

    const regexCorreo = /^\S+@\S+\.\S+$/;

    if (!regexCorreo.test(correo)) {
        document.getElementById("errorCorreo").textContent = "Correo inválido";
        valido = false;
    }

    const hoy = new Date().toISOString().split("T")[0];

    if (fecha === "" || fecha < hoy) {
        document.getElementById("errorFecha").textContent = "Fecha inválida";
        valido = false;
    }

    if (personas === "" || personas < 1 || personas > 20) {
        document.getElementById("errorPersonas").textContent = "Debe ser entre 1 y 20";
        valido = false;
    }

    document.getElementById("btnReservar").disabled = !valido;

    return valido;

}

function agregarReserva() {

    if (!validarFormulario()) {
        return;
    }

    const reserva = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        personas: document.getElementById("personas").value
    };

    reservas.push(reserva);

    const tabla = document.getElementById("tablaReservas");

    const fila = document.createElement("tr");

    fila.classList.add("fila-reserva");

    if (Number(reserva.personas) >= 6) {
    fila.style.backgroundColor = "#FFF3CD";
}

    fila.innerHTML =
        "<td>" + reserva.nombre + "</td>" +
        "<td>" + reserva.correo + "</td>" +
        "<td>" + reserva.fecha + "</td>" +
        "<td>" + reserva.hora + "</td>" +
        "<td>" + reserva.personas + "</td>";

    tabla.appendChild(fila);

    actualizarResumen();

    document.getElementById("form-reserva").reset();

    document.getElementById("btnReservar").disabled = true;

}

function actualizarResumen() {

    let totalPersonas = 0;

    let mayorReserva = reservas[0];

    reservas.forEach(function(reserva) {

        totalPersonas += Number(reserva.personas);

        if (Number(reserva.personas) > Number(mayorReserva.personas)) {
            mayorReserva = reserva;
        }

    });

    document.getElementById("resumen").innerHTML =
        "<h4>Resumen</h4>" +
        "<p>Total de reservas: " + reservas.length + "</p>" +
        "<p>Total de personas: " + totalPersonas + "</p>" +
        "<p>Mayor reserva: " + mayorReserva.nombre + " (" + mayorReserva.personas + " personas)</p>";

}

document.addEventListener("DOMContentLoaded", function() {

    renderMenu();

    document.querySelectorAll("#nombre, #correo, #fecha, #personas")
    .forEach(function(campo) {

        campo.addEventListener("input", validarFormulario);

    });

});

document.getElementById("form-reserva").addEventListener("submit", function(e) {

    e.preventDefault();

    agregarReserva();

});