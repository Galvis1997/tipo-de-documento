<?php
header('Content-Type: application/json');
include "../controller/TipoDocumentoController.php";

$id = $_POST["id"] ?? null;

$controller = new TipoDocumentoController();
$respuesta = $controller->inhabilitarTipoDocumento($id);

echo json_encode($respuesta);
exit();
