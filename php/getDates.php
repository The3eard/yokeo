<?php

require './conn.php';

$id = $_GET['id'];
$user = $_GET['user'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql =
	'SELECT count(fv.idFechaPropuesta) as votos, f.mostrar, f.idFecha,
		(SELECT emailUsuario
		from fechavotada
		where emailUsuario = "' . $user . '"
		and idFechaPropuesta = fv.idFechaPropuesta
		group by emailUsuario ) AS votado
	FROM fechapropuesta f LEFT JOIN fechavotada fv
	on f.idFecha = fv.idFechaPropuesta
	where f.idEvento = ' . $id . '
	group by f.mostrar
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
