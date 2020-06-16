<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$myBody = $_POST['body'];
$myTo = $_POST['to'];
$myTitle = $_POST['name'];

$mail = new PHPMailer(true);

try {
	//Server settings
	$mail->isSMTP();
	// $mail->SMTPDebug  = 2;
	$mail->Host       = 'smtp.gmail.com';
	$mail->SMTPAuth   = true;
	$mail->Username   = 'xafuegon590@ieshnosmachado.org';
	$mail->Password   = '@1MachadoBros';
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->Port       = 465;

	//Headers
	$mail->setLanguage('es', './PHPMailer/language/phpmailer.lang-es.php');
	$mail->setFrom('xafuegon590@ieshnosmachado.org', 'yokeo');
	$mail->addAddress($myTo);


	// Content
	$mail->isHTML(true);
	$mail->Subject = 'Yokeo! - ' . $myTitle;
	$mail->Body    = $myBody;

	$mail->send();
	echo json_encode('Mensaje enviado');
} catch (Exception $e) {
	echo json_encode("Mensaje no enviado. Error: {$mail->ErrorInfo}");
}
