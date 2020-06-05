<?php

require './conn.php';

$id = $_POST['id'];
$user = $_POST['user'];
$update = $_POST['update'];

$db = new mysqli($servidor, $usuario, $password, $basedatos);
if ($db->connect_error) {
	die('La conexión ha fallado, error número ' .
		$db->connect_errno .
		': ' .
		$db->connect_error);
}
mysqli_set_charset($db, 'utf8');
if ($update == 1) {
	$stmt = $db->prepare(
		'INSERT into objetousuario (idObjetoPropuesto , emailUsuario ) values (?,?)'
	);
} else {
	$stmt = $db->prepare(
		'DELETE from objetousuario where idObjetoPropuesto = ? and emailUsuario = ?'
	);
}
$stmt->bind_param('is', $id, $user);
$resultado = $stmt->execute();
$last_id = $db->insert_id;
if ($resultado) {
	$respuesta['error'] = 0;
	$respuesta['mensaje'] = 'OK';
} else {
	$respuesta['error'] = 1;
	$respuesta['mensaje'] = 'Error';
}
echo json_encode($respuesta);
