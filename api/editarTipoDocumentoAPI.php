<?php
// Autor: jhonatan galvis

// Indica que el contenido que devolverá esta API será en formato JSON
header('Content-Type: application/json');

// Incluye el archivo que contiene la clase TipoDocumentoController
include "../controller/TipoDocumentoController.php";

// Obtiene el valor del campo "id" enviado por POST. Si no existe, se asigna null.
$id = $_POST["id"] ?? null;

// Obtiene el valor del campo "nombre" enviado por POST. Si no existe, se asigna una cadena vacía.
$nombre = $_POST["nombre"] ?? '';

// Crea una nueva instancia del controlador que maneja la lógica de tipo de documento
$controller = new TipoDocumentoController();

// Llama al método del controlador para editar un tipo de documento, pasándole el id y el nombre
$respuesta = $controller->editarTipoDocumento($id, $nombre);

// Convierte el resultado en formato JSON y lo envía como respuesta al cliente
echo json_encode($respuesta);

// Termina la ejecución del script
exit();
