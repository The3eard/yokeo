<?php

require './conn.php';

$user = $_GET['user'];

($conexion = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
	die(mysqli_error($conexion));
mysqli_set_charset($conexion, 'utf8');
$sql =
	'SELECT e.id, e.nombre, f.mostrar as fecha, l.nombre as lugar, count(distinct(p.emailUsuario))
	as asistentes FROM evento e, participa p, fechapropuesta f, fechavotada fv,
	objetopropuesto o, objetousuario ov, lugarpropuesto l, lugarvotado lv
	WHERE p.idEvento = e.id AND p.emailUsuario = fv.emailUsuario and
	fv.idFechaPropuesta = f.idFecha AND p.emailUsuario = ov.emailUsuario
	AND ov.idObjetoPropuesto = o.idObjeto AND p.emailUsuario = lv.emailUsuario
	AND lv.idLugarPropuesto = l.idLugar AND p.emailUsuario = "' .
	$user .
	'" GROUP BY e.nombre';
$resultado = mysqli_query($conexion, $sql);
$response = [];
while ($row = mysqli_fetch_array($resultado)) {
	$response[$row['id']] = [
		'nombre' => $row['nombre'],
		'fecha' => $row['fecha'],
		'lugar' => $row['lugar'],
		'asistentes' => $row['asistentes'],
	];
}
echo json_encode($response);
