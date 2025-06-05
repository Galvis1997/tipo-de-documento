<?php

class connectionDB
{
    private $host = "localhost";
    private $user = "root";
    private $pass = "";
    private $dbname = "tipos_de_documentos";

    public function getConnect()
    {
        $conexion = new mysqli($this->host, $this->user, $this->pass, $this->dbname);
        if ($conexion->connect_error) {
            die("Error de conexión: " . $conexion->connect_error);
        }
        return $conexion;
    }
}
