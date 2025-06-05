const formularioCrear = document.getElementById("formularioCrear");

formularioCrear.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(formularioCrear);

    fetch("../api/crearTipoDocumentoAPI.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(respuesta => {
        if (respuesta.error) {
            alert("Error: " + respuesta.error);
        } else if (respuesta.exitoso) {
            alert(respuesta.exitoso);
            formularioCrear.reset();
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        alert("Error al enviar los datos");
    });
});
