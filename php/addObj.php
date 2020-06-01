<?php

require './conn.php';

$id = $_POST['id'];
$obj = $_POST['obj'];

$db = new mysqli($servidor, $usuario, $password, $basedatos);
if ($db->connect_error) {
	die(
		'La conexión ha fallado, error número ' .
			$db->connect_errno .
			': ' .
			$db->connect_error
	);
}
mysqli_set_charset($db, 'utf8');
$stmt = $db->prepare(
	'INSERT INTO objetopropuesto(idEvento, nombre) VALUES (?,?)'
);
$stmt->bind_param('ss', $id, $obj);
$resultado = $stmt->execute();
$last_id = $db->insert_id;
if ($resultado) {
	$respuesta['error'] = 0;
	$respuesta['mensaje'] = 'OK';
	$respuesta['id'] = $last_id;
} else {
	$respuesta['error'] = 1;
	$respuesta['mensaje'] = 'Error';
}
echo json_encode($respuesta);
