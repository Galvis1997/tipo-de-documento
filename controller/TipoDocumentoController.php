<?php

// Autor: jhonatan galvis

// Incluye el archivo que contiene la lógica del modelo para interactuar con la base de datos
include_once "../model/model_tipo_de_documentos.php";

// Define la clase del controlador para manejar operaciones relacionadas con tipos de documentos
class TipoDocumentoController
{
    // Propiedad privada que almacenará la instancia del modelo
    private $model;

    // Constructor de la clase: se ejecuta automáticamente al crear un objeto del controlador
    public function __construct()
    {
        // Crea una instancia del modelo que se usará para acceder a la base de datos
        $this->model = new model_tipo_de_documentos();
    }

    // Método para insertar un nuevo tipo de documento
    public function insertarTipoDocumento($nombre)
    {
        // Verifica que el nombre no esté vacío después de quitar espacios
        if (empty(trim($nombre))) {
            return ["error" => "complete todos los campos"]; // Devuelve error si el campo está vacío
        }

        // Llama al método insertar del modelo y devuelve su respuesta
        return $this->model->insertar($nombre);
    }

    // Método para obtener todos los tipos de documentos
    public function listarTiposDocumentos()
    {
        // Llama al método listar del modelo y devuelve los resultados
        return $this->model->listar();
    }

    // Método para editar un tipo de documento existente
    public function editarTipoDocumento($id, $nombre)
    {
        // Verifica que el nombre no esté vacío y que el ID sea un número válido
        if (empty(trim($nombre)) || !is_numeric($id)) {
            return ["error" => "Datos inválidos"]; // Devuelve error si algún dato es incorrecto
        }

        // Llama al método editar del modelo con el ID y el nuevo nombre
        return $this->model->editar((int)$id, $nombre);
    }

    // Método para inhabilitar (desactivar) un tipo de documento
    public function inhabilitarTipoDocumento($id)
    {
        // Verifica que el ID sea un número válido
        if (!is_numeric($id)) {
            return ["error" => "ID inválido"]; // Devuelve error si el ID no es numérico
        }

        // Llama al método inhabilitar del modelo pasando el ID
        return $this->model->inhabilitar((int)$id);
    }
}
