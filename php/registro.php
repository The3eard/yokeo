<?php

require('./conn.php');

$nick = $_POST['user'];
$mail = $_POST['mail'];
$pass = $_POST['pass'];

$db = new mysqli($servidor, $usuario, $password, $basedatos);
if ($db->connect_error) {
	die("La conexión ha fallado, error número " .
		$db->connect_errno . ": " . $db->connect_error);
}
mysqli_set_charset($db, "utf8");
$stmt = $db->prepare("INSERT INTO usuario(email, nick, pass) VALUES (?, ?, ?)");
$stmt->bind_param('sss', $mail, $nick, $pass);
$resultado = $stmt->execute();
if ($resultado) {
	$respuesta["error"] = 0;
	$respuesta["mensaje"] = "Se ha registrado correctamente";
} else {
	$respuesta["error"] = 1;
	$respuesta["mensaje"] = "Error, direccion de correo ya registrada";
}
echo json_encode($respuesta);
