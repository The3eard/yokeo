<?php

require './conn.php';

$id = $_GET['id'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT f.mostrar as fecha, count(fv.idFechaPropuesta) as votos
	FROM fechapropuesta f JOIN fechavotada fv
	on f.idFecha = fv.idFechaPropuesta
	where f.idEvento = ' . $id . ' group by f.mostrar
	order by f.fecha';
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'fecha' => $row['fecha'],
		'votos' => $row['votos'],
	)));
}
echo json_encode($response);
