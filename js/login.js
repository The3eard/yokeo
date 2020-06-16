document
	.querySelector('#formLogAccept')
	.addEventListener('click', compruebaUsuario);

function compruebaUsuario() {
	const mail = document.querySelector('#formLogMail').value.trim();
	let regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
	if (regexMail.test(mail)) {
		logUser(mail);
	} else {
		sweetAlert('Introduzca una dirección de correo electrónico válida');
		return false;
	}
}

function logUser(mail) {
	let pass = encrypt(document.querySelector('#formLogPass').value.trim());
	param = 'mail=' + mail + '&pass=' + pass;
	event.preventDefault();
	$.get('../php/login.php', param, respuestaLogUser, 'json');
	return false;
}

function respuestaLogUser(json) {
	if (json === 0) {
		sweetAlert('Fallo en la autenticación: email o contrsaeña no válidos');
	} else {
		setCookie('user', json, 30);
		sweetAlertToIndex('Ha iniciado sesión correctamente');
	}
}

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

document.querySelector('#getPass').addEventListener('click', getPass);

function getPass() {
	const mail = document.querySelector('#formLogMail').value.trim();
	let param = 'mail=' + mail;
	$.get('../php/checkMail.php', param, respuestaGetPass, 'json');
}

function respuestaGetPass(response) {
	if (response.length === 0) {
		sweetAlert('La dirección de email introducida no es correcta');
	} else {
		const body =
			'<strong>Aquí tiene su contraseña</strong><br /><i>' +
			decrypt(response[0].pass);
		+'</i>';
		const name = 'recuperar password';
		param = 'to=' + response[0].mail + '&body=' + body + '&name=' + name;
		$.post('../php/sendMail.php', param, check, 'json');
	}
}
function check(response) {
	sweetAlert(111 + response);
}
