<?php

require './conn.php';

$id = $_GET['id'];
($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT o.nombre as objeto , o2.emailUsuario as user
from objetopropuesto o left join objetousuario o2
on o.idObjeto = o2.idObjetoPropuesto
where o.idEvento  = ' . $id . '
group by o.idObjeto ';
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'objeto' => $row['objeto'],
		'user' => $row['user'],
	)));
}
echo json_encode($response);
