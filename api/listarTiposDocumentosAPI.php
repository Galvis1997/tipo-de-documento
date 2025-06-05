<?php
// Autor: jhonatan galvis

// Indica que la respuesta será en formato JSON para que el navegador o frontend lo interprete correctamente
header('Content-Type: application/json');

// Incluye el archivo que contiene la lógica del controlador para tipos de documentos
include "../controller/TipoDocumentoController.php";

// Crea una nueva instancia del controlador
$controller = new TipoDocumentoController();

// Llama al método del controlador que obtiene (lista) todos los tipos de documentos desde la base de datos
$datos = $controller->listarTiposDocumentos();

// Convierte el arreglo con los datos a formato JSON y lo envía como respuesta
echo json_encode($datos);

// Finaliza la ejecución del script
exit();
