<?php

// Autor: jhonatan galvis

// Definición de la clase encargada de establecer la conexión a la base de datos
class connectionDB
{
    // Datos de configuración para la conexión: servidor, usuario, contraseña y nombre de la base de datos
    private $host = "localhost";         // Dirección del servidor de base de datos (normalmente "localhost")
    private $user = "root";              // Usuario de la base de datos (por defecto en XAMPP es "root")
    private $pass = "";                  // Contraseña del usuario (en XAMPP, normalmente se deja vacía)
    private $dbname = "tipos_de_documentos"; // Nombre de la base de datos a la que se conectará

    // Método público que retorna una conexión activa a la base de datos
    public function getConnect()
    {
        // Crea una nueva instancia de conexión utilizando MySQLi con los datos configurados
        $conexion = new mysqli($this->host, $this->user, $this->pass, $this->dbname);

        // Verifica si ocurrió un error al intentar conectarse
        if ($conexion->connect_error) {
            // Si hay error, detiene el script y muestra el mensaje de error
            die("Error de conexión: " . $conexion->connect_error);
        }

        // Si la conexión fue exitosa, se retorna la conexión para ser usada en otras partes del sistema
        return $conexion;
    }
}
