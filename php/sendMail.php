<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
	//Server settings
	$mail->isSMTP();
	$mail->SMTPDebug  = 2;
	$mail->Host       = 'smtp.gmail.com';
	$mail->SMTPAuth   = true;
	$mail->Username   = 'xafuegon590@ieshnosmachado.org';
	$mail->Password   = '@The3eard';
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->Port       = 465;

	//Headers
	$mail->setFrom('xafuegon590@ieshnosmachado.org', 'yokeo');
	$mail->addAddress('pantocreitor@gmail.com');


	// Content
	$mail->isHTML(true);
	$mail->Subject = 'Here is the subject';
	$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
	$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	$mail->send();
	echo 'Mensaje enviado';
} catch (Exception $e) {
	echo "Mensaje no enviado. Error: {$mail->ErrorInfo}";
}
