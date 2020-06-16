document
	.querySelector('#formRegAccept')
	.addEventListener('click', compruebaUsuario);

function compruebaUsuario() {
	let user = document.querySelector('#formRegUser').value.trim();
	let mail = document.querySelector('#formRegMail').value.trim();
	let regexUser = /[a-zA-Z][a-zA-Z0-9-_]{3,20}/gi;
	let regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
	if (regexUser.test(user)) {
		if (regexMail.test(mail)) {
			altaUserDb(user, mail);
		} else {
			sweetAlert('Introduzca una dirección de correo electrónico válida');
			return false;
		}
	} else {
		sweetAlert('Introduzca un nombre de usuario válido');
		return false;
	}
}

function altaUserDb(user, mail) {
	param =
		'user=' +
		user +
		'&mail=' +
		mail +
		'&pass=' +
		encrypt(document.querySelector('#formLogPass').value.trim());
	event.preventDefault();
	$.post('../php/registro.php', param, respuestaAltaUser, 'json');
	return false;
}

function respuestaAltaUser(json) {
	if (json.error) {
		sweetAlert(json.mensaje);
	} else {
		sweetAlertToIndex(json.mensaje);
	}
}
