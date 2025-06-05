<?php

//AUTOR @JHONATAN GALVIS

// Incluye la clase de conexión a la base de datos
include_once __DIR__ . '/../conexion/ClaseConexion.php';

// Definición de la clase para manejar los tipos de documentos
class model_tipo_de_documentos
{
    // Propiedad privada para la conexión a la base de datos
    private $conexion;

    // Constructor: inicializa la conexión al crear una instancia de la clase
    public function __construct()
    {
        $con = new connectionDB(); // Crea un objeto de conexión
        $this->conexion = $con->getConnect(); // Obtiene la conexión activa
    }

    // Método para insertar un nuevo tipo de documento
    public function insertar($nombre)
    {
        $consulta = $this->conexion->prepare("INSERT INTO tipos_documentos (nombre) VALUES (?)");

        if (!$consulta) {
            return ["error" => "Error al preparar: " . $this->conexion->error];
        }

        $consulta->bind_param("s", $nombre);

        if (!$consulta->execute()) {
            $consulta->close();
            return ["error" => "Error al ejecutar: {$consulta->error}"];
        }

        $consulta->close();
        return ["exitoso" => "Tipo de documento registrado exitosamente"];
    }

    // Método para listar todos los tipos de documentos
    public function listar()
    {
        $consulta = $this->conexion->prepare("SELECT id, nombre FROM tipos_documentos ORDER BY id DESC");
        if (!$consulta) {
            return ["error" => "Error al preparar: {$this->conexion->error}"];
        }

        $consulta->execute();
        $resultado = $consulta->get_result();

        $datos = [];

        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $datos[] = $fila;
            }
        }

        $consulta->close();
        return $datos;
    }

    // Método para editar un tipo de documento existente
    public function editar($id, $nombre)
    {
        $consulta = $this->conexion->prepare("UPDATE tipos_documentos SET nombre = ? WHERE id = ?");
        if (!$consulta) {
            return ["error" => "Error al preparar: " . $this->conexion->error];
        }

        $consulta->bind_param("si", $nombre, $id);

        if (!$consulta->execute()) {
            $consulta->close();
            return ["error" => "Error al ejecutar: " . $consulta->error];
        }

        $consulta->close();
        return ["exitoso" => "Tipo de documento actualizado"];
    }

    // Método para inhabilitar (desactivar) un tipo de documento
    public function inhabilitar($id)
    {
        $consulta = $this->conexion->prepare("UPDATE tipos_documentos SET estado = 'inactivo' WHERE id = ?");
        if (!$consulta) {
            return ["error" => "Error al preparar: " . $this->conexion->error];
        }

        $consulta->bind_param("i", $id);

        if (!$consulta->execute()) {
            $consulta->close();
            return ["error" => "Error al ejecutar: " . $consulta->error];
        }

        $consulta->close();
        return ["exitoso" => "Tipo de documento inhabilitado correctamente"];
    }
}
