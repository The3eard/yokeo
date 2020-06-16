<?php

require './conn.php';

$id = $_GET['id'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql =
	'SELECT p.emailUsuario from participa p where p.idEvento = ' . $id;
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		$row['emailUsuario'],

	)));
}
echo json_encode($response);
