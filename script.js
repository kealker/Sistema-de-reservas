let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// Guardar en localStorage
function guardar() {
    localStorage.setItem("reservas", JSON.stringify(reservas));
}

// Crear reserva
function crearReserva() {

    let nombre = document.getElementById("nombre").value.trim();
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let personas = document.getElementById("personas").value.trim();
    let error = document.getElementById("error");

    // VALIDACIÓN
    if (!nombre || !fecha || !hora || !personas) {
        error.innerHTML = "Todos los campos son obligatorios";
        error.style.color = "red";
        return;
    }

    // Evitar duplicados (misma fecha + hora)
    let existe = reservas.some(r => r.fecha === fecha && r.hora === hora);

    if (existe) {
        error.innerHTML = "Ya existe una reserva en esa fecha y hora";
        return;
    }

    let reserva = {
        id: Date.now(),
        nombre,
        fecha,
        hora,
        personas
    };

    reservas.push(reserva);

    guardar();
    render();
    limpiar();
}

// Renderizar reservas
function render() {

    let contenedor = document.getElementById("listaReservas");
    contenedor.innerHTML = "";

    reservas.forEach(r => {

        contenedor.innerHTML += `
            <div class="reserva">
                <h3>${r.nombre}</h3>
                <p>Fecha: ${r.fecha}</p>
                <p>Hora: ${r.hora}</p>
                <p>Personas: ${r.personas}</p>
                <button onclick="eliminarReserva(${r.id})">Eliminar</button>
            </div>
        `;
    });
}

// Eliminar una reserva
function eliminarReserva(id) {

    reservas = reservas.filter(r => r.id !== id);

    guardar();
    render();
}

// Borrar todo
function borrarTodas() {
    reservas = [];
    guardar();
    render();
}

// Limpiar inputs
function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("personas").value = "";
    document.getElementById("error").innerHTML = "";
}

// Inicializar
render();