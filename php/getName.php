<?php

require './conn.php';

$id = $_GET['id'];

($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql =
	'SELECT e.nombre from evento e where e.id =' . $id;
$data = mysqli_query($conexion, $sql);
while ($row = mysqli_fetch_array($data)) {
	$response = $row["nombre"];
}
echo json_encode($response);
