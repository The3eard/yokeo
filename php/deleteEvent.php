<?php

require './conn.php';

$id = $_POST['id'];

$db = new mysqli($servidor, $usuario, $password, $basedatos);
if ($db->connect_error) {
	die('La conexión ha fallado, error número ' .
		$db->connect_errno .
		': ' .
		$db->connect_error);
}
mysqli_set_charset($db, 'utf8');
$stmt = $db->prepare(
	'DELETE FROM participa WHERE idEvento= ?'
);
$stmt->bind_param('i', $id);
$resultado = $stmt->execute();
$last_id = $db->insert_id;
if ($resultado) {
	$respuesta = 'Evento borrado';
} else {
	$respuesta = 'ha habido un error en su petición';
}
echo json_encode($respuesta);
