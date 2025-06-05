<?php

include_once "../model/model_tipo_de_documentos.php";

class TipoDocumentoController
{
    private $model;

    public function __construct()
    {
        $this->model = new model_tipo_de_documentos();
    }

    public function insertarTipoDocumento($nombre)
    {
        if (empty(trim($nombre))) {
            return ["error" => "complete todos los campos"];
        }

        return $this->model->insertar($nombre);
    }

    public function listarTiposDocumentos()
{
    return $this->model->listar();
}

public function editarTipoDocumento($id, $nombre)
{
    if (empty(trim($nombre)) || !is_numeric($id)) {
        return ["error" => "Datos inválidos"];
    }

    return $this->model->editar((int)$id, $nombre);
}

public function inhabilitarTipoDocumento($id)
{
    if (!is_numeric($id)) {
        return ["error" => "ID inválido"];
    }

    return $this->model->inhabilitar((int)$id);
}



}
