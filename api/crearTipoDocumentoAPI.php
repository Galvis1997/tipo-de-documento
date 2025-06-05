<?php
// Autor: jhonatan galvis

// Incluye el archivo del controlador que maneja la lógica de TipoDocumento
include "../controller/TipoDocumentoController.php";

// Establece el tipo de contenido de la respuesta como JSON
header('Content-Type: application/json');

// Obtiene el valor de 'nombre' enviado por POST, o una cadena vacía si no existe
$nombre = $_POST["nombre"] ?? '';

// Crea una instancia del controlador de TipoDocumento
$controller = new TipoDocumentoController();

// Llama al método para insertar un nuevo tipo de documento y guarda la respuesta
$respuesta = $controller->insertarTipoDocumento($nombre);

// Devuelve la respuesta en formato JSON y termina la ejecución del script
echo json_encode($respuesta);
exit();
