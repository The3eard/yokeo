<?php

require './conn.php';

$user = $_GET['user'];

($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql = 'SELECT e.id, e.nombre, f.mostrar as fecha, f.fecha as date, l.nombre as lugar,
(select count(distinct(p2.emailUsuario )) from participa p2 where p2.idEvento = p.idEvento) as asistentes
FROM evento e, participa p, fechapropuesta f,  lugarpropuesto l
WHERE p.idEvento = e.id
and e.id = f.idEvento
and e.id = l.idEvento
AND p.emailUsuario = "' . $user . '"
GROUP BY e.id
ORDER BY f.fecha';
$resultado = mysqli_query($conexion, $sql);
$response = array();
while ($row = mysqli_fetch_array($resultado)) {
	array_push($response, (array(
		'nombre' => $row['nombre'],
		'lugar' => $row['lugar'],
		'asistentes' => $row['asistentes'],
		'id' => $row['id'],
		'date' => $row['date']
	)));
}
echo json_encode($response);
