document.addEventListener("DOMContentLoaded", function () {
    let volumeSlider = document.getElementById("volume-slider");

    if (!volumeSlider) {
        console.error("❌ Elemento #volume-slider no encontrado.");
        return;
    }

    // Obtener el volumen del sistema al cargar la página
    fetch("http://localhost:8000/get_volume")
        .then(response => response.text())
        .then(volume => {
            volumeSlider.value = volume;
        })
        .catch(error => console.error("❌ Error al obtener volumen:", error));

    // Cambiar el volumen cuando el usuario ajusta el slider
    volumeSlider.addEventListener("input", function () {
        let volume = this.value;
        fetch(`http://localhost:8000/set_volume?level=${volume}`)
            .catch(error => console.error("❌ Error al establecer volumen:", error));
    });
});
