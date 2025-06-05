//// Autor: jhonatan galvis

// Obtiene el formulario del HTML por su ID
const formularioCrear = document.getElementById("formularioCrear");

// Agrega un evento que se ejecuta cuando el formulario se envía
formularioCrear.addEventListener("submit", function (event) {
    // Previene que el formulario recargue la página al enviarse
    event.preventDefault();

    // Crea un objeto FormData con todos los campos del formulario
    const formData = new FormData(formularioCrear);

    // Envía los datos al servidor usando fetch con método POST
    fetch("../api/crearTipoDocumentoAPI.php", {
        method: "POST",      // Método HTTP POST para enviar datos
        body: formData       // El cuerpo de la solicitud son los datos del formulario
    })
    // Cuando el servidor responde, convierte la respuesta en JSON
    .then(res => res.json())

    // Procesa la respuesta que se recibió del servidor
    .then(respuesta => {
        // Si el servidor devuelve un error, lo muestra al usuario
        if (respuesta.error) {
            alert("Error: " + respuesta.error);
        } 
        // Si todo fue exitoso, muestra el mensaje y limpia el formulario
        else if (respuesta.exitoso) {
            alert(respuesta.exitoso);
            formularioCrear.reset(); // Limpia todos los campos del formulario
        }
    })

    // Si ocurre un error en la solicitud (por ejemplo, el servidor no responde)
    .catch(error => {
        console.error("Error en la solicitud:", error); // Muestra el error en la consola del navegador
        alert("Error al enviar los datos"); // Muestra un mensaje de alerta al usuario
    });
});
