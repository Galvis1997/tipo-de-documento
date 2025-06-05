<?php
header('Content-Type: application/json');
include "../controller/TipoDocumentoController.php";

$id = $_POST["id"] ?? null;
$nombre = $_POST["nombre"] ?? '';

$controller = new TipoDocumentoController();
$respuesta = $controller->editarTipoDocumento($id, $nombre);

echo json_encode($respuesta);
exit();
