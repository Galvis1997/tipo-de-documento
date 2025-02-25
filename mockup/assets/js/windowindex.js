document.addEventListener("DOMContentLoaded", function () {
    cargarElementos();
    updateClock();
    setInterval(updateClock, 1000);

    document.querySelectorAll(".window").forEach(window => {
        makeWindowDraggable(window);
        makeWindowResizable(window);
    });
});

windows = [];

function bringToTop(window) {
    console.log(window);
    let windowElement = document.getElementById(window);
    console.log(windowElement);

    let currentZIndex = parseInt(windowElement.style.zIndex);
    console.log(currentZIndex);

    //obtain all z-index windows
    let zIndexWindows = document.querySelectorAll(".window:not([id='" + window + "'])");
    zIndexWindows.forEach(zIndexWindow => {
        let zIndexWindowElement = document.getElementById(zIndexWindow.id);
        zIndexWindowElement.style.zIndex = currentZIndex - 1;
    });

    //IF zindex is 1 maintain all z-index windows
    // if (currentZIndex === 1) {
    //     zIndexWindows.forEach(zIndexWindow => {
    //         let zIndexWindowElement = document.getElementById(zIndexWindow.id);
    //         zIndexWindowElement.style.zIndex = 1;
    //     });
    // }

    windowElement.dataset.zIndex = currentZIndex + 1;
}

function pressedWindow(window) {
    bringToTop(window);
}

function updateClock() {
    let now = new Date();
    let timeString = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    document.getElementById("clock").textContent = timeString;
}

function openWindow(id) {
    let windowElement = document.getElementById(id);
    windowElement.style.display = "flex";
    windowElement.style.zIndex = windows.length + 1;

    makeWindowDraggable(windowElement);
    makeWindowResizable(windowElement);
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

function maximizeWindow(id) {
    let windowElement = document.getElementById(id);
    let maincanvas = document.querySelector(".screencanvas");

    if (windowElement.classList.contains("maximized")) {
        windowElement.style.width = windowElement.dataset.width;
        windowElement.style.height = windowElement.dataset.height;
        windowElement.style.left = windowElement.dataset.left;
        windowElement.style.top = windowElement.dataset.top;
        windowElement.classList.remove("maximized");
    } else {
        windowElement.dataset.width = windowElement.style.width;
        windowElement.dataset.height = windowElement.style.height;
        windowElement.dataset.top = windowElement.style.top;
        windowElement.dataset.left = windowElement.style.left;

        windowElement.style.removeProperty("left");
        windowElement.style.removeProperty("top");
        windowElement.style.removeProperty("width");
        windowElement.style.removeProperty("height");

        let canvasRect = maincanvas.getBoundingClientRect();
        windowElement.style.width = canvasRect.width + "px";
        windowElement.style.height = canvasRect.height + "px";

        windowElement.classList.add("maximized");
    }
}

function makeWindowDraggable(windowElement) {
    let header = windowElement.querySelector(".window-header");
    if (!header) return;

    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener("mousedown", (e) => {
        if (windowElement.classList.contains("maximized")) return;
        isDragging = true;
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
        header.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        let maxX = window.innerWidth - windowElement.offsetWidth;
        let maxY = window.innerHeight - windowElement.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        windowElement.style.left = `${newX}px`;
        windowElement.style.top = `${newY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        if (!windowElement.classList.contains("maximized")) {
            header.style.cursor = "grab";
        }
    });
}

function makeWindowResizable(windowElement) {
    const minWidth = 720;
    const minHeight = 480;

    // 🔴 Verificar si ya tiene resizers y evitar duplicación
    if (windowElement.dataset.resizable === "true") return;
    windowElement.dataset.resizable = "true"; // Marcamos como resizable

    const resizers = ["top", "right", "bottom", "left"];

    resizers.forEach(position => {
        let resizer = document.createElement("div");
        resizer.classList.add("resizer", position);
        windowElement.appendChild(resizer);

        resizer.addEventListener("mousedown", function (e) {
            if (windowElement.classList.contains("maximized")) return;

            e.preventDefault();
            let startX = e.clientX;
            let startY = e.clientY;
            let startWidth = windowElement.offsetWidth;
            let startHeight = windowElement.offsetHeight;
            let startLeft = windowElement.offsetLeft;
            let startTop = windowElement.offsetTop;

            function resizeMouseMove(event) {
                let newWidth = startWidth;
                let newHeight = startHeight;
                let newLeft = startLeft;
                let newTop = startTop;

                if (position.includes("right")) {
                    newWidth = Math.max(minWidth, startWidth + (event.clientX - startX));
                }
                if (position.includes("bottom")) {
                    newHeight = Math.max(minHeight, startHeight + (event.clientY - startY));
                }
                if (position.includes("left")) {
                    newWidth = Math.max(minWidth, startWidth - (event.clientX - startX));
                    newLeft = startLeft + (event.clientX - startX);
                }
                if (position.includes("top")) {
                    newHeight = Math.max(minHeight, startHeight - (event.clientY - startY));
                    newTop = startTop + (event.clientY - startY);
                }

                windowElement.style.width = `${newWidth}px`;
                windowElement.style.height = `${newHeight}px`;
                windowElement.style.left = `${newLeft}px`;
                windowElement.style.top = `${newTop}px`;
            }

            function stopResize() {
                document.removeEventListener("mousemove", resizeMouseMove);
                document.removeEventListener("mouseup", stopResize);
            }

            document.addEventListener("mousemove", resizeMouseMove);
            document.addEventListener("mouseup", stopResize);
        });
    });
}


function minimizeWindow(id) {
    let windowElement = document.getElementById(id);
    if (!windowElement) return;

    windowElement.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    windowElement.style.transform = "translateY(100px) scale(0.7)";
    windowElement.style.opacity = "0";

    setTimeout(() => {
        windowElement.style.display = "none";
        windowElement.classList.add("minimized");
    }, 300);
}

function toggleWindow(id, iconId) {
    let windowElement = document.getElementById(id);
    let iconElement = document.getElementById(iconId);

    if (!windowElement) return;

    if (windowElement.classList.contains("minimized")) {
        windowElement.classList.remove("minimized");
        windowElement.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        windowElement.style.opacity = "1";
        iconElement.classList.add("active");
    } else if (windowElement.style.display === "none" || !windowElement.style.display) {
        windowElement.style.display = "flex";
        iconElement.classList.add("active");
        windowElement.style.zIndex = windows.length + 100;
    } else {
        windowElement.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        windowElement.style.opacity = "0";

        setTimeout(() => {
            windowElement.classList.add("minimized");
            windowElement.classList.remove("maximized");
            windowElement.style.display = "none";
        }, 300);
        iconElement.classList.remove("active");
    }
}



document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === "D") {
        event.preventDefault();
        toggleRocketDock();
        event.stopPropagation();
        event.preventDefault();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.altKey && event.key === "F4") {
        event.preventDefault();
        toggleRocketDock();
    }
});

function toggleRocketDock() {
    let dock = document.querySelector(".rocketdock");

    if (!dock.classList.contains("hidden")) {
        // Ocultar con animación
        dock.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        dock.style.transform = "translateY(100px)";
        dock.style.opacity = "0";
        setTimeout(() => {
            dock.classList.add("hidden");
        }, 500); // Espera a que termine la animación
    } else {
        // Mostrar con animación
        dock.classList.remove("hidden");
        setTimeout(() => {
            dock.style.transform = "translateY(0)";
            dock.style.opacity = "1";
        }, 10); // Pequeño delay para activar la animación
    }
}

function leftmenuHidden() {
    let activeWindow = getActiveWindow();
    
    if (!activeWindow) {
        console.warn("No hay ventanas activas");
        return;
    }

    let leftMenu = activeWindow.querySelector(".left-menu");
    let dataContent = activeWindow.querySelector(".data-content");

    if (!leftMenu) {
        console.warn("No se encontró el menú lateral en la ventana activa");
        return;
    }

    leftMenu.style.transition = "transform 0.3s ease, width 0.3s ease";
    dataContent.style.transition = "width 0.3s ease";

    if (leftMenu.classList.contains("hidden")) {
        leftMenu.classList.remove("hidden");
        leftMenu.style.transform = "translateX(0)"; // Muestra el menú
        leftMenu.style.width = "20%";
        dataContent.style.width = "80%";
    } else {
        leftMenu.classList.add("hidden");
        leftMenu.style.transform = "translateX(-100%)"; // Oculta el menú moviéndolo a la izquierda
        leftMenu.style.width = "0%"; // Mantiene su tamaño
        dataContent.style.width = "100%";
    }
}

// Evento para ocultar/mostrar el menú lateral con Ctrl + B
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "b") {
        event.preventDefault();
        leftmenuHidden();
    }
});

function getActiveWindow() {
    let windows = Array.from(document.querySelectorAll(".window"));
    
    // Buscar la ventana con el z-index más alto
    let activeWindow = windows.reduce((highest, current) => {
        return parseInt(current.style.zIndex || 0) > parseInt(highest.style.zIndex || 0) ? current : highest;
    }, windows[0]); // Empezar con la primera ventana

    return activeWindow;
}

document.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Evita el menú contextual predeterminado

    let menu = document.querySelector(".contextMenu");
    let menuList = menu.querySelector("ul"); // Obtener el <ul> dentro del menú

    if (!menu || !menuList) return;

    let target = event.target;
    let menuContent = "";

    // Verificar si el clic fue en una ventana dentro de screenCanvas
    if (target.closest(".window")) {
        menuContent = `
            <li onclick="cerrarVentana()">Cerrar</li>
            <li onclick="minimizarVentana()">Minimizar</li>
            <li onclick="maximizarVentana()">Maximizar</li>
            <li onclick="restaurarVentana()">Restaurar</li>
            <li onclick="crearCarpeta()">Crear Carpeta</li>
            <li onclick="crearArchivo()">Crear Archivo</li>
        `;
    } 
    // Si se hizo clic directamente en el screenCanvas (pero no en una ventana)
    else if (target.id === "screencanvas" || target.closest("#screencanvas") && !target.closest(".window")) {
        menuContent = `
            <li onclick="crearCarpeta()">Crear Carpeta</li>
            <li onclick="crearArchivo()">Crear Archivo</li>
            <li onclick="abrirAjustes()">Ajustes</li>
            <li onclick="apagarSistema()">Apagar</li>
            <li onclick="console.log('V:Alpha: 1.0.0')">Version de senaOS</li>
        `;
    } 
    // Si el clic fue en otra parte
    else {
        menuContent = `<li onclick="console.log('V:Alpha: 1.0.0')">Version de senaOS</li>`;
    }

    // Insertar opciones dentro del <ul>
    menuList.innerHTML = menuContent;

    // Posicionar el menú en la ubicación del cursor
    menu.style.left = `${event.pageX}px`;
    menu.style.top = `${event.pageY}px`;
    menu.style.display = "block";
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", function (event) {
    let menu = document.querySelector(".contextMenu");
    if (menu && !event.target.closest(".contextMenu")) {
        menu.style.display = "none";
    }
});

function cerrarVentana() { console.log("Cerrando ventana..."); }
function minimizarVentana() { console.log("Minimizando ventana..."); }
function maximizarVentana() { console.log("Maximizando ventana..."); }
function restaurarVentana() { console.log("Restaurando ventana..."); }
function abrirAjustes() { console.log("Abriendo ajustes..."); }
function apagarSistema() { console.log("Apagando sistema..."); }

function guardarElementos(datos) {
    localStorage.setItem("archivos", JSON.stringify(datos));
}

// Crear una nueva carpeta
function crearCarpeta() {
    let nombre = prompt("Nombre de la carpeta:", "Nueva Carpeta");
    if (nombre) {
        let datos = JSON.parse(localStorage.getItem("archivos")) || [];
        datos.push({ tipo: "carpeta", nombre });
        guardarElementos(datos);
        cargarElementos();
    }
}

// Crear un nuevo archivo
function crearArchivo() {
    let nombre = prompt("Nombre del archivo:", "Nuevo Archivo.txt");
    if (nombre) {
        let datos = JSON.parse(localStorage.getItem("archivos")) || [];
        datos.push({ tipo: "archivo", nombre });
        guardarElementos(datos);
        cargarElementos();
    }
}

// Renombrar archivos o carpetas
function renombrarElemento(index) {
    let datos = JSON.parse(localStorage.getItem("archivos")) || [];
    let nuevoNombre = prompt("Nuevo nombre:", datos[index].nombre);
    if (nuevoNombre) {
        datos[index].nombre = nuevoNombre;
        guardarElementos(datos);
        cargarElementos();
    }
}
function cargarElementos() {
    let contenedor = document.getElementById("file-container");
    contenedor.innerHTML = "";

    let datos = JSON.parse(localStorage.getItem("archivos")) || [];
    datos.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `<i class="${item.tipo === 'carpeta' ? 'fas fa-folder' : 'fas fa-file'}"></i> ${item.nombre}`;
        div.setAttribute("data-index", index);

        // Habilitar renombrado con doble clic
        div.ondblclick = () => renombrarElemento(index);
        
        contenedor.appendChild(div);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const dock = document.querySelector(".rocketdock");
    const items = document.querySelectorAll(".rocketitem");

    items.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "scale(1.5) translateY(-10px)";
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "scale(1)";
        });
    });
});


const controlCenter = document.getElementById("control-center");
const controlButton = document.getElementById("control-center-btn");

controlButton.addEventListener("click", () => {
    controlCenter.classList.toggle("hidden");
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", (event) => {
    if (!controlCenter.contains(event.target) && !controlButton.contains(event.target)) {
        controlCenter.classList.add("hidden");
    }
});

navigator.getBattery().then(battery => {
    function updateBatteryStatus() {
        let level = Math.round(battery.level * 100);
        document.getElementById("battery-status").innerHTML = `${level}% <i class="fas fa-battery-${getBatteryIcon(level)}"></i>`;
    }

    function getBatteryIcon(level) {
        if (level > 75) return "full";
        if (level > 50) return "three-quarters";
        if (level > 25) return "half";
        if (level > 10) return "quarter";
        return "empty";
    }

    battery.addEventListener("levelchange", updateBatteryStatus);
    updateBatteryStatus();
});