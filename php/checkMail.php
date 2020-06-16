<?php

require './conn.php';

$mail = $_GET['mail'];

($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT email, pass from usuario where email = "' . $mail . '"';
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'mail' => $row['email'],
		'pass' => $row['pass']
	)));
}
echo json_encode($response);
