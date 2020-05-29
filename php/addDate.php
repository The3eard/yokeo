<?php

require './conn.php';

$id = $_POST['id'];
$date = $_POST['date'];

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
	'INSERT INTO fechapropuesta(idEvento, fecha) VALUES (?,?)'
);
$stmt->bind_param('ss', $id, $date);
$resultado = $stmt->execute();
if ($resultado) {
	$respuesta['error'] = 0;
	$respuesta['mensaje'] = 'Fecha añadida';
} else {
	$respuesta['error'] = 1;
	$respuesta['mensaje'] = 'Error';
}
echo json_encode($respuesta);
