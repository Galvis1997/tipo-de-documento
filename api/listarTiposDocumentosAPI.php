<?php
header('Content-Type: application/json');
include "../controller/TipoDocumentoController.php";

$controller = new TipoDocumentoController();
$datos = $controller->listarTiposDocumentos();

echo json_encode($datos);
exit();
