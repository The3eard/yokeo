<?php

require './conn.php';

$user = $_POST['user'];
$event = $_POST['event'];

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
	'INSERT INTO participa(idEvento, emailUsuario) VALUES (?,?)'
);
$stmt->bind_param('is', $event, $user);
$resultado = $stmt->execute();
if ($resultado) {
	$respuesta['error'] = 0;
	$respuesta['mensaje'] = "Usuario $user añadido a evento $event";
} else {
	$respuesta['error'] = 1;
	$respuesta['mensaje'] = 'Error';
}
echo json_encode($respuesta);
