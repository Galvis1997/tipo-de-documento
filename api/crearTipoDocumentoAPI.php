<?php

include "../controller/TipoDocumentoController.php";

header('Content-Type: application/json');

$nombre = $_POST["nombre"] ?? '';

$controller = new TipoDocumentoController();
$respuesta = $controller->insertarTipoDocumento($nombre);

echo json_encode($respuesta);
exit();
