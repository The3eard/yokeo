navbar();

document.querySelector('#logOutBtn').addEventListener('click', logOut);

function toIndex() {
	// ! Cambiar condición del if cuando esté colgado en el servidor
	if (window.location.pathname === '/yokeo/index.html') {
		location = 'index.html';
	} else {
		location = '../index.html';
	}
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
	var name = cname + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

function delCookie() {
	setCookie('user', '', 1);
}

function navbar() {
	let wLog = document.querySelectorAll('.wLog');
	let woLog = document.querySelectorAll('.woLog');
	if (getCookie('user') === '') {
		wLog.forEach(element => (element.style.display = 'none'));
		woLog.forEach(element => (element.style.display = 'block'));
	} else {
		wLog.forEach(element => (element.style.display = 'block'));
		woLog.forEach(element => (element.style.display = 'none'));
	}
}

function getUser() {
	return getCookie('user');
}

function logOut() {
	delCookie();
	toIndex();
}

let key = CryptoJS.enc.Hex.parse('36ebe205bcdfc499a25e6923f4450fa8');
let iv = CryptoJS.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');

function encrypt(message) {
	let encrypted = CryptoJS.AES.encrypt(message, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.toString();
}

function decrypt(message) {
	let decrypted = CryptoJS.AES.decrypt(message, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}

function sweetAlertReload(msg) {
	Swal.fire({
		text: msg,
		confirmButtonText: 'Ok',
	}).then(() => location.reload());
}

function sweetAlertToIndex(msg) {
	Swal.fire({
		text: msg,
		confirmButtonText: 'Ok',
	}).then(() => toIndex());
}

function sweetAlert(msg) {
	Swal.fire({
		text: msg,
		confirmButtonText: 'Ok',
	});
}
