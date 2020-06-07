<?php

require './conn.php';

$id = $_GET['id'];
$user = $_GET['user'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT l.nombre ,count(lv.idLugarPropuesto ) as votos, l.idLugar,
(SELECT emailUsuario from lugarvotado where emailUsuario = "' . $user . '" and idLugarPropuesto = lv.idLugarPropuesto ) AS votado
FROM lugarpropuesto l left join lugarvotado lv
on l.idLugar = lv.idLugarPropuesto
where l.idEvento =' . $id . ' group by l.nombre';
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'lugar' => $row['nombre'],
		'votos' => $row['votos'],
		'votado' => $row['votado'],
		'id' => $row['idLugar']
	)));
}
echo json_encode($response);
