<?php

require './conn.php';

$id = $_GET['id'];
$user = $_GET['user'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'select count(f.mostrar) as votos, f.mostrar,
(select emailUsuario from fechavotada where emailUsuario = "'
	. $user . '" and idFechaPropuesta = fv.idFechaPropuesta ) as votado
from fechapropuesta f , fechavotada fv
where f.idFecha = fv.idFechaPropuesta
and f.idEvento =' . $id;
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'fecha' => $row['mostrar'],
		'votos' => $row['votos'],
		'votado' => $row['votado']
	)));
}
echo json_encode($response);
