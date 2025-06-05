<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Listar Tipos de Documentos</title>
</head>
<body>

    <h2>Lista de Tipos de Documentos</h2>

    <table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody id="tablaTipos">
        <!-- Cargado por JS -->
    </tbody>
</table>

<!-- Modal para editar -->
<div id="modal-editar" style="display:none; border:1px solid #000; padding:10px; background:#eee; position:absolute;">
    <h3>Editar Tipo de Documento</h3>
    <form id="formEditar">
        <input type="hidden" id="edit-id" name="id">
        <label for="edit-nombre">Nombre:</label>
        <input type="text" id="edit-nombre" name="nombre" required>
        <button type="submit">Guardar Cambios</button>
        <button type="button" onclick="cerrarModalEditar()">Cancelar</button>
    </form>
</div>

<script src="../js/listarTiposDocumentos.js"></script>
