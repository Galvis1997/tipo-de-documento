<?php

class ElementoModel
{
  private $conn;
  public $table_cons = "elementos_consumibles";
  public $table_devo = "elementos_devolutivos";

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function saveElementoDevolutivo($codigo, $nombre, $area, $placa, $serial, $marca, $modelo)
  {
    $query = "INSERT INTO {$this->table_devo}
              (ele_dev_codigo, ele_dev_nombre, ele_dev_placa, ele_dev_serial, area_id, marca_id, ele_dev_modelo)
              VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param("issiiis", $codigo, $nombre, $placa, $serial, $area, $marca, $modelo);

    if ($stmt->execute()) return true;

    // Registrar error en archivo
    error_log("[" . date("Y-m-d H:i:s") . "] Execute failed (Save 'elemento devolutivo'): " . $stmt->error . PHP_EOL, 3, __DIR__ . "/../../logs/php_errors.log");
    return null;
  }

  public function saveElementoConsumible($codigo, $nombre, $area, $cantidad, $medida)
  {
    $query = "INSERT INTO {$this->table_cons}
              (ele_con_codigo, ele_con_nombre, ele_con_cantidad, area_id)
              VALUES (?, ?, ?, ?, ?)";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param("isiii", $codigo, $nombre, $cantidad, $area, $medida);

    if ($stmt->execute()) return true;

    // Registrar error en archivo
    error_log("[" . date("Y-m-d H:i:s") . "] Execute failed (Save 'elemento consumible'): " . $stmt->error . PHP_EOL, 3, __DIR__ . "/../../logs/php_errors.log");
    return null;
  }

  public function getAllElementos($estado = "activo")
  {
    $query = "SELECT * FROM (
                SELECT ele_dev_codigo AS codigo, ele_dev_nombre AS nombre, area_nombre AS area, 'devolutivo' AS tipo, ele_dev_estado AS estado
                FROM {$this->table_devo} d
                JOIN areas a ON d.area_id = a.area_id
                WHERE ele_dev_estado = ?
                UNION
                SELECT ele_con_codigo AS codigo, ele_con_nombre AS nombre, area_nombre AS area, 'consumible' AS tipo, ele_con_estado AS estado
                FROM {$this->table_cons} c
                JOIN areas a ON c.area_id = a.area_id
                WHERE ele_con_estado = ?
              ) AS elementos
              ORDER BY tipo DESC, codigo ASC";

    $stmt = $this->conn->prepare($query);
    $stmt->bind_param("ss", $estado, $estado);

    if ($stmt->execute()) {
      $result = $stmt->get_result();
      return $result->fetch_all(MYSQLI_ASSOC);
    }

    return null;
  }

  public function getElementoByCodigo($codigo, $tabla_tipo)
  {
    $column = ($tabla_tipo == "{$this->table_cons}") ? "ele_con_codigo" : "ele_dev_codigo";

    $query = "SELECT *
              FROM {$tabla_tipo}
              WHERE {$column} = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param('i', $codigo);

    if ($stmt->execute()) {
      $result = $stmt->get_result();
      if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row;
      }
    }

    return null;
  }

  public function deactivateElemento($codigo, $tabla_tipo)
  {
    $column = ($tabla_tipo == "{$this->table_cons}") ? "ele_con_codigo" : "ele_dev_codigo";
    $estado_col = $tabla_tipo === $this->table_cons ? "ele_con_estado" : "ele_dev_estado";

    $query = "UPDATE {$tabla_tipo} SET {$estado_col} = 'desactivado' WHERE {$column} = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param('i', $codigo);

    if ($stmt->execute()) return true;

    return null;
  }
}
