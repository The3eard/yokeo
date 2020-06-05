<?php

require './conn.php';

$id = $_GET['id'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT o.nombre, ou.emailUsuario, o.idObjeto as id
FROM objetopropuesto o left JOIN objetousuario ou
on o.idObjeto = ou.idObjetoPropuesto
where o.idEvento = ' . $id;
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'nombre' => $row['nombre'],
		'user' => $row['emailUsuario'],
		'id' => $row['id']
	)));
}
echo json_encode($response);
