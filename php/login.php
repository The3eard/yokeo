<?php
$servidor = "localhost";
$basedatos = "yoquedo";
$usuario = "root";
$password = "";
$mail = $_GET['mail'];
($db = mysqli_connect($servidor, $usuario, $password, $basedatos)) or
     die(mysqli_error($conexion));
mysqli_set_charset($db, "utf8");
$sql = "SELECT email FROM usuario WHERE email='" . $mail . "'";
$resultado = mysqli_query($db, $sql);
$user = 0;
while ($fila = mysqli_fetch_array($resultado)) {
     $user = $fila["email"];
}
echo json_encode($user);
