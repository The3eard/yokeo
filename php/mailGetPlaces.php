<?php

require './conn.php';

$id = $_GET['id'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT f.nombre as lugar, count(fv.idLugarPropuesto ) as votos
	FROM lugarpropuesto f JOIN lugarvotado fv
	on f.idLugar = fv.idLugarPropuesto
	where f.idEvento = ' . $id . '
	group by f.nombre ';
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'lugar' => $row['lugar'],
		'votos' => $row['votos'],
	)));
}
echo json_encode($response);
