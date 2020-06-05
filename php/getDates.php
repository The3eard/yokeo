<?php

require './conn.php';

$id = $_GET['id'];
$user = $_GET['user'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT count(f.mostrar) as votos, f.mostrar, f.idFecha,
(SELECT emailUsuario from fechavotada where emailUsuario = "' . $user . '" and idFechaPropuesta = fv.idFechaPropuesta ) AS votado
FROM fechapropuesta f , fechavotada fv
where f.idFecha = fv.idFechaPropuesta
and f.idEvento =' . $id . ' group by f.mostrar
order by f.fecha';
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'fecha' => $row['mostrar'],
		'votos' => $row['votos'],
		'votado' => $row['votado'],
		'id' => $row['idFecha']
	)));
}
echo json_encode($response);
