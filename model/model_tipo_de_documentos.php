<?php

include_once __DIR__ . '/../conexion/ClaseConexion.php';

class model_tipo_de_documentos
{
    private $conexion;

    public function __construct()
    {
        $con = new connectionDB();
        $this->conexion = $con->getConnect();
    }

    public function insertar($nombre)
    {
        $stmt = $this->conexion->prepare("INSERT INTO tipos_documentos (nombre) VALUES (?)");

        if (!$stmt) {
            return ["error" => "Error al preparar: " . $this->conexion->error];
        }

        $stmt->bind_param("s", $nombre);

        if (!$stmt->execute()) {
            $stmt->close();
            return ["error" => "Error al ejecutar: " . $stmt->error];
        }

        $stmt->close();
        return ["exitoso" => "Tipo de documento registrado exitosamente"];
    }

    public function listar()
{
    $sql = "SELECT id, nombre FROM tipos_documentos ORDER BY id DESC";
    $resultado = $this->conexion->query($sql);

    $datos = [];

    if ($resultado && $resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila;
        }
    }

    return $datos;
}

public function editar($id, $nombre)
{
    $stmt = $this->conexion->prepare("UPDATE tipos_documentos SET nombre = ? WHERE id = ?");
    if (!$stmt) {
        return ["error" => "Error al preparar: " . $this->conexion->error];
    }

    $stmt->bind_param("si", $nombre, $id);

    if (!$stmt->execute()) {
        $stmt->close();
        return ["error" => "Error al ejecutar: " . $stmt->error];
    }

    $stmt->close();
    return ["exitoso" => "Tipo de documento actualizado"];
}

public function inhabilitar($id)
{
    $stmt = $this->conexion->prepare("UPDATE tipos_documentos SET estado = 'inactivo' WHERE id = ?");
    if (!$stmt) {
        return ["error" => "Error al preparar: " . $this->conexion->error];
    }

    $stmt->bind_param("i", $id);

    if (!$stmt->execute()) {
        $stmt->close();
        return ["error" => "Error al ejecutar: " . $stmt->error];
    }

    $stmt->close();
    return ["exitoso" => "Tipo de documento inhabilitado correctamente"];
}









}
