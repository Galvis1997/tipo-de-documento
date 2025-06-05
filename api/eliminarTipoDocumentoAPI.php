<?php
// Autor: jhonatan galvis

// Establece que la respuesta que enviará este archivo será en formato JSON
header('Content-Type: application/json');

// Incluye el archivo del controlador que contiene la lógica para manejar los tipos de documentos
include "../controller/TipoDocumentoController.php";

// Obtiene el valor enviado por POST con la clave "id". Si no se envía, se asigna null.
$id = $_POST["id"] ?? null;

// Crea una instancia del controlador de tipo de documento
$controller = new TipoDocumentoController();

// Llama al método del controlador para inhabilitar (desactivar) un tipo de documento según su id
$respuesta = $controller->inhabilitarTipoDocumento($id);

// Convierte la respuesta (éxito o error) en formato JSON y la envía al cliente
echo json_encode($respuesta);

// Finaliza la ejecución del script
exit();
