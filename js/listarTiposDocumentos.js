function cargarTipos() {
    fetch("../api/listarTiposDocumentosAPI.php")
        .then(res => res.json())
        .then(data => {
            const tabla = document.getElementById("tablaTipos");
            tabla.innerHTML = "";

            data.forEach(doc => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${doc.id}</td>
                    <td>${doc.nombre}</td>
                    <td>
                        <button onclick="mostrarFormularioEditar(${doc.id}, '${doc.nombre}')">Editar</button>
                        <button onclick="eliminar(${doc.id})">Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error al cargar tipos:", error);
            alert("Error al cargar los datos: " + error.message);
        });
}

function eliminar(id) {
    if (!confirm("¿Seguro que quieres inahabilitar este tipo de documento?")) return;

    const formData = new FormData();
    formData.append("id", id);

    fetch("../api/eliminarTipoDocumentoAPI.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(respuesta => {
            alert(respuesta.exitoso || respuesta.error);
            cargarTipos();
        })
        .catch(error => {
            console.error("Error al eliminar:", error);
            alert("Ocurrió un error al intentar eliminar.");
        });
}

function mostrarFormularioEditar(id, nombre) {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-nombre").value = nombre;
    document.getElementById("modal-editar").style.display = "block";
}

function cerrarModalEditar() {
    document.getElementById("modal-editar").style.display = "none";
}

document.getElementById("formEditar").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("../api/editarTipoDocumentoAPI.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(respuesta => {
            alert(respuesta.exitoso || respuesta.error);
            cerrarModalEditar();
            cargarTipos();
        })
        .catch(error => {
            console.error("Error al editar:", error);
            alert("Ocurrió un error al editar.");
        });
});

document.addEventListener("DOMContentLoaded", cargarTipos);
